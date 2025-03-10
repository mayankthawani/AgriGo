import React from 'react';

const Dashboard = () => {
  const userName = 'Mayank'; // Replace with dynamic user data
  const bookings = [
    { id: 1, equipment: 'Tractor', period: 'March 12 - March 15', status: 'Confirmed' },
    { id: 2, equipment: 'Harvester', period: 'March 20 - March 22', status: 'Pending' },
  ];
  const rentedEquipment = [
    { id: 1, equipment: 'Plow', period: 'March 5 - March 10', status: 'Completed' },
    { id: 2, equipment: 'Seeder', period: 'February 25 - February 28', status: 'Completed' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-green-500 text-white p-6">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <nav className="space-y-4">
          <a href="/search-equipment" className="block hover:text-gray-300">Search Equipment</a>
          <a href="/add-equipment" className="block hover:text-gray-300">Add Equipment</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Welcome Section */}
        <div className="bg-white p-6 rounded shadow-md mb-6">
          <h1 className="text-2xl font-bold">Welcome back, {userName}!</h1>
          <p className="text-gray-700 mt-2">You have {bookings.length} active bookings.</p>
        </div>

        {/* Bookings Section */}
        <div className="bg-white p-6 rounded shadow-md mb-6">
          <h2 className="text-xl font-bold mb-4">Your Bookings</h2>
          {bookings.map((booking) => (
            <div key={booking.id} className="border p-4 rounded mb-4">
              <h3 className="text-lg font-bold">{booking.equipment}</h3>
              <p>Rental Period: {booking.period}</p>
              <p>Status: {booking.status}</p>
            </div>
          ))}
        </div>

        {/* Rented Equipment Section */}
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-bold mb-4">Rented Equipment</h2>
          {rentedEquipment.map((equipment) => (
            <div key={equipment.id} className="border p-4 rounded mb-4">
              <h3 className="text-lg font-bold">{equipment.equipment}</h3>
              <p>Rental Period: {equipment.period}</p>
              <p>Status: {equipment.status}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
