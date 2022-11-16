package com.networking.bookingservice.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import static javax.persistence.FetchType.LAZY;
import static javax.persistence.GenerationType.IDENTITY;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
public class Booking {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;
    private Date bookingTime;
    private Long customerId;

}
