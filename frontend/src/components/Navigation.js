import React from 'react';

function Navigation({ currentStep, totalSteps, onNext, onPrevious }) {
  return (
    <div className="navigation">
      {currentStep > 1 && (
        <button onClick={onPrevious} className="nav-button prev">
          Previous
        </button>
      )}
      {currentStep < totalSteps && (
        <button onClick={onNext} className="nav-button next">
          Next
        </button>
      )}
    </div>
  );
}

export default Navigation;