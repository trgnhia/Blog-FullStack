package com.blogs_management.service.blog;

import com.blogs_management.dto.blogs.BlogRequestDTO;
import com.blogs_management.dto.blogs.BlogResponseDTO;

import java.util.List;

public interface BlogService {
    BlogResponseDTO createBlog(BlogRequestDTO dto);
    BlogResponseDTO updateBlog(BlogRequestDTO dto, Long id);
    void deleteBlog(Long id);
    List<BlogResponseDTO> getAllBlogs();
    BlogResponseDTO getBlogWithSlug(String slug);
    List<BlogResponseDTO> getPublishedBlog(Boolean published);
    List<BlogResponseDTO> getBlogsByCategoryAndPublished(String category);
}
