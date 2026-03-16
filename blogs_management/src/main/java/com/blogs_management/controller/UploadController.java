package com.blogs_management.controller;

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
    public ResponseEntity<ImageResponseDTO> uploadBlogImage(@RequestParam("file") MultipartFile file) {
        ImageResponseDTO imageResponseDTO = new ImageResponseDTO();
        imageResponseDTO  = imageService.fileUpload(file);
        return ResponseEntity.ok(imageResponseDTO);
    }

    @GetMapping()
    public ResponseEntity<List<ImageResponseDTO>> getAllImagesFile() {
        List<ImageResponseDTO> listDto = imageService.getAllImageFiles();
        return ResponseEntity.status(HttpStatus.OK).body(listDto);
    }
    @GetMapping("/pageable")
    public ResponseEntity<ImagePageResponseDTO> getImageFiles(@RequestParam(defaultValue="0") int page,
                                                              @RequestParam(defaultValue="0") int size ) {
       ImagePageResponseDTO imagePageResponseDTO = imageService.getImageFiles(page, size);
       return ResponseEntity.status(HttpStatus.OK).body(imagePageResponseDTO);
    }
}
