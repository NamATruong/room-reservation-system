import React, { useContext, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { ReservationContext } from '../context/ReservationContext';
import Navigation from '../components/Navigation';

function DateTimeSelection({ nextStep, prevStep, currentStep }) {
  const { reservation, updateReservation } = useContext(ReservationContext);
  const [selectedDate, setSelectedDate] = useState(reservation.date || new Date());
  const [selectedTime, setSelectedTime] = useState(reservation.time || '');
  
  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];
  
  const handleNext = () => {
    if (selectedDate && selectedTime) {
      updateReservation({ date: selectedDate, time: selectedTime });
      nextStep();
    } else {
      alert("Please select both date and time");
    }
  };
  
  return (
    <div className="form-container">
      <h2>Select Date and Time</h2>
      
      <div className="calendar-container">
        <DatePicker
          selected={selectedDate}
          onChange={date => setSelectedDate(date)}
          inline
          minDate={new Date()}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
        />
      </div>
      
      <div className="time-slots">
        <h3>Available Time Slots for {selectedDate.toDateString()}</h3>
        <div className="time-grid">
          {timeSlots.map(time => (
            <button
              key={time}
              className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
              onClick={() => setSelectedTime(time)}
            >
              {time}
            </button>
          ))}
        </div>
      </div>
      
      <Navigation 
        currentStep={currentStep} 
        totalSteps={4} 
        onNext={handleNext} 
        onPrevious={prevStep}
      />
    </div>
  );
}

export default DateTimeSelection;