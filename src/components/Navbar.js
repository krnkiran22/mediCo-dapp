// Navbar.js
import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ account, connectWallet }) => {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">Medical dApp</Link>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/doctors">Doctors</Link></li>
          <li><Link to="/my_appointments">My Appointments</Link></li>
          <li><Link to="/profile">Profile</Link></li>
        </ul>
        <div className="wallet-button">
          {account ? (
            <span>Connected: {account.substring(0, 6)}...{account.substring(account.length - 4)}</span>
          ) : (
            <button onClick={connectWallet}>Connect Wallet</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
