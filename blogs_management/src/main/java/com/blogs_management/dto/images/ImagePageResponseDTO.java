package com.blogs_management.dto.images;

import lombok.Data;

import java.util.List;
@Data
public class ImagePageResponseDTO {
    private List<ImageResponseDTO> items;
    private boolean hasNext;
}
