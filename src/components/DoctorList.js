import React from 'react';
import { Link } from 'react-router-dom';

const doctors = [
  { id: 1, name: 'Dr. John Doe', speciality: 'Cardiology' },
  { id: 2, name: 'Dr. Jane Smith', speciality: 'Dermatology' },
  { id: 3, name: 'Dr. Alice Johnson', speciality: 'Neurology' },
  // Add more doctors as needed
];

const DoctorList = () => {
  return (
    <div className="doctor-list-container">
      <h2>Available Doctors</h2>
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor.id}>
            <h3>{doctor.name}</h3>
            <p>Speciality: {doctor.speciality}</p>
            <Link to={`/appointment/${doctor.id}`}>
              <button>Apply Appointment</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorList;
