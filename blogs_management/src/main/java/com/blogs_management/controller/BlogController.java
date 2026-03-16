package com.blogs_management.controller;

import com.blogs_management.dto.blogs.BlogRequestDTO;
import com.blogs_management.dto.blogs.BlogResponseDTO;
import com.blogs_management.service.blog.BlogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/blogs")
@RequiredArgsConstructor
public class BlogController {
    private final BlogService blogService;

    @GetMapping
    public ResponseEntity<List<BlogResponseDTO>> getAllBlogs() {
        List<BlogResponseDTO> blogs = blogService.getAllBlogs();
        return ResponseEntity.status(HttpStatus.OK).body(blogs);
    }

    @GetMapping("/published")
    public ResponseEntity<List<BlogResponseDTO>> getAllBlogsPublished(@RequestParam(required = false) Boolean published) {
        List<BlogResponseDTO> blogs = blogService.getPublishedBlog(published);
        return ResponseEntity.status(HttpStatus.OK).body(blogs);
    }

    @GetMapping("/by-slug/{slug}")
    public ResponseEntity<BlogResponseDTO> getBlogBySlug(@PathVariable String slug) {
        BlogResponseDTO response = blogService.getBlogWithSlug(slug);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping
    public ResponseEntity<BlogResponseDTO> create(@RequestBody BlogRequestDTO dto) {
        BlogResponseDTO response = blogService.createBlog(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BlogResponseDTO> update(@PathVariable Long id,@RequestBody BlogRequestDTO dto) {
        BlogResponseDTO response = blogService.updateBlog(dto, id);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<BlogResponseDTO> delete(@PathVariable Long id) {
        blogService.deleteBlog(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/category")
    public ResponseEntity<List<BlogResponseDTO>> getBlogsByCategory(@RequestParam(required = false) String category) {
        List<BlogResponseDTO > response = blogService.getBlogsByCategoryAndPublished(category);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
