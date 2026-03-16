package com.blogs_management.service.upload;
import com.blogs_management.dto.blogs.BlogResponseDTO;
import com.blogs_management.dto.images.ImagePageResponseDTO;
import com.blogs_management.dto.images.ImageResponseDTO;
import com.blogs_management.mapper.ImageMapper;
import com.blogs_management.model.Blog;
import com.blogs_management.model.Image;
import com.blogs_management.repository.ImageRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ImageServiceImpl implements ImageService {
    private final ImageRepository imageRepository;
    private final ImageMapper imageMapper;
    // ĐƯỜNG DẪN ABSOLUTE CHÍNH XÁC
    private static final Path UPLOAD_DIR = Paths.get(
            "D:/java/SpringPrj/blogs_management/uploads/blogImages"
    ).toAbsolutePath().normalize();

    @Override
    @Transactional
    public ImageResponseDTO fileUpload(MultipartFile file) {
        Image newImage = new Image();
        try {
            // 1. Tạo thư mục nếu chưa tồn tại
            if (Files.notExists(UPLOAD_DIR)) {
                Files.createDirectories(UPLOAD_DIR);
            }

            // 2. Tách extension an toàn
            String originalName = file.getOriginalFilename();
            String ext = "";
            if (originalName != null && originalName.contains(".")) {
                ext = originalName.substring(originalName.lastIndexOf("."));
            }

            // 3. Tạo tên file random
            String fileName = UUID.randomUUID() + ext;

            // 4. Tạo path đích
            Path destination = UPLOAD_DIR.resolve(fileName);

            // 5. Ghi file vào ổ đĩa
            file.transferTo(destination.toFile());

            // 6. Trả về URL FE sẽ dùng
            String path = "/uploads/blogImages/" + fileName;
            newImage.setFileName(originalName);
            newImage.setPath(path);
            imageRepository.save(newImage);
            return imageMapper.toImageResponseDTO(newImage);
        } catch (IOException e) {
            throw new RuntimeException("Upload failed: " + e.getMessage(), e);
        }
    }

    @Override
    @Transactional
    public List<ImageResponseDTO> getAllImageFiles() {
        List<Image> images = imageRepository.findAll();
        return images.stream()
                .map(imageMapper::toImageResponseDTO)
                .collect(Collectors.toList());
    }

    /*
     * ====================== IMAGE PAGINATION LOGIC ======================
     *
     * Mục tiêu:
     * - Tránh load toàn bộ ảnh (gây lag FE khi mở modal)
     * - Chỉ lấy N ảnh mỗi lần (mặc định 10 ảnh)
     * - Phục vụ infinite scroll phía frontend
     *
     * Ý tưởng:
     * - Frontend gửi page & size (ví dụ: page=0, size=10)
     * - Backend dùng Spring Data JPA Pageable để query theo LIMIT / OFFSET
     *
     * Các bước xử lý:
     * 1. Guard input:
     *    - page < 0  -> ép về 0 (Spring page index là 0-based)
     *    - size <= 0 -> dùng mặc định 10
     *    - size quá lớn -> giới hạn tối đa (tránh overload DB)
     *
     * 2. Tạo Pageable:
     *    - PageRequest.of(page, size)
     *    - page = số trang (0 = trang đầu)
     *    - size = số ảnh mỗi trang
     *
     * 3. Query DB:
     *    - imageRepository.findAll(pageable)
     *    - Spring tự sinh query dạng LIMIT / OFFSET
     *
     * 4. Lấy dữ liệu cần dùng:
     *    - pageResult.getContent() -> List<Image> của trang hiện tại
     *
     * 5. Map Entity -> DTO:
     *    - Trả về List<ImageResponseDTO cho frontend
     *
     * Ghi chú:
     * - Có thể thêm Sort (id/createdAt desc) để paging ổn định hơn
     * - Có thể mở rộng trả thêm hasNext/page metadata cho infinite scroll chuẩn
     * ===================================================================
     */

    @Override
    public ImagePageResponseDTO getImageFiles(int page, int size) {
        int safePage = Math.max(page, 0);
        int safeSize = size <= 10 ? 10 : size;
        int maxSize = 50;
        if (safeSize > maxSize) {
            safeSize = maxSize;
        }
        Pageable pageable = PageRequest.of(safePage, safeSize);
        // Pageable pageable = PageRequest.of(safePage, safeSize, Sort.by("id").descending());
        Page<Image> pageResult = imageRepository.findAll(pageable);
        List<ImageResponseDTO> imageDtoList = pageResult.getContent().stream()
                .map(imageMapper::toImageResponseDTO)
                .collect(Collectors.toList());
        ImagePageResponseDTO imagePageResponseDTO = new ImagePageResponseDTO();
        imagePageResponseDTO.setItems(imageDtoList);
        imagePageResponseDTO.setHasNext(pageResult.hasNext());
        return imagePageResponseDTO;
    }
}
