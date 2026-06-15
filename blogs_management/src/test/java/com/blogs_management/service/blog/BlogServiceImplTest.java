package com.blogs_management.service.blog;

import com.blogs_management.constant.AppConstants;
import com.blogs_management.dto.blogs.BlogRequestDTO;
import com.blogs_management.dto.blogs.BlogResponseDTO;
import com.blogs_management.entity.Blog;
import com.blogs_management.exception.ResourceNotFoundException;
import com.blogs_management.mapper.BlogMapper;
import com.blogs_management.repository.BlogRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.MessageSource;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.nullable;
import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class BlogServiceImplTest {

    @Mock
    private BlogRepository blogRepository;

    @Mock
    private BlogMapper blogMapper;

    @Mock
    private MessageSource messageSource;

    @InjectMocks
    private BlogServiceImpl blogService;

    @BeforeEach
    void setUp() {
        lenient().when(messageSource.getMessage(anyString(), nullable(Object[].class), any(Locale.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));
    }

    @Test
    void getAllBlogs_ShouldReturnMappedBlogs() {
        Blog firstBlog = blog(1L, "first-blog");
        Blog secondBlog = blog(2L, "second-blog");
        BlogResponseDTO firstResponse = blogResponse(1L, "first-blog");
        BlogResponseDTO secondResponse = blogResponse(2L, "second-blog");

        when(blogRepository.findAll()).thenReturn(List.of(firstBlog, secondBlog));
        when(blogMapper.toBlogResponseDTO(firstBlog)).thenReturn(firstResponse);
        when(blogMapper.toBlogResponseDTO(secondBlog)).thenReturn(secondResponse);

        List<BlogResponseDTO> result = blogService.getAllBlogs();

        assertThat(result).containsExactly(firstResponse, secondResponse);
        verify(blogRepository).findAll();
        verify(blogMapper).toBlogResponseDTO(firstBlog);
        verify(blogMapper).toBlogResponseDTO(secondBlog);
    }

    @Test
    void getPublishedBlog_WhenPublishedIsNull_ShouldFindAllBlogs() {
        Blog blog = blog(1L, "java-blog");
        BlogResponseDTO response = blogResponse(1L, "java-blog");

        when(blogRepository.findAll()).thenReturn(List.of(blog));
        when(blogMapper.toBlogResponseDTO(blog)).thenReturn(response);

        List<BlogResponseDTO> result = blogService.getPublishedBlog(null);

        assertThat(result).containsExactly(response);
        verify(blogRepository).findAll();
        verify(blogRepository, never()).findByPublish(any());
    }

    @Test
    void getPublishedBlog_WhenPublishedIsProvided_ShouldFindByPublishedStatus() {
        Blog blog = blog(1L, "published-blog");
        BlogResponseDTO response = blogResponse(1L, "published-blog");

        when(blogRepository.findByPublish(true)).thenReturn(List.of(blog));
        when(blogMapper.toBlogResponseDTO(blog)).thenReturn(response);

        List<BlogResponseDTO> result = blogService.getPublishedBlog(true);

        assertThat(result).containsExactly(response);
        verify(blogRepository).findByPublish(true);
        verify(blogRepository, never()).findAll();
    }

    @Test
    void getBlogsByCategoryAndPublished_ShouldFindPublishedBlogsByCategory() {
        Blog blog = blog(1L, "spring-blog");
        BlogResponseDTO response = blogResponse(1L, "spring-blog");

        when(blogRepository.findByCategoryAndPublish("spring", true)).thenReturn(List.of(blog));
        when(blogMapper.toBlogResponseDTO(blog)).thenReturn(response);

        List<BlogResponseDTO> result = blogService.getBlogsByCategoryAndPublished("spring");

        assertThat(result).containsExactly(response);
        verify(blogRepository).findByCategoryAndPublish("spring", true);
    }

    @Test
    void getBlogWithSlug_WhenBlogExists_ShouldReturnMappedBlog() {
        Blog blog = blog(1L, "existing-blog");
        BlogResponseDTO response = blogResponse(1L, "existing-blog");

        when(blogRepository.findBySlug("existing-blog")).thenReturn(blog);
        when(blogMapper.toBlogResponseDTO(blog)).thenReturn(response);

        BlogResponseDTO result = blogService.getBlogWithSlug("existing-blog");

        assertThat(result).isSameAs(response);
        verify(blogRepository).findBySlug("existing-blog");
        verify(blogMapper).toBlogResponseDTO(blog);
    }

    @Test
    void getBlogWithSlug_WhenBlogDoesNotExist_ShouldThrowResourceNotFoundException() {
        when(blogRepository.findBySlug("missing-blog")).thenReturn(null);

        assertThatThrownBy(() -> blogService.getBlogWithSlug("missing-blog"))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage(AppConstants.MESSAGE_KEY_BLOG_NOT_FOUND_SLUG);

        verify(blogRepository).findBySlug("missing-blog");
        verify(blogMapper, never()).toBlogResponseDTO(any(Blog.class));
    }

    @Test
    void createBlog_ShouldSaveMappedEntityAndReturnMappedResponse() {
        BlogRequestDTO request = blogRequest();
        Blog blog = blog(null, request.getSlug());
        BlogResponseDTO response = blogResponse(1L, request.getSlug());

        when(blogMapper.toEntity(request)).thenReturn(blog);
        when(blogRepository.save(blog)).thenReturn(blog);
        when(blogMapper.toBlogResponseDTO(blog)).thenReturn(response);

        BlogResponseDTO result = blogService.createBlog(request);

        assertThat(result).isSameAs(response);
        verify(blogMapper).toEntity(request);
        verify(blogRepository).save(blog);
        verify(blogMapper).toBlogResponseDTO(blog);
    }

    @Test
    void updateBlog_WhenBlogExists_ShouldUpdateSaveAndReturnMappedResponse() {
        BlogRequestDTO request = blogRequest();
        Blog existingBlog = blog(1L, "old-slug");
        Blog updatedBlog = blog(1L, request.getSlug());
        BlogResponseDTO response = blogResponse(1L, request.getSlug());

        when(blogRepository.findById(1L)).thenReturn(Optional.of(existingBlog));
        when(blogMapper.updateBlog(request, existingBlog)).thenReturn(existingBlog);
        when(blogRepository.save(existingBlog)).thenReturn(updatedBlog);
        when(blogMapper.toBlogResponseDTO(updatedBlog)).thenReturn(response);

        BlogResponseDTO result = blogService.updateBlog(request, 1L);

        assertThat(result).isSameAs(response);
        verify(blogRepository).findById(1L);
        verify(blogMapper).updateBlog(request, existingBlog);
        verify(blogRepository).save(existingBlog);
        verify(blogMapper).toBlogResponseDTO(updatedBlog);
    }

    @Test
    void updateBlog_WhenBlogDoesNotExist_ShouldThrowResourceNotFoundException() {
        BlogRequestDTO request = blogRequest();
        when(blogRepository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> blogService.updateBlog(request, 99L))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage(AppConstants.MESSAGE_KEY_BLOG_NOT_FOUND_ID);

        verify(blogRepository).findById(99L);
        verify(blogMapper, never()).updateBlog(any(BlogRequestDTO.class), any(Blog.class));
        verify(blogRepository, never()).save(any(Blog.class));
    }

    @Test
    void deleteBlog_WhenBlogExists_ShouldDeleteBlog() {
        Blog blog = blog(1L, "delete-blog");
        when(blogRepository.findById(1L)).thenReturn(Optional.of(blog));

        blogService.deleteBlog(1L);

        verify(blogRepository).findById(1L);
        verify(blogRepository).delete(blog);
    }

    @Test
    void deleteBlog_WhenBlogDoesNotExist_ShouldThrowResourceNotFoundException() {
        when(blogRepository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> blogService.deleteBlog(99L))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage(AppConstants.MESSAGE_KEY_BLOG_NOT_FOUND_ID);

        verify(blogRepository).findById(99L);
        verify(blogRepository, never()).delete(any(Blog.class));
    }

    private Blog blog(Long id, String slug) {
        Blog blog = new Blog();
        blog.setId(id);
        blog.setTitle("Blog title");
        blog.setSlug(slug);
        blog.setAuthor("Admin");
        blog.setCategory("spring");
        blog.setCoverImageId(10L);
        blog.setCoverImage("covers/blog.png");
        blog.setExcerpt("Short excerpt");
        blog.setContent("Blog content");
        blog.setTags("java,spring");
        blog.setPublish(true);
        blog.setCreatedAt(OffsetDateTime.now());
        return blog;
    }

    private BlogRequestDTO blogRequest() {
        return new BlogRequestDTO(
                "New blog",
                "new-blog",
                "covers/new-blog.png",
                10L,
                "Admin",
                "New excerpt",
                "New content",
                "java,spring",
                true,
                "spring"
        );
    }

    private BlogResponseDTO blogResponse(Long id, String slug) {
        return new BlogResponseDTO(
                id,
                OffsetDateTime.now(),
                "Blog title",
                10L,
                "Short excerpt",
                "java,spring",
                "covers/blog.png",
                "http://localhost:8081/covers/blog.png",
                slug,
                "Admin",
                "Blog content",
                true,
                "spring"
        );
    }
}
