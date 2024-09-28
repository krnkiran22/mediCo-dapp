import React, { useState } from 'react';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MedicoABI from '../contractABI.json'; // Replace with your ABI

const Profile = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    sex: '',
    bloodGroup: '',
    contact: ''
  });
  const contractAddress = '0xE5f2A565Ee0Aa9836B4c80a07C8b32aAd7978e22'; // Replace with deployed contract address

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const saveUserDetails = async () => {
    try {
      if (!window.ethereum) throw new Error('No crypto wallet found. Please install it.');
      
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const medicoContract = new ethers.Contract(contractAddress, MedicoABI, signer);

      const tx = await medicoContract.saveUserDetails(formData.name, formData.age, formData.sex, formData.bloodGroup, formData.contact);
      await tx.wait();

      toast.success('User details saved on the blockchain!', { position: toast.POSITION.TOP_RIGHT });
    } catch (error) {
      console.error('Error saving user details:', error);
      toast.error('Error saving details: ' + error.message, { position: toast.POSITION.TOP_RIGHT });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-green-400">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Profile</h2>
        <div className="mb-6">
          <label className="block text-gray-600 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-600 mb-1">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-600 mb-1">Sex</label>
          <input
            type="text"
            name="sex"
            value={formData.sex}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-600 mb-1">Blood Group</label>
          <input
            type="text"
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-600 mb-1">Contact (Email/Phone)</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <button
          onClick={saveUserDetails}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Save Details
        </button>
      </div>
    </div>
  );
};

export default Profile;
