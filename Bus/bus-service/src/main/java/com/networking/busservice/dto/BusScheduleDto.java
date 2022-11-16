package com.networking.busservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BusScheduleDto {
    private Long id;
    private String startLocation;
    private String destination;
    private String departureTime;
    private String arrivalTime;
    private Double ticketPrice;
}
