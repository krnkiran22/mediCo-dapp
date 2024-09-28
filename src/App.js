import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home'; // Home page
import DoctorList from './components/DoctorList'; // Page to view the list of doctors
import AppointmentForm from './components/Appointment'; // Page to apply for an appointment
import UserProfile from './components/Profile'; // User profile page for details
import Login from './components/Login'; // Login page
import SignUp from './components/Signup'; // Sign up page
import ForgotPassword from './components/ForgotPassword'; // Forgot password page
import About from './components/About'; // About page
import Navbar from './components/Navbar'; // Navigation header
import './App.css'; // Styles

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<DoctorList />} />
          <Route path="/appointment/:id" element={<AppointmentForm />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
