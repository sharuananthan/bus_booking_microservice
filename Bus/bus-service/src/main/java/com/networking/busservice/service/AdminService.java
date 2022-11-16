package com.networking.busservice.service;


import com.networking.busservice.dto.AdminLoginRequestDto;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AdminService {
    public boolean isAdmin(AdminLoginRequestDto dto){
        return dto.getUserName().equals("admin") && dto.getPassword().equals("password");
    }
}
