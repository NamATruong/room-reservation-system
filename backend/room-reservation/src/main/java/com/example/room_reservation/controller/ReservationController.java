package com.example.room_reservation.controller;

import com.example.room_reservation.model.Reservation;
import com.example.room_reservation.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@CrossOrigin(origins = "http://localhost:3000")
public class ReservationController {
    
    @Autowired
    private ReservationService service;
    
    @PostMapping
    public ResponseEntity<Reservation> createReservation(@RequestBody Reservation reservation) {
        return new ResponseEntity<>(service.saveReservation(reservation), HttpStatus.CREATED);
    }
    
    @GetMapping("/availability")
    public ResponseEntity<List<Reservation>> checkAvailability(
            @RequestParam LocalDate date, 
            @RequestParam String room) {
        return ResponseEntity.ok(service.getReservationsByDateAndRoom(date, room));
    }
}