import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        username,
        password
      });
      console.log('API Response:', response);

      if (response.data && response.data.token) {
        // Save the token to local storage or context
        localStorage.setItem('token', response.data.token);
        setMessage('Login successful');
        console.log('Login successful');
        // Redirect or update UI as needed
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    // <div>
    //   <h2>Login</h2>
    //   {error && <p style={{ color: 'red' }}>{error}</p>}
    //   <form onSubmit={handleSubmit}>
    //     <div>
    //       <label>Username:</label>
    //       <input
    //         type="text"
    //         value={username}
    //         onChange={(e) => setUsername(e.target.value)}
    //       />
    //     </div>
    //     <div>
    //       <label>Password:</label>
    //       <input
    //         type="password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //       />
    //     </div>
    //     <button type="submit">Login</button>
    //   </form>
    // </div>


<div className="min-h-screen flex items-center justify-center bg-gray-100">
<div className="max-w-md w-full bg-white p-8 rounded shadow">
  <h2 className="text-2xl font-bold mb-6">Login</h2>
  {message && <p className="mb-4 text-red-500">{message}</p>}
  {error && <p style={{ color: 'red' }}>{error}</p>}
  <form onSubmit={handleSubmit}>
    <div className="mb-4">
      <label className="block text-gray-700">Email:</label>
      <input
        type="text"
        className="mt-1 p-2 w-full border rounded"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700">Password:</label>
      <input
        type="password"
        className="mt-1 p-2 w-full border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </div>
    <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Login</button>
  </form>
</div>
</div>
  );
};

export default Login;
