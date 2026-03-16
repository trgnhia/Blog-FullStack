package com.blogs_management.dto.blogs;

import lombok.*;

import java.time.OffsetDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BlogResponseDTO {
    private Long id;
    private OffsetDateTime createdAt;
    private String title;
    private Long coverImageId;
    private String excerpt;
    private String tags;
    private String coverImagePath;
    private String coverImageUrl;
    private String slug;
    private String author;
    private String content;
    private Boolean publish;
    private String category;
}
