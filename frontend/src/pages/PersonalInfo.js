import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ReservationContext } from '../context/ReservationContext';
import Navigation from '../components/Navigation';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  phoneNumber: Yup.string().required('Phone number is required'),
  email: Yup.string().email('Invalid email').required('Email is required')
});

function PersonalInfo({ nextStep, currentStep }) {
  const { reservation, updateReservation } = useContext(ReservationContext);
  
  return (
    <div className="form-container">
      <h2>Personal Information</h2>
      <Formik
        initialValues={{
          name: reservation.name,
          phoneNumber: reservation.phoneNumber,
          email: reservation.email
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          updateReservation(values);
          nextStep();
        }}
      >
        {({ isValid }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <Field type="text" id="name" name="name" />
              <ErrorMessage name="name" component="div" className="error" />
            </div>
            
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <Field type="text" id="phoneNumber" name="phoneNumber" />
              <ErrorMessage name="phoneNumber" component="div" className="error" />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            
            <Navigation 
              currentStep={currentStep} 
              totalSteps={4} 
              onNext={() => isValid && document.querySelector('form').requestSubmit()} 
              onPrevious={null}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default PersonalInfo;