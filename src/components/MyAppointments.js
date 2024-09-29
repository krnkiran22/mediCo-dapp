// MyAppointments.js
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import contractABI from './ContractABI.json'; // Import the ABI of your contract

// Replace with your deployed contract address
const contractAddress = "0xE73E34dc58E839eF58B64B3FC81F37BC864a9065";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    connectWallet();
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        const accounts = await provider.send("eth_requestAccounts", []);
        setAccount(accounts[0]); // Ensure it's a valid Ethereum address
        loadAppointments(accounts[0]);
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      alert("Please install MetaMask or another Web3 wallet");
    }
  };

  const loadAppointments = async (userAddress) => {
    if (!window.ethereum) return;

    setLoading(true);

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      // Fetch the appointment details
      const appointmentDetails = await contract.getAppointment(userAddress);

      // If the appointment is booked, store it in the state
      if (appointmentDetails.isBooked) {
        const appointmentDate = new Date(appointmentDetails.dateTime * 1000);
        setAppointments((prev) => [
          ...prev,
          { date: appointmentDate.toLocaleDateString(), time: appointmentDate.toLocaleTimeString() },
        ]);
      } else {
        setAppointments([]);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-appointments">
      <h2>My Appointments</h2>
      {loading ? (
        <p>Loading...</p>
      ) : appointments.length > 0 ? (
        <ul>
          {appointments.map((appointment, index) => (
            <li key={index}>
              <p>Date: {appointment.date}</p>
              <p>Time: {appointment.time}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No appointments found.</p>
      )}
    </div>
  );
};

export default MyAppointments;
