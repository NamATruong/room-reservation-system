import React, { useState } from 'react';
import { ReservationProvider } from './context/ReservationContext';
import PersonalInfo from './pages/PersonalInfo';
import DateTimeSelection from './pages/DateSelection';
import RoomSetupSelection from './pages/RoomSelection';
import ConfirmationPage from './pages/ConfirmationPage';
import './App.css';

function App() {
  const [step, setStep] = useState(1);
  
  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);
  
  const renderStep = () => {
    switch (step) {
      case 1:
        return <PersonalInfo nextStep={nextStep} currentStep={step} />;
      case 2:
        return <DateTimeSelection nextStep={nextStep} prevStep={prevStep} currentStep={step} />;
      case 3:
        return <RoomSetupSelection nextStep={nextStep} prevStep={prevStep} currentStep={step} />;
      case 4:
        return <ConfirmationPage prevStep={prevStep} currentStep={step} />;
      default:
        return <PersonalInfo nextStep={nextStep} currentStep={step} />;
    }
  };
  
  return (
    <ReservationProvider>
      <div className="app">
        <header>
          <h1>Room Reservation System</h1>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${(step / 4) * 100}%` }}></div>
          </div>
          <div className="step-indicators">
            <div className={`step ${step >= 1 ? 'active' : ''}`}>Personal Info</div>
            <div className={`step ${step >= 2 ? 'active' : ''}`}>Date & Time</div>
            <div className={`step ${step >= 3 ? 'active' : ''}`}>Room & Setup</div>
            <div className={`step ${step >= 4 ? 'active' : ''}`}>Confirmation</div>
          </div>
        </header>
        <main>
          {renderStep()}
        </main>
      </div>
    </ReservationProvider>
  );
}

export default App;