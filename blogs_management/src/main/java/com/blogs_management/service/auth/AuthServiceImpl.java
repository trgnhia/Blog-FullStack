package com.blogs_management.service.auth;

import com.blogs_management.dto.login.LoginResponse;
import com.blogs_management.model.Admin;
import com.blogs_management.model.AdminRefreshToken;
import com.blogs_management.repository.AdminRefreshTokenRepository;
import com.blogs_management.repository.AdminRepository;

import jakarta.servlet.http.HttpServletResponse;
import org.apache.commons.codec.digest.DigestUtils;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.Duration;
import java.time.OffsetDateTime;
import java.util.UUID;

import static java.time.OffsetDateTime.now;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final AdminRepository adminRepository;
    private final AdminRefreshTokenRepository adminRefreshTokenRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthCookieService authCookieService;

    private static final Duration ACCESS_TTL = Duration.ofMinutes(10);
    private static final Duration REFRESH_TTL = Duration.ofDays(14);


    @Override
    public LoginResponse login(String email, String rawPassword, HttpServletResponse response) {
        Admin admin = adminRepository.findByEmail(email)
                .orElseThrow(() -> unauthorized("Invalid email"));
        if (admin.getStatus() != null &&  !"ACTIVE".equalsIgnoreCase(admin.getStatus())) {
            throw unauthorized("This admin account is disabled");
        }
        boolean isCorrect = passwordEncoder.matches(rawPassword,admin.getPasswordHash());
        if (!isCorrect) {
            admin.setFailedLoginCount(admin.getFailedLoginCount() + 1);
            adminRepository.save(admin);
            throw unauthorized("Incorrect password");
        }
        admin.setFailedLoginCount(0);
        admin.setLastLoginAt(OffsetDateTime.now());
        adminRepository.save(admin);

        //Issue access token (JWT) - 10 minutes
        String accessToken = jwtService.issueAccessToken(admin, ACCESS_TTL);

        String refreshTokenRaw = generateRefreshTokenRaw();
        String refreshToken = sha256Hex(refreshTokenRaw);

        AdminRefreshToken refToken = buildAdminRefreshToken(admin, refreshToken);
        adminRefreshTokenRepo.save(refToken);

        // set refToken vao HttpOnly cookie
        ResponseCookie cookie = authCookieService.buildRefreshCookie(refreshTokenRaw, REFRESH_TTL);
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return new LoginResponse(accessToken, ACCESS_TTL.toSeconds());

    }

    @Override
    public LoginResponse refresh(String refreshTokenRaw, HttpServletResponse response) {
        OffsetDateTime now = OffsetDateTime.now();
        if (refreshTokenRaw == null || refreshTokenRaw.isBlank()) {
            throw unauthorized("Refresh token is null");
        }
        String refreshToken = sha256Hex(refreshTokenRaw);
        AdminRefreshToken rt = adminRefreshTokenRepo.findByTokenHash(refreshToken)
                .orElseThrow(() -> unauthorized("Invalid refresh token"));
        if (rt.getRevokedAt() != null || rt.getExpiresAt().isBefore(now)) {
            throw unauthorized("Refresh token is expired");
        }

        // check refresh token cũ bị reuse => nghi ngờ bị lộ token
        if (rt.getRotatedAt() != null) {
            UUID adminId = rt.getAdmin().getId();
            // lấy all tokens còn sống
            var activeTokens = adminRefreshTokenRepo.findAllByAdmin_IdAndRevokedAtIsNull(adminId);
            for (AdminRefreshToken token : activeTokens) {
                if (token.getRevokedAt() == null) {
                    token.setRevokedAt(now);
                }
            }
            adminRefreshTokenRepo.saveAll(activeTokens);
            throw unauthorized("Refresh token reuse detected. Please login again");
        }

        // generate and save new RT
        String newRefreshTokenRaw = generateRefreshTokenRaw();
        String newRefreshToken = sha256Hex(newRefreshTokenRaw);
        AdminRefreshToken refToken = buildAdminRefreshToken(rt.getAdmin(), newRefreshToken);
        adminRefreshTokenRepo.save(refToken);

        rt.setRotatedAt(now);
        rt.setRevokedAt(now);
        rt.setReplacedByToken(refToken);
        adminRefreshTokenRepo.save(rt);

        // set new RT cho new cookie
        ResponseCookie cookie = authCookieService.buildRefreshCookie(newRefreshTokenRaw, REFRESH_TTL);
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        // create new AT
        String newAccessToken = jwtService.issueAccessToken(refToken.getAdmin(), ACCESS_TTL);
        return new LoginResponse(newAccessToken, ACCESS_TTL.toSeconds());
    }

    @Override
    public void logout(String refreshTokenRaw, HttpServletResponse response) {
        OffsetDateTime now = OffsetDateTime.now();
        if (refreshTokenRaw == null || refreshTokenRaw.isBlank()) {
            throw unauthorized("Refresh token is null");
        }
        String refreshToken = sha256Hex(refreshTokenRaw);
        AdminRefreshToken rt = adminRefreshTokenRepo.findByTokenHash(refreshToken)
                .orElseThrow(() -> unauthorized("Invalid refresh token"));
        rt.setRevokedAt(now);
        adminRefreshTokenRepo.save(rt);
        ResponseCookie clear = authCookieService.clearRefreshCookie();
        response.addHeader(HttpHeaders.SET_COOKIE, clear.toString());
    }

    // helper
    private String sha256Hex(String refreshTokenRaw) {
        return DigestUtils.sha256Hex(refreshTokenRaw);
    }

    private RuntimeException unauthorized(String message) {
        return new RuntimeException(message);
    }

    private String generateRefreshTokenRaw() {
        // 256-bit random -> base64url string (an toàn, dài đủ)
        byte[] bytes = new byte[32];
        new SecureRandom().nextBytes(bytes);
        return java.util.Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }
    private AdminRefreshToken buildAdminRefreshToken (Admin ad, String tokenHash) {
        AdminRefreshToken refToken = new AdminRefreshToken();
        refToken.setId(UUID.randomUUID());
        refToken.setAdmin(ad);
        refToken.setTokenHash(tokenHash);
        refToken.setExpiresAt(now().plus(REFRESH_TTL));
        refToken.setRevokedAt(null);
        refToken.setRotatedAt(null);
        refToken.setReplacedByToken(null);
        return refToken;
    }
}
 