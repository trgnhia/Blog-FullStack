package com.blogs_management.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;


import java.sql.Timestamp;
import java.time.OffsetDateTime;
import java.util.UUID;

@Data
@Entity
@Table(name="admins")
public class Admin {
    @Id
    @Column(columnDefinition = "uuid", updatable = false, nullable = false)
    private UUID id;
    private String email;
    @Column(name="password_hash")
    private String passwordHash;
    private String role;
    private String status;
    @Column(name="last_login_at")
    private OffsetDateTime lastLoginAt;
    @Column(name="failed_login_count")
    private int failedLoginCount;
    @Column(name="created_at")
    @CreationTimestamp
    private OffsetDateTime createdAt;
    @Column(name = "updated_at")
    @UpdateTimestamp
    private OffsetDateTime updatedAt;
    @Column(name = "deleted_at")
    @UpdateTimestamp
    private OffsetDateTime deletedAt;

}
