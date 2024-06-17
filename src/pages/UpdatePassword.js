import React, { useState } from 'react';
import axios from 'axios';

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

    try {
      const response = await axios.post('http://localhost:3000/api/user/update-password', 
        { oldPassword, newPassword }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(response.data.message);
      setOldPassword('');
      setNewPassword('');
    } catch (error) {
      setMessage(error.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="max-w-md w-full bg-white p-8 rounded shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Update Password</h2>
      {message && <p className={`mb-4 ${message.includes('success') ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}
      <form onSubmit={handleUpdatePassword}>
        <div className="mb-4">
          <label className="block text-gray-700">Old Password:</label>
          <input
            type="password"
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">New Password:</label>
          <input
            type="password"
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600 transition duration-200">Update Password</button>
      </form>
    </div>
  </div>
  );
};

export default UpdatePassword;
