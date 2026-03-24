package com.blogs_management.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse<T> {
    private int status;
    private String message;
    private T data;
    private boolean success;

    public static <T> ApiResponse<T> success (int status, T data, String message) {
        return ApiResponse.<T>builder()
                .status(status)
                .data(data)
                .success(true)
                .message(message)
                .build();
    }
    public static <T> ApiResponse<T> failure (int status, T data, String message) {
        return ApiResponse.<T>builder()
                .status(status)
                .data(data)
                .success(false)
                .message(message)
                .build();
    }
}
