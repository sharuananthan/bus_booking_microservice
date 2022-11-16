package com.networking.busservice.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;

import static javax.persistence.FetchType.EAGER;
import static javax.persistence.FetchType.LAZY;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class BusSchedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String startLocation;
    private String destination;
    @NotBlank(message = "Start Date is required")
    private Date departureTime;
    @NotBlank(message = "Arrival time is mandatory")
    private Date arrivalTime;
    @NotBlank(message = "ticket price mandatory")
    private Double ticketPrice;
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "bus_id", referencedColumnName = "id")
    private Bus bus;

//    @OneToMany(fetch = LAZY)
//    private List<Booking> bookings;
}