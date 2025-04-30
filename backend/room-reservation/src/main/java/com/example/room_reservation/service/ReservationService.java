package com.example.room_reservation.service;

import com.example.room_reservation.model.Reservation;
import com.example.room_reservation.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ReservationService {
    
    @Autowired
    private ReservationRepository repository;
    
    public Reservation saveReservation(Reservation reservation) {
        return repository.save(reservation);
    }
    
    public List<Reservation> getReservationsByDateAndRoom(LocalDate date, String room) {
        return repository.findByDateAndRoom(date, room);
    }
}
