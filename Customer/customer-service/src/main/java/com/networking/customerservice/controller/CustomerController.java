package com.networking.customerservice.controller;



import com.networking.customerservice.dto.CustomerAuthResponse;
import com.networking.customerservice.dto.CustomerDto;
import com.networking.customerservice.dto.CustomerLoginDto;
import com.networking.customerservice.model.Customer;
import com.networking.customerservice.service.CustomerService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping("/api/customer")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class CustomerController {
    private final CustomerService customerService;

    @GetMapping
    public ResponseEntity<List<Customer>> getAllCustomers(){
        return ResponseEntity.ok(customerService.getAllCustomers());
    }
    @PostMapping("/register")
    public ResponseEntity<CustomerDto> addCustomer(@RequestBody Customer customer) throws Exception {
        return ResponseEntity.status(HttpStatus.CREATED).body(customerService.addCustomer(customer));
    }
    @PostMapping("/login")
    public ResponseEntity<CustomerAuthResponse> loginCustomer(@RequestBody CustomerLoginDto dto) {
        CustomerAuthResponse customerAuthResponse = customerService.loginCustomer(dto);
        if(customerAuthResponse.getIsAuthenticated()) {
            return ResponseEntity.status(200).body(customerAuthResponse);
        }
        return ResponseEntity.status(401).body(customerAuthResponse);
    }
    @PostMapping("/logout")
    public ResponseEntity<String> logoutCustomer(HttpServletResponse response) {
        return ResponseEntity.ok("Logout Successful");
    }
    @GetMapping("/customerNameById/{id}")
    public ResponseEntity<String> getCustomerNameById(@PathVariable Long id) {
        return ResponseEntity.ok(customerService.getCustomerName(id));
    }
}
