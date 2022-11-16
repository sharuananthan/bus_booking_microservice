package com.networking.busservice.controller;


import com.networking.busservice.dto.AdminLoginRequestDto;
import com.networking.busservice.service.AdminService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/admin")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class AdminController {

    private final AdminService adminService;
    //    @PostMapping("/login")
    @PostMapping
    public ResponseEntity<String> setCookie(HttpServletResponse response, @RequestBody AdminLoginRequestDto adminLoginRequestDto) {
        if(adminService.isAdmin(adminLoginRequestDto)) {
            Cookie cookie = new Cookie("admin", "true");
            Cookie cookie1 = new Cookie("isAuthenticated", "true");
            response.addCookie(cookie);
            response.addCookie(cookie1);
            return ResponseEntity.status(200).body("Login Successful");
        }
        return ResponseEntity.status(401).body("Login Failed");
    }
}