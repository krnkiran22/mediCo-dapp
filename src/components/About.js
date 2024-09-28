import React from 'react';

const About = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-green-400">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">About Medico</h1>
        <p className="text-lg text-gray-600 mb-8">
          Medico is your trusted platform for connecting patients with doctors. We offer a secure and efficient way to manage your medical appointments and prescriptions.
        </p>
        <a
          href="/"
          className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
};

export default About;
