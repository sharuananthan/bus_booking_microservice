package com.networking.bookingservice.service;

import com.networking.bookingservice.dto.BookingRequestDto;
import com.networking.bookingservice.dto.BookingResponseDto;
import com.networking.bookingservice.dto.ReserveSeatsDto;
import com.networking.bookingservice.dto.ReserveSeatsResponse;
import com.networking.bookingservice.model.Booking;
import com.networking.bookingservice.repository.BookingRepository;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
public class BookingService {
   private final BookingRepository bookingRepository;
   private final WebClient.Builder webClientBuilder;
    public List<Booking> getAllBookings(){
        return bookingRepository.findAll();
    }
  public BookingResponseDto addBooking(BookingRequestDto dto){
        Booking booking = new Booking();
        BookingResponseDto bookingResponseDto = new BookingResponseDto();
        booking.setBookingTime(new Date());
        booking.setCustomerId(dto.getCustomerId());
        bookingRepository.save(booking);
//
          System.out.println(booking);

      ReserveSeatsDto reserveSeatsDto = new ReserveSeatsDto();
      reserveSeatsDto.setBookingId(booking.getId());
      reserveSeatsDto.setSeatIds(dto.getSeats());
      ReserveSeatsResponse reserveSeatsResponse = webClientBuilder.build().post()
              .uri("http://bus-service/api/seat/reserve")
                .bodyValue(reserveSeatsDto)
              .retrieve()
              .bodyToMono(ReserveSeatsResponse.class)
              .block();

        bookingResponseDto.setBookingTime(booking.getBookingTime().toString());
        bookingResponseDto.setSeats(reserveSeatsResponse.getSeatNumbers());
        bookingResponseDto.setBusNumber(reserveSeatsResponse.getBusNumber());
        String customerName = webClientBuilder.build().get()
                .uri("http://customer-service/api/customer/customerNameById/"+dto.getCustomerId())
                .retrieve()
                .bodyToMono(String.class)
                .block();
        bookingResponseDto.setCustomerName(customerName);
        bookingResponseDto.setId(booking.getId());
        System.out.println(booking);
        return bookingResponseDto;
    }
}
