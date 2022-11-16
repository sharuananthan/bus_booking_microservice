package com.networking.customerservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerAuthResponse {
    private Long customerId;
    private String customerName;
    private Boolean isAuthenticated;
    private String message;
}
