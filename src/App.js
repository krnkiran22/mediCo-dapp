// App.js
import React, { useState } from "react";
import { ethers } from "ethers";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Doctors from "./components/Doctors";
import About from "./components/About";
import Home from "./components/Home";
import MyAppointments from "./components/MyAppointments";
import "./App.css"

const App = () => {
  const [account, setAccount] = useState(null);

  // Connect wallet function using ethers.js v5.7.2
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        await provider.send("eth_requestAccounts", []); // Request user's wallet to connect
        const signer = provider.getSigner(); // Get the signer (wallet owner)
        const address = await signer.getAddress(); // Get the wallet address
        setAccount(address); // Set wallet address to the state
      } catch (err) {
        console.error("Error connecting to wallet", err);
      }
    } else {
      alert("Please install MetaMask or another Web3 wallet");
    }
  };

  return (
    <Router>
      <div className="App">
        <Navbar account={account} connectWallet={connectWallet} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/my_appointments" element={<MyAppointments />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
