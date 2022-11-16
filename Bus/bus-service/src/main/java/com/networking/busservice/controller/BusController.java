package com.networking.busservice.controller;

import com.networking.busservice.dto.BusRequest;
import com.networking.busservice.dto.GetBus;
import com.networking.busservice.model.Bus;
import com.networking.busservice.service.BusService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/api/bus")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")

public class BusController {

    private final BusService busService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Bus> addBus(@RequestBody Bus bus){
        return ResponseEntity.status(HttpStatus.CREATED).body(busService.addBus(bus));
    }


    @GetMapping
    public ResponseEntity<List<Bus>> getAllBus(){
        return ResponseEntity.ok(busService.getAllBus());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Bus> updateBus(@PathVariable Long id, @RequestBody Bus bus){
        return ResponseEntity.ok(busService.updateBus(id, bus));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteBus(@PathVariable Long id){
        busService.deleteBus(id);
        return ResponseEntity.noContent().build();
    }
}
