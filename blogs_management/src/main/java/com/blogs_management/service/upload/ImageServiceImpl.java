package com.blogs_management.service.upload;

import com.blogs_management.dto.images.ImagePageResponseDTO;
import com.blogs_management.dto.images.ImageResponseDTO;
import com.blogs_management.mapper.ImageMapper;
import com.blogs_management.model.Image;
import com.blogs_management.repository.ImageRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ImageServiceImpl implements ImageService {

    private final ImageRepository imageRepository;
    private final ImageMapper imageMapper;

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${app.supabase.url}")
    private String supabaseUrl;

    @Value("${app.supabase.service-key}")
    private String supabaseServiceKey;

    @Value("${app.supabase.bucket}")
    private String bucket;

    @Override
    @Transactional
    public ImageResponseDTO fileUpload(MultipartFile file) {
        try {
            String originalName = file.getOriginalFilename();
            String ext = getExtension(originalName);
            String fileName = UUID.randomUUID() + ext;

            String storagePath = bucket + "/" + fileName;
            uploadToSupabase(file, fileName);

            Image newImage = new Image();
            newImage.setFileName(originalName);
            newImage.setPath(storagePath);

            imageRepository.save(newImage);
            return imageMapper.toImageResponseDTO(newImage);

        } catch (IOException e) {
            throw new RuntimeException("Upload failed: " + e.getMessage(), e);
        }
    }

    private void uploadToSupabase(MultipartFile file, String fileName) throws IOException {
        String uploadUrl = supabaseUrl + "/storage/v1/object/" + bucket + "/" + fileName;

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(supabaseServiceKey);
        headers.setContentType(MediaType.parseMediaType(
                file.getContentType() != null ? file.getContentType() : "application/octet-stream"
        ));
        headers.set("x-upsert", "false");

        HttpEntity<byte[]> requestEntity = new HttpEntity<>(file.getBytes(), headers);

        ResponseEntity<String> response = restTemplate.exchange(
                uploadUrl,
                HttpMethod.POST,
                requestEntity,
                String.class
        );

        if (!response.getStatusCode().is2xxSuccessful()) {
            throw new RuntimeException("Supabase upload failed: " + response.getBody());
        }
    }

    private String getExtension(String originalName) {
        if (originalName == null || !originalName.contains(".")) {
            return "";
        }
        return originalName.substring(originalName.lastIndexOf("."));
    }

    @Override
    @Transactional
    public List<ImageResponseDTO> getAllImageFiles() {
        List<Image> images = imageRepository.findAll();
        return images.stream()
                .map(imageMapper::toImageResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ImagePageResponseDTO getImageFiles(int page, int size) {
        int safePage = Math.max(page, 0);
        int safeSize = Math.max(size, 10);
        int maxSize = 50;
        if (safeSize > maxSize) {
            safeSize = maxSize;
        }

        Pageable pageable = PageRequest.of(safePage, safeSize);
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