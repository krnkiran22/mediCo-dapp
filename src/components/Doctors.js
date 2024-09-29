// Doctors.js
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import contractABI from './ContractABI.json'; // Import the ABI of your contract

// Replace with your deployed contract address
const contractAddress = "0xE73E34dc58E839eF58B64B3FC81F37BC864a9065";

// Example list of doctors
const doctorsList = [
  { id: 1, name: "Dr. John Doe", specialization: "Cardiologist" },
  { id: 2, name: "Dr. Jane Smith", specialization: "Dermatologist" },
  { id: 3, name: "Dr. Emily Clark", specialization: "Pediatrician" },
];

const Doctors = () => {
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    connectWallet();
  }, []);

  // Connect to MetaMask wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        const accounts = await provider.send("eth_requestAccounts", []);
        setAccount(accounts[0]); // Ensure it's a valid Ethereum address
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      toast.error("Please install MetaMask or another Web3 wallet");
    }
  };

  const bookAppointment = async (doctorName, doctorId) => {
    if (!window.ethereum) {
      toast.error("Please install MetaMask or another Web3 wallet");
      return;
    }

    if (!appointmentDate || !appointmentTime) {
      toast.error("Please select a date and time for your appointment");
      return;
    }

    try {
      setLoading(true);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      // Convert selected date and time to a timestamp (seconds since epoch)
      const appointmentTimestamp = Math.floor(
        new Date(`${appointmentDate} ${appointmentTime}`).getTime() / 1000
      );

      // Ensure account is connected and valid
      if (!account) {
        toast.error("No account connected");
        return;
      }

      // Call the smart contract function to book the appointment
      const tx = await contract.bookAppointment(appointmentTimestamp, {
        value: ethers.utils.parseEther("0.01"), // Appointment fee
      });

      // Wait for the transaction to complete
      await tx.wait();

      // Success message with doctor's name
      toast.success(`Appointment booked successfully with ${doctorName}`);
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast.error("Appointment booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleApplyAppointment = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedDoctor) {
      bookAppointment(selectedDoctor.name, selectedDoctor.id);
    }
  };

  return (
    <div className="doctors-page">
      <h2>Available Doctors</h2>

      <ul>
        {doctorsList.map((doctor) => (
          <li key={doctor.id}>
            <p><strong>{doctor.name}</strong> ({doctor.specialization})</p>
            <button onClick={() => handleApplyAppointment(doctor)}>
              Apply for Appointment
            </button>
          </li>
        ))}
      </ul>

      {selectedDoctor && (
        <div className="appointment-form">
          <h3>Book an Appointment</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Date:</label>
              <input
                type="date"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Time:</label>
              <input
                type="time"
                value={appointmentTime}
                onChange={(e) => setAppointmentTime(e.target.value)}
                required
              />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? "Booking..." : "Confirm Appointment"}
            </button>
          </form>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Doctors;
