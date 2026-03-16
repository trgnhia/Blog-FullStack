package com.blogs_management.model;


import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.OffsetDateTime;

@Entity
@Data
@Table(name = "images")
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name="file_name", columnDefinition="TEXT")
    private String fileName;
    @Column(columnDefinition="TEXT")
    private String path;
    @Column (name="created_at")
    @CreationTimestamp
    private OffsetDateTime createdAt;
}
