package com.blogs_management.config;

import com.blogs_management.filter.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                //addFilterBefore = thứ tự filter
                .cors(cors -> {})
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .csrf(csrf -> csrf.disable())
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                // Tắt default login form/basic
                .httpBasic(basic -> basic.disable())
                .formLogin(form -> form.disable())
                //authorizeHttpRequests chỉ định luật để AuthorizationFilter dùng
                .authorizeHttpRequests(auth -> auth
                        // ===== AUTH endpoints: permit =====
                        .requestMatchers("/auth/**").permitAll()
                        //  public images/static
                        .requestMatchers(HttpMethod.GET, "/uploads/**").permitAll()
                        // ===== Public blog read-only endpoints =====
                        .requestMatchers(HttpMethod.GET, "/api/blogs/published/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/blogs/by-slug/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/blogs/category/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/uploads/**").permitAll()
                        // ===== Còn lại: yêu cầu auth =====
                        .anyRequest().authenticated()
                );

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}