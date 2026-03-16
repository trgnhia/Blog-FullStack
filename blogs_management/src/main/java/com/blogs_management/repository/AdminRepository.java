package com.blogs_management.repository;

import com.blogs_management.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface AdminRepository extends JpaRepository<Admin,UUID> {
    Optional<Admin> findByEmail(String email);;// dung de Login bằng email
}
