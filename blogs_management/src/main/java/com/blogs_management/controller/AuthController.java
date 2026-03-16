package com.blogs_management.controller;

import com.blogs_management.dto.login.LoginRequest;
import com.blogs_management.dto.login.LoginResponse;
import com.blogs_management.service.auth.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    @PostMapping("/auth/login")
    public ResponseEntity<LoginResponse> login (@Valid @RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        LoginResponse res = authService.login(loginRequest.getEmail(), loginRequest.getPassword(), response);
        return ResponseEntity.ok(res);
    }

    @PostMapping("/auth/refresh")
    public ResponseEntity<LoginResponse> refresh (@CookieValue(name="refresh_token", required=false) String refreshTokenRaw
                , HttpServletResponse response) {
        LoginResponse res = authService.refresh(refreshTokenRaw, response);
        return ResponseEntity.ok(res);
    }

    @PostMapping("/auth/logout")
    public ResponseEntity<String> logout (@CookieValue(name="refresh_token", required=false) String refreshTokenRaw
            , HttpServletResponse response) {
        authService.logout(refreshTokenRaw, response);
        return ResponseEntity.ok("Logout successful");
    }
}
