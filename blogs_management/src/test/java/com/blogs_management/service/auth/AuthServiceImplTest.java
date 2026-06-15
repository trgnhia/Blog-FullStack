package com.blogs_management.service.auth;

import com.blogs_management.constant.AppConstants;
import com.blogs_management.dto.login.LoginResponse;
import com.blogs_management.entity.Admin;
import com.blogs_management.entity.AdminRefreshToken;
import com.blogs_management.exception.UnauthorizedException;
import com.blogs_management.repository.AdminRefreshTokenRepository;
import com.blogs_management.repository.AdminRepository;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.commons.codec.digest.DigestUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.Duration;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.ArgumentMatchers.nullable;
import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AuthServiceImplTest {

    private static final Duration ACCESS_TTL = Duration.ofMinutes(10);
    private static final Duration REFRESH_TTL = Duration.ofDays(14);
    private static final UUID ADMIN_ID = UUID.fromString("11111111-1111-1111-1111-111111111111");

    @Mock
    private AdminRepository adminRepository;

    @Mock
    private AdminRefreshTokenRepository adminRefreshTokenRepo;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    @Mock
    private AuthCookieService authCookieService;

    @Mock
    private MessageSource messageSource;

    @Mock
    private HttpServletResponse response;

    @InjectMocks
    private AuthServiceImpl authService;

    @BeforeEach
    void setUp() {
        lenient().when(messageSource.getMessage(anyString(), nullable(Object[].class), any(Locale.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));
    }

    @Test
    void login_WhenEmailDoesNotExist_ShouldThrowUnauthorizedException() {
        when(adminRepository.findByEmail("missing@example.com")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> authService.login("missing@example.com", "password", response))
                .isInstanceOf(UnauthorizedException.class)
                .hasMessage(AppConstants.MESSAGE_KEY_AUTH_LOGIN_INVALID_EMAIL);

        verify(adminRepository).findByEmail("missing@example.com");
        verifyNoInteractions(passwordEncoder, jwtService, authCookieService, adminRefreshTokenRepo);
    }

    @Test
    void login_WhenAccountIsDisabled_ShouldThrowUnauthorizedException() {
        Admin admin = activeAdmin();
        admin.setStatus("DISABLED");
        String email = admin.getEmail();

        when(adminRepository.findByEmail(email)).thenReturn(Optional.of(admin));

        assertThatThrownBy(() -> authService.login(email, "password", response))
                .isInstanceOf(UnauthorizedException.class)
                .hasMessage(AppConstants.MESSAGE_KEY_AUTH_LOGIN_ACCOUNT_DISABLED);

        verify(adminRepository).findByEmail(email);
        verify(adminRepository, never()).save(any(Admin.class));
        verifyNoInteractions(passwordEncoder, jwtService, authCookieService, adminRefreshTokenRepo);
    }

    @Test
    void login_WhenPasswordIsWrong_ShouldIncreaseFailedLoginCountAndThrowUnauthorizedException() {
        Admin admin = activeAdmin();
        admin.setFailedLoginCount(2);
        String email = admin.getEmail();

        when(adminRepository.findByEmail(email)).thenReturn(Optional.of(admin));
        when(passwordEncoder.matches("wrong-password", admin.getPasswordHash())).thenReturn(false);

        assertThatThrownBy(() -> authService.login(email, "wrong-password", response))
                .isInstanceOf(UnauthorizedException.class)
                .hasMessage(AppConstants.MESSAGE_KEY_AUTH_LOGIN_INCORRECT_PASSWORD);

        assertThat(admin.getFailedLoginCount()).isEqualTo(3);
        verify(adminRepository).save(admin);
        verifyNoInteractions(jwtService, authCookieService, adminRefreshTokenRepo);
    }

    @Test
    void login_WhenCredentialsAreCorrect_ShouldIssueAccessTokenSaveRefreshTokenAndSetCookie() {
        Admin admin = activeAdmin();
        admin.setFailedLoginCount(4);
        ResponseCookie cookie = ResponseCookie.from("refresh_token", "refresh-value").build();

        when(adminRepository.findByEmail(admin.getEmail())).thenReturn(Optional.of(admin));
        when(passwordEncoder.matches("password", admin.getPasswordHash())).thenReturn(true);
        when(jwtService.issueAccessToken(admin, ACCESS_TTL)).thenReturn("access-token");
        when(authCookieService.buildRefreshCookie(anyString(), eq(REFRESH_TTL))).thenReturn(cookie);
        when(adminRefreshTokenRepo.save(any(AdminRefreshToken.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        LoginResponse result = authService.login(admin.getEmail(), "password", response);

        assertThat(result.getAccessToken()).isEqualTo("access-token");
        assertThat(result.getAccessTokenExpiresInSecond()).isEqualTo(ACCESS_TTL.toSeconds());
        assertThat(admin.getFailedLoginCount()).isZero();
        assertThat(admin.getLastLoginAt()).isNotNull();
        verify(adminRepository).save(admin);

        ArgumentCaptor<AdminRefreshToken> tokenCaptor = ArgumentCaptor.forClass(AdminRefreshToken.class);
        verify(adminRefreshTokenRepo).save(tokenCaptor.capture());
        AdminRefreshToken savedToken = tokenCaptor.getValue();

        assertThat(savedToken.getId()).isNotNull();
        assertThat(savedToken.getAdmin()).isSameAs(admin);
        assertThat(savedToken.getTokenHash()).isNotBlank();
        assertThat(savedToken.getExpiresAt()).isAfter(OffsetDateTime.now());
        assertThat(savedToken.getRevokedAt()).isNull();
        assertThat(savedToken.getRotatedAt()).isNull();
        assertThat(savedToken.getReplacedByToken()).isNull();
        verify(response).addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }

    @Test
    void refresh_WhenRefreshTokenIsBlank_ShouldThrowUnauthorizedException() {
        assertThatThrownBy(() -> authService.refresh(" ", response))
                .isInstanceOf(UnauthorizedException.class)
                .hasMessage(AppConstants.MESSAGE_KEY_AUTH_REFRESH_TOKEN_NULL);

        verifyNoInteractions(adminRefreshTokenRepo, jwtService, authCookieService);
    }

    @Test
    void refresh_WhenRefreshTokenDoesNotExist_ShouldThrowUnauthorizedException() {
        String rawRefreshToken = "missing-refresh-token";
        String tokenHash = DigestUtils.sha256Hex(rawRefreshToken);

        when(adminRefreshTokenRepo.findByTokenHash(tokenHash)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> authService.refresh(rawRefreshToken, response))
                .isInstanceOf(UnauthorizedException.class)
                .hasMessage(AppConstants.MESSAGE_KEY_AUTH_REFRESH_INVALID_TOKEN);

        verify(adminRefreshTokenRepo).findByTokenHash(tokenHash);
        verify(adminRefreshTokenRepo, never()).save(any(AdminRefreshToken.class));
        verifyNoInteractions(jwtService, authCookieService);
    }

    @Test
    void refresh_WhenRefreshTokenIsExpired_ShouldThrowUnauthorizedException() {
        Admin admin = activeAdmin();
        String rawRefreshToken = "expired-refresh-token";
        String tokenHash = DigestUtils.sha256Hex(rawRefreshToken);
        AdminRefreshToken refreshToken = refreshToken(admin, rawRefreshToken, OffsetDateTime.now().minusMinutes(1));

        when(adminRefreshTokenRepo.findByTokenHash(tokenHash)).thenReturn(Optional.of(refreshToken));

        assertThatThrownBy(() -> authService.refresh(rawRefreshToken, response))
                .isInstanceOf(UnauthorizedException.class)
                .hasMessage(AppConstants.MESSAGE_KEY_AUTH_REFRESH_EXPIRED_TOKEN);

        verify(adminRefreshTokenRepo).findByTokenHash(tokenHash);
        verify(adminRefreshTokenRepo, never()).save(any(AdminRefreshToken.class));
        verifyNoInteractions(jwtService, authCookieService);
    }

    @Test
    void refresh_WhenRefreshTokenWasAlreadyRotated_ShouldRevokeActiveTokensAndThrowUnauthorizedException() {
        Admin admin = activeAdmin();
        String rawRefreshToken = "rotated-refresh-token";
        String tokenHash = DigestUtils.sha256Hex(rawRefreshToken);
        AdminRefreshToken rotatedToken = refreshToken(admin, rawRefreshToken, OffsetDateTime.now().plusDays(1));
        rotatedToken.setRotatedAt(OffsetDateTime.now().minusMinutes(5));
        AdminRefreshToken activeToken = refreshToken(admin, "active-refresh-token", OffsetDateTime.now().plusDays(1));
        AdminRefreshToken anotherActiveToken = refreshToken(admin, "another-active-refresh-token", OffsetDateTime.now().plusDays(1));
        List<AdminRefreshToken> activeTokens = List.of(activeToken, anotherActiveToken);

        when(adminRefreshTokenRepo.findByTokenHash(tokenHash)).thenReturn(Optional.of(rotatedToken));
        when(adminRefreshTokenRepo.findAllByAdmin_IdAndRevokedAtIsNull(admin.getId())).thenReturn(activeTokens);

        assertThatThrownBy(() -> authService.refresh(rawRefreshToken, response))
                .isInstanceOf(UnauthorizedException.class)
                .hasMessage(AppConstants.MESSAGE_KEY_AUTH_REFRESH_REUSE_DETECTED);

        assertThat(activeToken.getRevokedAt()).isNotNull();
        assertThat(anotherActiveToken.getRevokedAt()).isNotNull();
        verify(adminRefreshTokenRepo).saveAll(activeTokens);
        verify(adminRefreshTokenRepo, never()).save(any(AdminRefreshToken.class));
        verifyNoInteractions(jwtService, authCookieService);
    }

    @Test
    void refresh_WhenRefreshTokenIsValid_ShouldRotateRefreshTokenIssueAccessTokenAndSetCookie() {
        Admin admin = activeAdmin();
        String rawRefreshToken = "valid-refresh-token";
        String tokenHash = DigestUtils.sha256Hex(rawRefreshToken);
        AdminRefreshToken oldRefreshToken = refreshToken(admin, rawRefreshToken, OffsetDateTime.now().plusDays(1));
        ResponseCookie cookie = ResponseCookie.from("refresh_token", "new-refresh-value").build();

        when(adminRefreshTokenRepo.findByTokenHash(tokenHash)).thenReturn(Optional.of(oldRefreshToken));
        when(adminRefreshTokenRepo.save(any(AdminRefreshToken.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));
        when(authCookieService.buildRefreshCookie(anyString(), eq(REFRESH_TTL))).thenReturn(cookie);
        when(jwtService.issueAccessToken(admin, ACCESS_TTL)).thenReturn("new-access-token");

        LoginResponse result = authService.refresh(rawRefreshToken, response);

        assertThat(result.getAccessToken()).isEqualTo("new-access-token");
        assertThat(result.getAccessTokenExpiresInSecond()).isEqualTo(ACCESS_TTL.toSeconds());

        ArgumentCaptor<AdminRefreshToken> tokenCaptor = ArgumentCaptor.forClass(AdminRefreshToken.class);
        verify(adminRefreshTokenRepo, times(2)).save(tokenCaptor.capture());
        List<AdminRefreshToken> savedTokens = tokenCaptor.getAllValues();
        AdminRefreshToken newRefreshToken = savedTokens.get(0);
        AdminRefreshToken revokedOldToken = savedTokens.get(1);

        assertThat(newRefreshToken).isNotSameAs(oldRefreshToken);
        assertThat(newRefreshToken.getAdmin()).isSameAs(admin);
        assertThat(newRefreshToken.getTokenHash()).isNotBlank();
        assertThat(newRefreshToken.getTokenHash()).isNotEqualTo(tokenHash);
        assertThat(newRefreshToken.getExpiresAt()).isAfter(OffsetDateTime.now());
        assertThat(newRefreshToken.getRevokedAt()).isNull();
        assertThat(newRefreshToken.getRotatedAt()).isNull();

        assertThat(revokedOldToken).isSameAs(oldRefreshToken);
        assertThat(oldRefreshToken.getRotatedAt()).isNotNull();
        assertThat(oldRefreshToken.getRevokedAt()).isNotNull();
        assertThat(oldRefreshToken.getReplacedByToken()).isSameAs(newRefreshToken);
        verify(response).addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }

    @Test
    void logout_WhenRefreshTokenIsBlank_ShouldThrowUnauthorizedException() {
        assertThatThrownBy(() -> authService.logout("", response))
                .isInstanceOf(UnauthorizedException.class)
                .hasMessage(AppConstants.MESSAGE_KEY_AUTH_LOGOUT_TOKEN_NULL);

        verifyNoInteractions(adminRefreshTokenRepo, authCookieService);
    }

    @Test
    void logout_WhenRefreshTokenDoesNotExist_ShouldThrowUnauthorizedException() {
        String rawRefreshToken = "missing-logout-token";
        String tokenHash = DigestUtils.sha256Hex(rawRefreshToken);

        when(adminRefreshTokenRepo.findByTokenHash(tokenHash)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> authService.logout(rawRefreshToken, response))
                .isInstanceOf(UnauthorizedException.class)
                .hasMessage(AppConstants.MESSAGE_KEY_AUTH_LOGOUT_INVALID_TOKEN);

        verify(adminRefreshTokenRepo).findByTokenHash(tokenHash);
        verify(adminRefreshTokenRepo, never()).save(any(AdminRefreshToken.class));
        verifyNoInteractions(authCookieService);
    }

    @Test
    void logout_WhenRefreshTokenIsValid_ShouldRevokeTokenAndClearCookie() {
        Admin admin = activeAdmin();
        String rawRefreshToken = "valid-logout-token";
        String tokenHash = DigestUtils.sha256Hex(rawRefreshToken);
        AdminRefreshToken refreshToken = refreshToken(admin, rawRefreshToken, OffsetDateTime.now().plusDays(1));
        ResponseCookie clearCookie = ResponseCookie.from("refresh_token", "").maxAge(0).build();

        when(adminRefreshTokenRepo.findByTokenHash(tokenHash)).thenReturn(Optional.of(refreshToken));
        when(authCookieService.clearRefreshCookie()).thenReturn(clearCookie);

        authService.logout(rawRefreshToken, response);

        assertThat(refreshToken.getRevokedAt()).isNotNull();
        verify(adminRefreshTokenRepo).save(refreshToken);
        verify(authCookieService).clearRefreshCookie();
        verify(response).addHeader(HttpHeaders.SET_COOKIE, clearCookie.toString());
    }

    private Admin activeAdmin() {
        Admin admin = new Admin();
        admin.setId(ADMIN_ID);
        admin.setEmail("admin@example.com");
        admin.setPasswordHash("encoded-password");
        admin.setRole("ADMIN");
        admin.setStatus(AppConstants.STATUS_ACTIVE);
        admin.setFailedLoginCount(0);
        return admin;
    }

    private AdminRefreshToken refreshToken(Admin admin, String rawRefreshToken, OffsetDateTime expiresAt) {
        AdminRefreshToken refreshToken = new AdminRefreshToken();
        refreshToken.setId(UUID.randomUUID());
        refreshToken.setAdmin(admin);
        refreshToken.setTokenHash(DigestUtils.sha256Hex(rawRefreshToken));
        refreshToken.setExpiresAt(expiresAt);
        return refreshToken;
    }
}
