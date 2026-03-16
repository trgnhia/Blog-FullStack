package com.blogs_management.filter;

import com.blogs_management.dto.auth.JwtPrincipal;
import com.blogs_management.service.auth.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtService jwtService;

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        // Skip auth endpoints hoàn toàn (login/refresh/logout)
        String path = request.getServletPath();
        return path != null && path.startsWith("/auth/");
    }

    //chạy trước Controller (nằm trong “dây chuyền filter”).
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // Nếu đã có authentication rồi thì không parse lại
        if (SecurityContextHolder.getContext().getAuthentication() != null) {
            filterChain.doFilter(request, response); //chuyền request/response cho filter tiếp theo / hoặc vào controller.
            return;
        }

        String header = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (header == null || !header.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = header.substring(7).trim(); //Bearer dài 7 ký tự. Cắt ra phần token. ==> token empty thì skip
        if (token.isEmpty()) {
            filterChain.doFilter(request, response);
            return;
        }
        try {
            JwtPrincipal principal = jwtService.validateAndParseAccessToken(token);
            String role = principal.getRole();
            // Convert "ADMIN" -> "ROLE_ADMIN" theo convention của Spring Security
            String authority = role.startsWith("ROLE_") ? role : "ROLE_" + role;
            //authorities ở đây = danh sách quyền của user
            var authorities = List.of(new SimpleGrantedAuthority(authority)); //SimpleGrantedAuthority là object Spring dùng để biểu diễn “quyền"

            // tạo object Authentication
            var authentication = new UsernamePasswordAuthenticationToken(principal.getSubject(),
                    null, //không đăng nhập bằng password ở đây =< credential = null
                             authorities //check quyen
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } catch (RuntimeException e) {
            SecurityContextHolder.clearContext();
        }
        filterChain.doFilter(request, response);
    }
}
