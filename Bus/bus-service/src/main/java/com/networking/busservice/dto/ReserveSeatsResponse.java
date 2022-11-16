package com.networking.busservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReserveSeatsResponse {
    private String busNumber;
    private List<Integer> seatNumbers;
}
