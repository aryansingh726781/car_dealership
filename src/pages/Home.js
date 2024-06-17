// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchCars = async () => {
      const response = await axios.get('http://localhost:3000/api/cars');
      setCars(response.data);
    };

    fetchCars();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Available Cars</h1>
      <input
        type="text"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4"
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cars
          .filter(car => car.make.toLowerCase().includes(search.toLowerCase()) || car.model.toLowerCase().includes(search.toLowerCase()))
          .map(car => (
            <div key={car._id} className="border rounded p-4">
              <h2 className="text-xl font-bold">{car.make} {car.model}</h2>
              <p>Year: {car.year}</p>
              <p>Dealership: {car.dealership}</p>
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2">Buy</button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
