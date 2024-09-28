import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ethers } from 'ethers';
import contractABI from '../contractABI.json'; // Adjust the path if needed

const doctors = [
  { id: 1, name: 'Dr. John Doe', speciality: 'Cardiology' },
  { id: 2, name: 'Dr. Jane Smith', speciality: 'Dermatology' },
  { id: 3, name: 'Dr. Alice Johnson', speciality: 'Neurology' },
  // Add more doctors as needed
];

const Appointment = () => {
  const { id } = useParams();
  const selectedDoctor = doctors.find(doctor => doctor.id === parseInt(id));

  const contractAddress = "0xE5f2A565Ee0Aa9836B4c80a07C8b32aAd7978e22"; // Your contract address
  const [userDetails, setUserDetails] = useState({
    name: '',
    age: '',
    sex: '',
    bloodGroup: '',
    contact: '',
  });
  const [amount, setAmount] = useState("0.01"); // Set the amount to be paid
  const [message, setMessage] = useState('');

  // Function to save user details
  const saveUserDetails = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Please install MetaMask!");
        return;
      }

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const transaction = await contract.saveUserDetails(
        userDetails.name,
        userDetails.age,
        userDetails.sex,
        userDetails.bloodGroup,
        userDetails.contact
      );

      await transaction.wait();
      setMessage('User details saved successfully!');
    } catch (error) {
      console.error(error);
      setMessage('Error saving user details.');
    }
  };

  // Function to book appointment
  const bookAppointment = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Please install MetaMask!");
        return;
      }

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const transaction = await contract.bookAppointment(
        selectedDoctor.name,
        selectedDoctor.speciality,
        Math.floor(Date.now() / 1000), // Example date (Unix timestamp)
        Math.floor(Date.now() / 1000) + 3600, // Example time (1 hour later)
        { value: ethers.utils.parseEther(amount) }
      );

      await transaction.wait();
      setMessage('Appointment booked successfully!');
    } catch (error) {
      console.error(error);
      setMessage('Error booking appointment.');
    }
  };

  return (
    <div className="appointment-container">
      <h2>Book Appointment with {selectedDoctor.name}</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        saveUserDetails();
        bookAppointment();
      }}>
        <input 
          type="text" 
          placeholder="Name" 
          value={userDetails.name} 
          onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })} 
          required 
        />
        <input 
          type="number" 
          placeholder="Age" 
          value={userDetails.age} 
          onChange={(e) => setUserDetails({ ...userDetails, age: e.target.value })} 
          required 
        />
        <input 
          type="text" 
          placeholder="Sex" 
          value={userDetails.sex} 
          onChange={(e) => setUserDetails({ ...userDetails, sex: e.target.value })} 
          required 
        />
        <input 
          type="text" 
          placeholder="Blood Group" 
          value={userDetails.bloodGroup} 
          onChange={(e) => setUserDetails({ ...userDetails, bloodGroup: e.target.value })} 
          required 
        />
        <input 
          type="text" 
          placeholder="Email or Phone Number" 
          value={userDetails.contact} 
          onChange={(e) => setUserDetails({ ...userDetails, contact: e.target.value })} 
          required 
        />
        <button type="submit">Book Appointment</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Appointment;
