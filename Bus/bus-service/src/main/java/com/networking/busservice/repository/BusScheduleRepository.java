package com.networking.busservice.repository;

import com.networking.busservice.model.BusSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

public interface BusScheduleRepository extends JpaRepository<BusSchedule, Long> {

    List<BusSchedule> findAllByBusId(Long id);
    List<BusSchedule> findAllByOrderByDepartureTimeDesc();
    @Query("select b from BusSchedule b where b.startLocation = ?1 and b.destination = ?2 and b.departureTime > ?3")
    List<BusSchedule> findAllByStartLocationAndDestinationAndDepartureTime(String startLocation, String destination, Date departureTime);

}

