// Profile.js
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import contractABI from './ContractABI.json'; // Import the ABI of your contract

// Replace with your deployed contract address
const contractAddress = "0xE73E34dc58E839eF58B64B3FC81F37BC864a9065";

const Profile = () => {
  const [account, setAccount] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    age: "",
    sex: "",
    bloodGroup: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    sex: "",
    bloodGroup: "",
  });

  useEffect(() => {
    connectWalletAndFetchData();
  }, []);

  // Connect to the Ethereum wallet and fetch the user data
  const connectWalletAndFetchData = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);

        const contract = new ethers.Contract(contractAddress, contractABI, provider);
        
        // Check if the user is registered
        const user = await contract.users(address);
        if (user.isRegistered) {
          setIsRegistered(true);
          setUserDetails({
            name: user.name,
            age: user.age.toString(),
            sex: user.sex,
            bloodGroup: user.bloodGroup,
          });
        }
      } catch (err) {
        console.error("Error connecting to wallet or fetching data", err);
      }
    } else {
      alert("Please install MetaMask or another Web3 wallet");
    }
  };

  // Update user profile in the contract
  const updateUserProfile = async () => {
    if (!window.ethereum) {
      alert("Please install a Web3 wallet like MetaMask");
      return;
    }

    try {
      setLoading(true);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const tx = await contract.registerUser(
        formData.name,
        parseInt(formData.age),
        formData.sex,
        formData.bloodGroup
      );
      await tx.wait(); // Wait for the transaction to be mined

      alert("Profile updated successfully on the blockchain!");

      // After successful registration, fetch and display the user's profile
      setIsRegistered(true);
      setUserDetails({
        name: formData.name,
        age: formData.age,
        sex: formData.sex,
        bloodGroup: formData.bloodGroup,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("There was an error updating the profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserProfile();
  };

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (isRegistered) {
    return (
      <div className="profile">
        <h2>Your Profile Details</h2>
        <p><strong>Name:</strong> {userDetails.name}</p>
        <p><strong>Age:</strong> {userDetails.age}</p>
        <p><strong>Sex:</strong> {userDetails.sex}</p>
        <p><strong>Blood Group:</strong> {userDetails.bloodGroup}</p>
      </div>
    );
  }

  return (
    <div className="profile">
      <h2>Register Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Sex:</label>
          <select
            name="sex"
            value={formData.sex}
            onChange={handleInputChange}
            required
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label>Blood Group:</label>
          <input
            type="text"
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
