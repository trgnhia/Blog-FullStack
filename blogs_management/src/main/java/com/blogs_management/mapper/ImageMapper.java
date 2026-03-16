package com.blogs_management.mapper;

import com.blogs_management.dto.images.ImageResponseDTO;
import com.blogs_management.model.Image;
import org.springframework.stereotype.Component;

@Component
public class ImageMapper {
    private final String baseUrl = "http://localhost:8081";
    public ImageResponseDTO toImageResponseDTO (Image entity) {
        ImageResponseDTO dto = new ImageResponseDTO();
        dto.setFileName(entity.getFileName());
        dto.setPath(entity.getPath());
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setUrl(baseUrl + entity.getPath());
        return dto;
    }
}
