package com.blogs_management.service.auth;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
public class AuthCookieService {
    @Value("${app.auth.refresh-cookie.name:refresh_token}")
    private String refreshCookieName;

    @Value("${app.auth.refresh-cookie.path:/}")
    private String refreshCookiePath;

    // Prod: true (https). dev local có thể false.
    @Value("${app.auth.refresh-cookie.secure:true}")
    private boolean refreshCookieSecure;

    // Nếu admin FE khác domain BE => thường cần SameSite=None
    @Value("${app.auth.refresh-cookie.same-site:None}")
    private String refreshCookieSameSite;

    @Value("${app.auth.refresh-cookie.domain:}")
    private String refreshCookieDomain;

    public ResponseCookie buildRefreshCookie(String refreshRaw, Duration ttl) {
        return ResponseCookie.from(refreshCookieName, refreshRaw)
                .httpOnly(true)                          // JS không đọc được
                .secure(refreshCookieSecure)
                .path(refreshCookiePath)                 // gửi cho mọi endpoint
                .sameSite(refreshCookieSameSite)         // local dev an toàn
                .maxAge(ttl)                             // 14 ngày
                .build();
    }
    public ResponseCookie clearRefreshCookie() {
        return ResponseCookie.from(refreshCookieName, "")
                .httpOnly(true)
                .secure(refreshCookieSecure)
                .path(refreshCookiePath)
                .sameSite(refreshCookieSameSite)
                .maxAge(0)
                .build();
    }
}
