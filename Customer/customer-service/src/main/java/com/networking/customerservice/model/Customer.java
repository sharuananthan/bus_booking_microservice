package com.networking.customerservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

import java.util.List;

import static javax.persistence.FetchType.LAZY;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "Customer name is mandatory")
    private String name;
    @NotBlank(message = "Customer mobile number is mandatory")
    private String mobileNumber;
    @NotBlank(message = "Password is mandatory")
    private String password;
//    @OneToMany(fetch = LAZY)
//    private List<Booking> bookings;
}
