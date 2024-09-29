import React, { useState } from 'react';
import { ethers } from 'ethers';

const AppointmentForm = ({ doctorName }) => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Logic for booking the appointment, similar to Appointment.js
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Appointment with {doctorName}</h2>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
            <button type="submit">Book Appointment</button>
        </form>
    );
};

export default AppointmentForm;
