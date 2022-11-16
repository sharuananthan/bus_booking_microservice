package com.networking.busservice.controller;

import com.networking.busservice.dto.ReserveSeatsDto;
import com.networking.busservice.dto.ReserveSeatsResponse;
import com.networking.busservice.dto.SeatDto;
import com.networking.busservice.model.Seat;
import com.networking.busservice.service.BusService;
import com.networking.busservice.service.SeatService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/seat")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class SeatController {
    private final BusService busService;
    private final SeatService seatService;

    @GetMapping
    ResponseEntity<List<Seat>> getAllSeats(){
        return ResponseEntity.ok(busService.getAllSeats());
    }
    @GetMapping("/schedule/{id}")
    ResponseEntity<List<SeatDto>> getAvailableSeatsForSchedule(@PathVariable Long id){
        return ResponseEntity.ok(seatService.getAvailableSeatsForSchedule(id));
    }
    @PostMapping("/reserve")
    ResponseEntity<ReserveSeatsResponse> reserveSeats(@RequestBody ReserveSeatsDto reserveSeatsDto){
        return ResponseEntity.ok(seatService.reserveSeatsForBooking(reserveSeatsDto));
    }

}
