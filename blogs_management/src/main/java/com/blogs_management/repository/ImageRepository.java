package com.blogs_management.repository;

import com.blogs_management.model.Image;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ImageRepository extends JpaRepository<Image, Long> {
    List<Image> findAll();
    Page<Image> findAll(Pageable pageable);
}
