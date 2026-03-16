package com.blogs_management.dto.images;

import lombok.Data;

import java.time.OffsetDateTime;

@Data
public class ImageResponseDTO {
    private String fileName;
    private String path;
    private String url;
    private OffsetDateTime createdAt;
}
