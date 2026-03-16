package com.blogs_management.service.auth;

import com.blogs_management.dto.auth.JwtPrincipal;
import com.blogs_management.model.Admin;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.Date;

@Service
public class

JwtService {
    @Value("${app.jwt.secret}")
    private String jwtSecret;
    @Value("${app.jwt.issuer:blogs-management}")
    private String jwtIssuer;

    public String issueAccessToken(Admin admin, Duration ttl) {
        Date now = new Date();
        Date expires = new Date(now.getTime() + ttl.toMillis());

        // HS256 key
        var key = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
        //payload sẽ có: iss, sub, iat, exp, role.
        return Jwts.builder()
                .setIssuer(jwtIssuer)
                .setSubject(admin.getId().toString())
                .setIssuedAt(now)
                .setExpiration(expires)
                .claim("role", admin.getRole())
                .signWith(key, SignatureAlgorithm.HS256) //Signature (quan trọng nhất)
                .compact();
    }

    public JwtPrincipal validateAndParseAccessToken (String token) {
        if (token == null || token.isBlank()) {
            throw new RuntimeException("Token is blank");
        }
        var key = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
        try {
            //JSON Web Signature: Jws<Claims> = JWT đã được verify chữ ký thành công + payload
            Jws<Claims> jws = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .requireIssuer(jwtIssuer) // bắt buộc iss phải đúng
                    .build()
                    .parseClaimsJws(token);
            //Claims = payload của JWT, chính là những gì ta đã set khi issue:
            Claims claims = jws.getBody();
            String subject = claims.getSubject();
            String role = claims.get("role", String.class);
            if (subject == null || subject.isBlank()) {
                throw new RuntimeException("Token subject is missing");
            }
            if (role == null || role.isBlank()) {
                throw new RuntimeException("Token role is missing");
            }
            return new JwtPrincipal(subject, role);
        } catch (JwtException | IllegalArgumentException e) {
            throw new RuntimeException("Invalid access token", e);
        }
    }
}
