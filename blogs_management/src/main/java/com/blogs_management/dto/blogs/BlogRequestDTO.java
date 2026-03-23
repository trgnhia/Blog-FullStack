package com.blogs_management.dto.blogs;
import lombok.*;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BlogRequestDTO {

    @NotBlank(message = "{blog.title.not_blank}")
    @Size(max = 255, message = "{blog.title.size}")
    private String title;

    @NotBlank(message = "{blog.slug.not_blank}")
    @Size(max = 255, message = "{blog.slug.size}")
    private String slug;

    @Size(max = 500, message = "{blog.cover_image_path.size}")
    private String coverImagePath;

    private Long coverImageId;

    @NotBlank(message = "{blog.author.not_blank}")
    @Size(max = 100, message = "{blog.author.size}")
    private String author;

    @Size(max = 500, message = "{blog.excerpt.size}")
    private String excerpt;

    @NotBlank(message = "{blog.content.not_blank}")
    private String content;

    @Size(max = 255, message = "{blog.tags.size}")
    private String tags;

    @NotNull(message = "{blog.publish.not_null}")
    private Boolean publish;

    @NotBlank(message = "{blog.category.not_blank}")
    private String category;
}