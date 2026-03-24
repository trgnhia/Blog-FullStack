package com.blogs_management.controller;

import com.blogs_management.dto.ApiResponse;
import com.blogs_management.dto.blogs.BlogRequestDTO;
import com.blogs_management.dto.blogs.BlogResponseDTO;
import com.blogs_management.service.MessageService;
import com.blogs_management.service.blog.BlogService;
import jakarta.validation.Valid;
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
    private final MessageService messageService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<BlogResponseDTO>>> getAllBlogs() {
        List<BlogResponseDTO> blogs = blogService.getAllBlogs();
        return ResponseEntity.status(HttpStatus.OK).body(
                ApiResponse.success(
                        HttpStatus.OK.value(),
                        blogs,
                        messageService.get("blog.get_all.success")
                )
        );
    }

    @GetMapping("/published")
    public ResponseEntity<ApiResponse<List<BlogResponseDTO>>> getAllBlogsPublished(
            @RequestParam(required = false) Boolean published
    ) {
        List<BlogResponseDTO> blogs = blogService.getPublishedBlog(published);
        return ResponseEntity.status(HttpStatus.OK).body(
                ApiResponse.success(
                        HttpStatus.OK.value(),
                        blogs,
                        messageService.get("blog.get_published.success")
                )
        );
    }

    @GetMapping("/by-slug/{slug}")
    public ResponseEntity<ApiResponse<BlogResponseDTO>> getBlogBySlug(@PathVariable String slug) {
        BlogResponseDTO response = blogService.getBlogWithSlug(slug);
        return ResponseEntity.status(HttpStatus.OK).body(
                ApiResponse.success(
                        HttpStatus.OK.value(),
                        response,
                        messageService.get("blog.get_by_slug.success")
                )
        );
    }

    @PostMapping
    public ResponseEntity<ApiResponse<BlogResponseDTO>> create(@Valid @RequestBody BlogRequestDTO dto) {
        BlogResponseDTO response = blogService.createBlog(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(
                ApiResponse.success(
                        HttpStatus.CREATED.value(),
                        response,
                        messageService.get("blog.create.success")
                )
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<BlogResponseDTO>> update(
            @PathVariable Long id,
            @Valid @RequestBody BlogRequestDTO dto
    ) {
        BlogResponseDTO response = blogService.updateBlog(dto, id);
        return ResponseEntity.status(HttpStatus.OK).body(
                ApiResponse.success(
                        HttpStatus.OK.value(),
                        response,
                        messageService.get("blog.update.success")
                )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        blogService.deleteBlog(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(
                ApiResponse.success(
                        HttpStatus.NO_CONTENT.value(),
                        null,
                        messageService.get("blog.delete.success")
                )
        );
    }

    @GetMapping("/category")
    public ResponseEntity<ApiResponse<List<BlogResponseDTO>>> getBlogsByCategory(
            @RequestParam(required = false) String category
    ) {
        List<BlogResponseDTO> response = blogService.getBlogsByCategoryAndPublished(category);
        return ResponseEntity.status(HttpStatus.OK).body(
                ApiResponse.success(
                        HttpStatus.OK.value(),
                        response,
                        messageService.get("blog.get_by_category.success")
                )
        );
    }

}