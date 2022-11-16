package com.networking.busservice.service;


import com.networking.busservice.dto.BusRequest;
import com.networking.busservice.dto.GetBus;
import com.networking.busservice.model.Bus;
import com.networking.busservice.model.Seat;
import com.networking.busservice.repository.BusRepository;
import com.networking.busservice.repository.SeatRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class BusService {
    private final BusRepository busRepository;
    private final SeatRepository seatRepository;

    public List<Bus> getAllBus(){
        return busRepository.findAll();
    }
    public Bus addBus(Bus bus){
        busRepository.save(bus);
        return bus;
    }
    public List<Seat> getAllSeats(){

        return seatRepository.findAll();
    }
    public void deleteBus(Long id){
        busRepository.deleteById(id);
    }
    public List<GetBus> getAllBusesDto(){
        return busToBusDto(busRepository.findAll());
    }

    public Bus updateBus(Long id, Bus bus){
        Bus bus1 = busRepository.findById(id).orElseThrow();
        bus1.setBusNumber(bus.getBusNumber());
        bus1.setSeatCapacity(bus.getSeatCapacity());
        busRepository.save(bus1);
        return bus1;
    }

    private List<GetBus> busToBusDto(List<Bus> buses){
        return buses.stream().map(b -> {
            GetBus busDto = new GetBus();
            busDto.setId(b.getId());
            busDto.setBusNumber(b.getBusNumber());

            return busDto;
        }).collect(Collectors.toList());
    }
}

