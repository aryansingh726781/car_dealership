
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [ownedCars, setOwnedCars] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token'); // Assuming you store the JWT token in localStorage

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Response:', response); // Debugging: log the response
        setUser(response.data.user);
        setOwnedCars(response.data.ownedCars);
      } catch (error) {
        console.error('Error fetching user profile:', error.response || error.message || error);
        setError(error.response ? error.response.data.error : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUserProfile();
    } else {
      setError('No token found');
      setLoading(false);
    }
  }, [token]);

  if (loading) {
    return <div className="max-w-md mx-auto p-4 bg-gray-100 text-gray-700 border border-gray-400 rounded">Loading...</div>;
  }

  if (error) {
    return <div className="max-w-md mx-auto p-4 bg-red-100 text-red-700 border border-red-400 rounded">{error}</div>;
  }

  if (!user) {
    return <div className="max-w-md mx-auto p-4 bg-gray-100 text-gray-700 border border-gray-400 rounded">User not found</div>;
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="mb-4">
        <p><span className="font-bold">Username:</span> {user.username}</p>
        <p><span className="font-bold">Role:</span> {user.role}</p>
      </div>
      <h2 className="text-xl font-bold mb-2">Owned Vehicles:</h2>
      {ownedCars.length === 0 ? (
        <p>No vehicles owned yet.</p>
      ) : (
        <ul>
          {ownedCars.map(car => (
            <li key={car._id} className="mb-2 p-2 bg-gray-100 border border-gray-300 rounded">
              <p>{car.make} {car.model} ({car.year})</p>
              <p>Dealership: {car.dealership}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Profile;
