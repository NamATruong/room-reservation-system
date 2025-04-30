import React, { useContext, useState } from 'react';
import { ReservationContext } from '../context/ReservationContext';
import Navigation from '../components/Navigation';

function RoomSetupSelection({ nextStep, prevStep, currentStep }) {
  const { reservation, updateReservation } = useContext(ReservationContext);
  const [selectedRoom, setSelectedRoom] = useState(reservation.room || '');
  const [selectedSetup, setSelectedSetup] = useState(reservation.setup || '');
  
  const rooms = ['Room A', 'Room B', 'Room C', 'Room D', 'Room E'];
  const setups = ['Round Table', 'Classroom', 'Theater', 'U-Shape', 'Boardroom'];
  
  const handleNext = () => {
    if (selectedRoom && selectedSetup) {
      updateReservation({ room: selectedRoom, setup: selectedSetup });
      nextStep();
    } else {
      alert("Please select both room and setup");
    }
  };
  
  return (
    <div className="form-container">
      <h2>Select Room and Setup</h2>
      
      <div className="room-selection">
        <h3>Available Rooms</h3>
        <div className="room-grid">
          {rooms.map(room => (
            <button
              key={room}
              className={`room-option ${selectedRoom === room ? 'selected' : ''}`}
              onClick={() => setSelectedRoom(room)}
            >
              {room}
            </button>
          ))}
        </div>
      </div>
      
      <div className="setup-selection">
        <h3>Room Setup Options</h3>
        <div className="setup-grid">
          {setups.map(setup => (
            <button
              key={setup}
              className={`setup-option ${selectedSetup === setup ? 'selected' : ''}`}
              onClick={() => setSelectedSetup(setup)}
            >
              {setup}
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

export default RoomSetupSelection;