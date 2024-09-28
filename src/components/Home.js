import React from 'react';

const Home = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-green-400">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Welcome to Medico</h1>
        <p className="text-lg text-gray-600 mb-8">
          A complete solution for booking appointments, managing prescriptions, and more. Join us today to experience seamless medical services.
        </p>
        <a
          href="/doctors"
          className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition duration-300"
        >
          View Doctors
        </a>
      </div>
    </div>
  );
};

export default Home;
