package com.blogs_management.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.List;

@Configuration
public class CorsConfig {

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        // FE origin (Vite dev)
        config.setAllowedOrigins(List.of(
                "http://localhost:5173"
        ));

        //  Methods FE được phép gọi
        config.setAllowedMethods(List.of(
                "GET",
                "POST",
                "PUT",
                "DELETE",
                "OPTIONS"
        ));

        // Headers FE được phép gửi
        config.setAllowedHeaders(List.of(
                "Authorization",
                "Content-Type"
        ));

        // Cho phép gửi cookie (refresh_token)
        config.setAllowCredentials(true);

        // (optional) nếu FE cần đọc header nào đó
        // config.setExposedHeaders(List.of("Set-Cookie"));

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        // Áp dụng cho toàn bộ API
        source.registerCorsConfiguration("/**", config);

        return source;
    }
}
