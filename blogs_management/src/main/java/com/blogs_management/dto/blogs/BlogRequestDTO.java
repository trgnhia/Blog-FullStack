package com.blogs_management.dto.blogs;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BlogRequestDTO {
    private String title;
    private String slug;
    private String coverImagePath;
    private Long coverImageId;
    private String author;
    private String excerpt;
    private String content;
    private String tags;
    private Boolean publish;
    private String category;
}
