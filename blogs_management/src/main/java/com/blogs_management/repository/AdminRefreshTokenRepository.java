package com.blogs_management.repository;

import com.blogs_management.model.AdminRefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface AdminRefreshTokenRepository extends JpaRepository<AdminRefreshToken, UUID> {
    Optional<AdminRefreshToken> findByTokenHash(String tokenHash);// client send raw token => server hash => find in DB
    List<AdminRefreshToken> findAllByAdmin_IdAndRevokedAtIsNull(UUID adminId);
}
