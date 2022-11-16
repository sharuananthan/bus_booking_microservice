package com.networking.busservice.service;

import com.networking.busservice.dto.ReserveSeatsDto;
import com.networking.busservice.dto.ReserveSeatsResponse;
import com.networking.busservice.dto.SeatDto;
import com.networking.busservice.model.Bus;
import com.networking.busservice.model.BusSchedule;
import com.networking.busservice.model.Seat;
import com.networking.busservice.repository.BusScheduleRepository;
import com.networking.busservice.repository.SeatRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class SeatService {
    private final SeatRepository seatRepository;
    private final BusScheduleRepository busScheduleRepository;

    public List<SeatDto> getAvailableSeatsForSchedule(Long id){

    return mapToSeatsDto(seatRepository.findAllByBusScheduleId(id));
       // return null;
    }

    private List<SeatDto> mapToSeatsDto(List<Seat> seats){
        return seats.stream().map(s -> {
            SeatDto seatDto = new SeatDto();
            seatDto.setId(s.getId());
            seatDto.setSeatNumber(s.getSeatNumber());
            seatDto.setIsAvailable(s.getBookingId() == null);
            return seatDto;
        }).collect(Collectors.toList());
    }
    public ReserveSeatsResponse reserveSeatsForBooking(ReserveSeatsDto reserveSeatsDto){
        ReserveSeatsResponse reserveSeatsResponse = new ReserveSeatsResponse();
        List<Integer> seatNumbers= new ArrayList<>();
        reserveSeatsDto.getSeatIds().stream().map(s -> seatRepository.findById(s).orElse(null)).forEach(seat -> {
            seat.setBookingId(reserveSeatsDto.getBookingId());
            seatNumbers.add(seat.getSeatNumber());
            seatRepository.save(seat);
        });
         reserveSeatsResponse.setSeatNumbers(seatNumbers);
        Seat seat =  seatRepository.findById(reserveSeatsDto.getSeatIds().get(0)).orElse(null);
        BusSchedule busSchedule = busScheduleRepository.findById(seat.getBusSchedule().getId()).orElse(null);
        Bus bus = busSchedule.getBus();
        System.out.println(bus.getBusNumber());
        reserveSeatsResponse.setBusNumber(bus.getBusNumber());
        return reserveSeatsResponse;
    }
}
