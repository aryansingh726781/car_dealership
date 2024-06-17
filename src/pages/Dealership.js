
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dealership = () => {
  const [dealership, setDealership] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDealership = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const response = await axios.get('http://localhost:3000/api/dealership', {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log(response)
        setDealership(response.data.dealership);
        setInventory(response.data.inventory);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDealership();
  }, []);

  const handleAddCar = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post('http://localhost:3000/api/cars', { make, model, year }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setInventory([...inventory, response.data]);
      setMake('');
      setModel('');
      setYear('');
      setError('');
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dealership</h1>
      {dealership && (
        <div className="mb-4">
          <h2 className="text-xl">Username: {dealership.username}</h2>
        </div>
      )}
      <h2 className="text-xl font-bold mb-4">Inventory</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {inventory.map(car => (
          <div key={car._id} className="border rounded p-4">
            <h2 className="text-xl font-bold">{car.make} {car.model}</h2>
            <p>Year: {car.year}</p>
          </div>
        ))}
      </div>
      <h2 className="text-xl font-bold mt-8 mb-4">Add New Car</h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleAddCar}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="make">Make</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            id="make"
            type="text"
            value={make}
            onChange={(e) => setMake(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="model">Model</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            id="model"
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="year">Year</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            id="year"
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Car
        </button>
      </form>
    </div>
  );
};

export default Dealership;






