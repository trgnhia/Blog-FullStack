package com.blogs_management.service.blog;

import com.blogs_management.dto.blogs.BlogRequestDTO;
import com.blogs_management.dto.blogs.BlogResponseDTO;
import com.blogs_management.exception.ResourceNotFoundException;
import com.blogs_management.mapper.BlogMapper;
import com.blogs_management.model.Blog;
import com.blogs_management.repository.BlogRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BlogServiceImpl implements BlogService {
    public final BlogRepository blogRepository;
    public final BlogMapper blogMapper;

    @Override
    @Transactional
    public List<BlogResponseDTO> getAllBlogs() {
        List<Blog> blogs = blogRepository.findAll();
        return blogs.stream()
                .map(blogMapper::toBlogResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public List<BlogResponseDTO> getPublishedBlog(Boolean published) {
       List<Blog> blogs;
       if (published == null) {
           blogs = blogRepository.findAll();
       } else {
           blogs = blogRepository.findByPublish(published);
       }
        return blogs.stream()
                .map(blogMapper::toBlogResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public List<BlogResponseDTO> getBlogsByCategoryAndPublished(String category) {
        List<Blog> blogs = blogRepository.findByCategoryAndPublish(category, true);
        return blogs.stream()
                .map(blogMapper::toBlogResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public BlogResponseDTO getBlogWithSlug(String slug) {
        Blog blog = blogRepository.findBySlug(slug);
        if (blog == null) {
            throw new ResourceNotFoundException("Blog not found with slug: " + slug);
        }
        return blogMapper.toBlogResponseDTO(blog);
    }


    @Override
    @Transactional
    public BlogResponseDTO createBlog(BlogRequestDTO dto) {
        Blog blog = blogMapper.toEntity(dto);
        blogRepository.save(blog);
        return blogMapper.toBlogResponseDTO(blog);
    }
    @Override
    @Transactional
    public BlogResponseDTO updateBlog(BlogRequestDTO dto, Long id) {
        Optional<Blog> blog = blogRepository.findById(id);
        if (blog.isEmpty()) throw new ResourceNotFoundException("Blog not found with id: " + id);
        blogMapper.updateBlog(dto, blog.get());
        Blog updatedBlog = blogRepository.save(blog.get());

        return blogMapper.toBlogResponseDTO(updatedBlog);
    }

    @Override
    @Transactional
    public void deleteBlog(Long id) {
        Optional<Blog> blog = blogRepository.findById(id);
        if (blog.isEmpty()) throw new ResourceNotFoundException("Blog not found with id: " + id);
        blogRepository.delete(blog.get());
    }
}
