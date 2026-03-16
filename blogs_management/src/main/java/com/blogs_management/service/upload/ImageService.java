package com.blogs_management.service.upload;

import com.blogs_management.dto.images.ImagePageResponseDTO;
import com.blogs_management.dto.images.ImageResponseDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ImageService {
    ImageResponseDTO fileUpload(MultipartFile file);
    List<ImageResponseDTO> getAllImageFiles();
    ImagePageResponseDTO getImageFiles(int page, int size);
}
