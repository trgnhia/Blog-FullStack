package com.blogs_management.dto.images;

import com.blogs_management.model.Image;
import lombok.Data;

import java.util.List;
@Data
public class ImagePageResponseDTO {
    private List<ImageResponseDTO> items;
    private boolean hasNext;
}
