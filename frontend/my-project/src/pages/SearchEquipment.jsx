import React, { useState } from 'react';

const SearchEquipment = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [equipmentList, setEquipmentList] = useState([
    { id: 1, name: 'Tractor', image: '/tractor.jpg', price: '$100/day', availability: 'Available' },
    { id: 2, name: 'Harvester', image: '/harvester.jpg', price: '$150/day', availability: 'Not Available' },
    { id: 3, name: 'Plow', image: '/plow.jpg', price: '$50/day', availability: 'Available' },
    // Add more equipment here
  ]);

  const filteredEquipment = equipmentList.filter((equipment) =>
    equipment.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="px-6 py-12 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Search Equipment</h1>
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search equipment..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 border rounded mb-6"
      />

      {/* Equipment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-8">
        {filteredEquipment.map((equipment) => (
          <div key={equipment.id} className="bg-white p-4 rounded shadow-md">
            <img src={equipment.image} alt={equipment.name} className="w-full h-auto rounded mb-4" />
            <h3 className="text-lg font-bold">{equipment.name}</h3>
            <p>Price: {equipment.price}</p>
            <p>Status: {equipment.availability}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchEquipment;
