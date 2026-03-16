package com.blogs_management.mapper;

import com.blogs_management.dto.blogs.BlogRequestDTO;
import com.blogs_management.dto.blogs.BlogResponseDTO;
import com.blogs_management.model.Blog;
import org.springframework.stereotype.Component;

@Component
public class BlogMapper {
    private final String baseUrl = "http://localhost:8081";
    public Blog toEntity(BlogRequestDTO dto) {
        Blog blogEntity = new Blog();
        blogEntity.setTitle(dto.getTitle());
        blogEntity.setContent(dto.getContent());
        blogEntity.setAuthor(dto.getAuthor());
        blogEntity.setSlug(dto.getSlug());
        blogEntity.setTags(dto.getTags());
        blogEntity.setCoverImage(dto.getCoverImagePath());
        blogEntity.setExcerpt(dto.getExcerpt());
        blogEntity.setPublish(dto.getPublish());
        blogEntity.setCategory(dto.getCategory());
        blogEntity.setCoverImageId(dto.getCoverImageId());
        return blogEntity;
    }
    public BlogResponseDTO toBlogResponseDTO(Blog entity) {
        BlogResponseDTO dto = new BlogResponseDTO();
        if (entity.getCoverImage().startsWith("/uploads/blogImages/")) {
            dto.setCoverImageUrl(baseUrl + entity.getCoverImage());
        } else {
            dto.setCoverImageUrl(entity.getCoverImage());
        }
        dto.setCoverImagePath(entity.getCoverImage());
        dto.setId(entity.getId());
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setTitle(entity.getTitle());
        dto.setTags(entity.getTags());
        dto.setExcerpt(entity.getExcerpt());
        dto.setCategory(entity.getCategory());
        dto.setSlug(entity.getSlug());
        dto.setAuthor(entity.getAuthor());
        dto.setContent(entity.getContent());
        dto.setPublish(entity.getPublish());
        dto.setCoverImageId(entity.getCoverImageId());
        return dto;
    }
    public Blog updateBlog(BlogRequestDTO dto, Blog entity) {
        entity.setTitle(dto.getTitle());
        entity.setContent(dto.getContent());
        entity.setSlug(dto.getSlug());
        entity.setTags(dto.getTags());
        entity.setAuthor(dto.getAuthor());
        entity.setCoverImage(dto.getCoverImagePath());
        entity.setExcerpt(dto.getExcerpt());
        entity.setPublish(dto.getPublish());
        entity.setCategory(dto.getCategory());
        entity.setCoverImageId(dto.getCoverImageId());
        return entity;
    }
}
