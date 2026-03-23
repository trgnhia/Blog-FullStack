package com.blogs_management.controller;

import com.blogs_management.dto.ApiResponse;
import com.blogs_management.dto.images.ImagePageResponseDTO;
import com.blogs_management.dto.images.ImageResponseDTO;
import com.blogs_management.service.upload.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/uploads")
@RequiredArgsConstructor
public class UploadController {

    private final ImageService imageService;

    @PostMapping("/blog-cover")
    public ResponseEntity<ApiResponse<ImageResponseDTO>> uploadBlogImage(
            @RequestParam("file") MultipartFile file
    ) {
        ImageResponseDTO imageResponseDTO = imageService.fileUpload(file);

        return ResponseEntity.ok(
                ApiResponse.success(
                        HttpStatus.OK.value(),
                        imageResponseDTO,
                        "Upload image successfully"
                )
        );
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<ImageResponseDTO>>> getAllImagesFile() {
        List<ImageResponseDTO> listDto = imageService.getAllImageFiles();

        return ResponseEntity.status(HttpStatus.OK).body(
                ApiResponse.success(
                        HttpStatus.OK.value(),
                        listDto,
                        "Get all images successfully"
                )
        );
    }

    @GetMapping("/pageable")
    public ResponseEntity<ApiResponse<ImagePageResponseDTO>> getImageFiles(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "0") int size
    ) {
        ImagePageResponseDTO imagePageResponseDTO = imageService.getImageFiles(page, size);

        return ResponseEntity.status(HttpStatus.OK).body(
                ApiResponse.success(
                        HttpStatus.OK.value(),
                        imagePageResponseDTO,
                        "Get images pageable successfully"
                )
        );
    }
}