import React, { useContext, useState } from 'react';
import { ReservationContext } from '../context/ReservationContext';
import Navigation from '../components/Navigation';
import axios from 'axios';

function ConfirmationPage({ prevStep, currentStep }) {
  const { reservation, updateReservation } = useContext(ReservationContext);
  const [notes, setNotes] = useState(reservation.notes || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = async () => {
    updateReservation({ notes });
    setIsSubmitting(true);
    
    try {
      await axios.post('http://localhost:8080/api/reservations', {
        ...reservation,
        notes
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting reservation:', error);
      alert('There was an error submitting your reservation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isSubmitted) {
    return (
      <div className="success-message">
        <h2>Reservation Submitted Successfully!</h2>
        <p>You will be receiving an email in the next 24 hours.</p>
      </div>
    );
  }
  
  return (
    <div className="form-container">
      <h2>Additional Notes and Confirmation</h2>
      
      <div className="reservation-summary">
        <h3>Reservation Summary</h3>
        <p><strong>Name:</strong> {reservation.name}</p>
        <p><strong>Phone:</strong> {reservation.phoneNumber}</p>
        <p><strong>Email:</strong> {reservation.email}</p>
        <p><strong>Date:</strong> {reservation.date?.toDateString()}</p>
        <p><strong>Time:</strong> {reservation.time}</p>
        <p><strong>Room:</strong> {reservation.room}</p>
        <p><strong>Setup:</strong> {reservation.setup}</p>
      </div>
      
      <div className="notes-section">
        <h3>Additional Notes</h3>
        <textarea
          rows="4"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Enter any special requests or additional information..."
        />
      </div>
      
      <button 
        className="submit-button" 
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Reservation'}
      </button>
      
      <Navigation 
        currentStep={currentStep} 
        totalSteps={4} 
        onNext={null} 
        onPrevious={prevStep}
      />
    </div>
  );
}

export default ConfirmationPage;