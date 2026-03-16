package com.blogs_management;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class Bcrypt {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String raw = "admin1@yourapp.com";
        System.out.println(encoder.encode(raw));
    }
}



