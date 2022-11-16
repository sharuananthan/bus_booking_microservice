package com.networking.busservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Bus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;
    private String busNumber;
    private String busType;
    private String busName;
    private String busOperator;
    private Integer seatCapacity;

//    @OneToMany(fetch = LAZY)
//    private List<Booking> bookings;
}