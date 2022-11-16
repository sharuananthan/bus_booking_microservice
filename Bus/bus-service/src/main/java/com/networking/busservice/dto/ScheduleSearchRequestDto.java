package com.networking.busservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ScheduleSearchRequestDto {
    private String startLocation;
    private String destination;
    private String date;
}
