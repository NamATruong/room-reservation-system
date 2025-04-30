import React, { createContext, useState } from 'react';

export const ReservationContext = createContext();

export const ReservationProvider = ({ children }) => {
  const [reservation, setReservation] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    date: null,
    time: '',
    room: '',
    setup: '',
    notes: ''
  });
  
  const updateReservation = (data) => {
    setReservation(prev => ({ ...prev, ...data }));
  };
  
  return (
    <ReservationContext.Provider value={{ reservation, updateReservation }}>
      {children}
    </ReservationContext.Provider>
  );
};