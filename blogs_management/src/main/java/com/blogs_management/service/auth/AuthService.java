package com.blogs_management.service.auth;

import com.blogs_management.dto.login.LoginResponse;
import jakarta.servlet.http.HttpServletResponse;

public interface AuthService {
    LoginResponse login(String email, String rawPassword, HttpServletResponse response );
    LoginResponse refresh(String refreshTokenRaw, HttpServletResponse response);
    void logout(String refreshTokenRaw,HttpServletResponse response );
}
