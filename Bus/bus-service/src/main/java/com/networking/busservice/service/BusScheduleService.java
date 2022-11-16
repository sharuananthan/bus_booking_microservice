package com.networking.busservice.service;

import com.networking.busservice.dto.BusScheduleDto;
import com.networking.busservice.dto.BusScheduleRequest;
import com.networking.busservice.dto.ScheduleSearchRequestDto;
import com.networking.busservice.model.Bus;
import com.networking.busservice.model.BusSchedule;
import com.networking.busservice.model.Seat;

import com.networking.busservice.repository.BusRepository;
import com.networking.busservice.repository.SeatRepository;
import com.networking.busservice.repository.BusScheduleRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class BusScheduleService {
    private final BusScheduleRepository busScheduleRepository;
    private final DateConverterService dateConverterService;
    private final SeatRepository seatRepository;
    private final BusRepository busRepository;

    public List<BusScheduleDto> getAllBusSchedules(){

        return busScheduleToBusScheduleDto(
                busScheduleRepository.findAllByOrderByDepartureTimeDesc().stream().filter(s->s.getArrivalTime().after(new Date())
                ).collect(Collectors.toList()));
    }
    public BusSchedule addBusSchedule(BusScheduleRequest busScheduleRequestDto) throws ParseException {
        BusSchedule busSchedule = new BusSchedule();
        Optional<Bus> bus = busRepository.findById(busScheduleRequestDto.getBusId());
        busSchedule.setBus(bus.get());
        busSchedule.setStartLocation(busScheduleRequestDto.getStartLocation());
        busSchedule.setDestination(busScheduleRequestDto.getDestination());
        busSchedule.setDepartureTime(dateConverterService.convertFromStringToDate(busScheduleRequestDto.getDepartureTime()));
        busSchedule.setArrivalTime(dateConverterService.convertFromStringToDate(busScheduleRequestDto.getArrivalTime()));
        busSchedule.setTicketPrice(busScheduleRequestDto.getTicketPrice());
        busScheduleRepository.save(busSchedule);

        //Create Seats
        int seatCount = bus.get().getSeatCapacity();

        for (int i = 0; i < seatCount; i++) {
            Seat seat = new Seat();
            seat.setSeatNumber(i+1);
            seat.setBusSchedule(busSchedule);

            seatRepository.save(seat);
        }
        return busSchedule;
    }
    public List<BusScheduleDto> getBusScheduleByBusId(Long id){
        return busScheduleToBusScheduleDto(busScheduleRepository.findAllByBusId(id));
    }

    private List<BusScheduleDto> busScheduleToBusScheduleDto(List<BusSchedule> busSchedules){
        return busSchedules.stream().map(b -> {
            BusScheduleDto busScheduleDto = new BusScheduleDto();
            busScheduleDto.setId(b.getId());
            busScheduleDto.setStartLocation(b.getStartLocation());
            busScheduleDto.setDestination(b.getDestination());
            busScheduleDto.setDepartureTime(dateConverterService.convertFromDateToStringWithTime(b.getDepartureTime()));
            busScheduleDto.setArrivalTime(dateConverterService.convertFromDateToStringWithTime(b.getArrivalTime()));
            busScheduleDto.setTicketPrice(b.getTicketPrice());
            return busScheduleDto;
        }).collect(Collectors.toList());
    }

    public List<BusScheduleDto> searchBusSchedule(ScheduleSearchRequestDto scheduleSearchRequestDto) throws ParseException {
        Date date = dateConverterService.convertFromStringToDate(scheduleSearchRequestDto.getDate());
        System.out.println(date);
        List<BusSchedule> busSchedules =
                busScheduleRepository.findAllByStartLocationAndDestinationAndDepartureTime(
                        scheduleSearchRequestDto.getStartLocation(),
                        scheduleSearchRequestDto.getDestination(),
                        new Date()).stream().filter(b -> dateConverterService.convertFromDateToString(b.getDepartureTime()).equals(dateConverterService.convertFromDateToString(date))).collect(Collectors.toList());
        return busScheduleToBusScheduleDto(busSchedules);

    }
    public void deleteBusSchedule(Long id){
        busScheduleRepository.deleteById(id);
    }
}