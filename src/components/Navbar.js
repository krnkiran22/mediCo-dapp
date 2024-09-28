import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Create a separate CSS file for Navbar styles

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item"><Link to="/">Home</Link></li>
        <li className="navbar-item"><Link to="/login">Login</Link></li>
        <li className="navbar-item"><Link to="/signup">Sign Up</Link></li>
        <li className="navbar-item"><Link to="/forgot-password">Forgot Password</Link></li>
        <li className="navbar-item"><Link to="/about">About</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
