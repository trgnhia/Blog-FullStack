package com.blogs_management.exception;

import com.blogs_management.dto.exception.ExceptionResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(value = ResourceNotFoundException.class)
    public ResponseEntity<ExceptionResponseDTO> handleResourceNotFound(ResourceNotFoundException e) {
        HttpStatus status = HttpStatus.NOT_FOUND;
        ExceptionResponseDTO response = new ExceptionResponseDTO(
                e.getMessage(),
                status.value(),
                status.getReasonPhrase()
        );
        return ResponseEntity.status(status).body(response);
    }

    @ExceptionHandler(value = ResourceConflictException.class)
    public ResponseEntity<ExceptionResponseDTO> handleResourceConflict(ResourceConflictException e) {
        HttpStatus status = HttpStatus.CONFLICT;
        ExceptionResponseDTO response = new ExceptionResponseDTO(
                e.getMessage(),
                status.value(),
                status.getReasonPhrase()
        );
        return ResponseEntity.status(status).body(response);
    }

}
