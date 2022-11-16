package com.networking.busservice.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BusRequest {

    private String busNumber;
    private String busType;
    private String busName;
    private String busOperator;
    private Integer seatCapacity;

}
