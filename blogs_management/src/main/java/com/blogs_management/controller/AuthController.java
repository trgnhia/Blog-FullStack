package com.blogs_management.controller;

import com.blogs_management.dto.ApiResponse;
import com.blogs_management.dto.login.LoginRequest;
import com.blogs_management.dto.login.LoginResponse;
import com.blogs_management.service.MessageService;
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
    private final MessageService messageService;

    @PostMapping("/auth/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(
            @Valid @RequestBody LoginRequest loginRequest,
            HttpServletResponse response
    ) {
        LoginResponse res = authService.login(
                loginRequest.getEmail(),
                loginRequest.getPassword(),
                response
        );

        return ResponseEntity.ok(
                ApiResponse.success(
                        HttpStatus.OK.value(),
                        res,
                        messageService.get("auth.login.success")
                )
        );
    }

    @PostMapping("/auth/refresh")
    public ResponseEntity<ApiResponse<LoginResponse>> refresh(
            @CookieValue(name = "refresh_token", required = false) String refreshTokenRaw,
            HttpServletResponse response
    ) {
        LoginResponse res = authService.refresh(refreshTokenRaw, response);

        return ResponseEntity.ok(
                ApiResponse.success(
                        HttpStatus.OK.value(),
                        res,
                        messageService.get("auth.refresh.success")
                )
        );
    }

    @PostMapping("/auth/logout")
    public ResponseEntity<ApiResponse<Void>> logout(
            @CookieValue(name = "refresh_token", required = false) String refreshTokenRaw,
            HttpServletResponse response
    ) {
        authService.logout(refreshTokenRaw, response);

        return ResponseEntity.ok(
                ApiResponse.success(
                        HttpStatus.OK.value(),
                        null,
                        messageService.get("auth.logout.success")
                )
        );
    }
}