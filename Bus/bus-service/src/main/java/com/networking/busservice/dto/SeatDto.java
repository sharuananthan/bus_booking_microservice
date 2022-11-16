package com.networking.busservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SeatDto {
    private Long id;
    private Integer seatNumber;
    private Boolean isAvailable;
}
