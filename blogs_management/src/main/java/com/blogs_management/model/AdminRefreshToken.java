package com.blogs_management.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.OffsetDateTime;
import java.util.UUID;

@Data
@Entity
@Table(name="admin_refresh_tokens")
public class AdminRefreshToken {
    @Id
    @Column(columnDefinition="uuid", updatable=false, nullable=false)
    private UUID id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="admin_id", nullable=false)
    private Admin admin;
    @Column(name="token_hash")
    private String tokenHash;
    @Column(name="expires_at")
    private OffsetDateTime expiresAt;
    @Column(name="revoked_at")
    private OffsetDateTime revokedAt;
    @Column(name="rotated_at")
    private OffsetDateTime rotatedAt;
    /**
     * Token mới thay thế token cũ nào (trace chain).
     * Self reference: token này có thể trỏ đến token mới.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "replaced_by_token_id")
    private AdminRefreshToken replacedByToken;
    @Column(name="created_at")
    @CreationTimestamp
    private OffsetDateTime createdAt;

    /*
    @Transient - annotation JPA nói với JPA/Hibernate rằng:
     Đây KHÔNG phải field mapping với DB
     KHÔNG tạo column
     KHÔNG đọc/ghi xuống DB
     */

    // check token bi logout hay revoke?
    @Transient
    public boolean isRevoked() {
        return revokedAt != null;
    }
    //Token này đã bị thay thế bởi token mới
    @Transient
    public boolean isRotated() {
        return rotatedAt != null;
    }
    @Transient
    public boolean isExpired(OffsetDateTime now) {
        return expiresAt.isBefore(now);
    }
}
