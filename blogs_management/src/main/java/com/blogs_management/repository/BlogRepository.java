package com.blogs_management.repository;

import com.blogs_management.model.Blog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BlogRepository extends JpaRepository<Blog,Long> {
    List<Blog> findAll();
    List<Blog> findByPublish(Boolean publish);
    Blog findBySlug(String slug);
    List<Blog> findByCategoryAndPublish(String category, Boolean publish);
    Optional<Blog> findById(Long id);
}
