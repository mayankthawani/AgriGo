import React from 'react';

const Landing = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-green-50 flex flex-col items-center text-center py-16 px-4">
        <h1 className="text-4xl font-bold mb-4">
          Affordable Equipment Solutions for Modern Agriculture
        </h1>
        <p className="text-lg text-gray-700 mb-6">Empowering farmers today</p>
        <button className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600">
          Get Started
        </button>
      </section>

      {/* Photo Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 px-6 py-12 bg-white">
        <div className="rounded overflow-hidden shadow-md">
          <img
            src="https://dev-harvester.pantheonsite.io/wp-content/uploads/2025/03/pexels-photo-30955759.jpeg"
            alt="Tractor in the field"
            className="w-full h-auto"
          />
        </div>
        <div className="rounded overflow-hidden shadow-md">
          <img
            src="https://dev-harvester.pantheonsite.io/wp-content/uploads/2025/03/pexels-photo-2933243.jpeg"
            alt="Modern farming equipment"
            className="w-full h-auto"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 py-12 bg-white">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">98%</h2>
          <p>Success Rates</p>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">15K</h2>
          <p>Satisfied Customers</p>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">900+</h2>
          <p>Staff Worldwide</p>
        </div>
      </section>

      {/* Farming Solutions Section */}
      <section className="bg-gray-100 py-16 px-6 text-center">
        <h2 className="text-xl font-bold mb-4">Explore Our Innovative Farming Solutions</h2>
        <ul className="list-disc list-inside text-left mx-auto max-w-md">
          <li>Equipment Rental</li>
          <li>AI-driven Insights</li>
          <li>Trusted Network</li>
          <li>Support and Training</li>
        </ul>
        <button className="bg-green-500 text-white px-6 py-3 rounded mt-4 hover:bg-green-600">
          All Services
        </button>
      </section>

      {/* Journey Section */}
      <section
        className="py-16 px-6 bg-cover bg-center text-white text-center"
        style={{
          backgroundImage: "url('/path-to-background-image.jpg')",
        }}
      >
        <h2 className="text-xl font-bold mb-4">Our Journey</h2>
        <p>
          Founded by a group of passionate farmers, Agri emerged to address the challenges faced in modern agriculture.
        </p>
        <button className="bg-green-500 text-white px-6 py-3 rounded mt-4 hover:bg-green-600">
          Read More
        </button>
      </section>

      {/* Trusted Farming Partner Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6 px-6 py-12 bg-white">
        {/* Card 1 */}
        <div className="rounded overflow-hidden shadow-md p-4 bg-gray-50">
          <h3 className="text-lg font-bold mb-2">Affordable Rentals</h3>
          <p>Access advanced tools without ownership costs.</p>
        </div>

        {/* Card 2 */}
        <div className="rounded overflow-hidden shadow-md p-4 bg-gray-50">
          <h3 className="text-lg font-bold mb-2">Trusted Network</h3>
          <p>Reliable partnerships for quality and accountability.</p>
        </div>

        {/* Card 3 */}
        <div className="rounded overflow-hidden shadow-md p-4 bg-gray-50">
          <img
            src="/path-to-image3.jpg"
            alt="Farming equipment"
            className="w-full h-auto rounded mb-4"
          />
          <p>Fostering local community relationships.</p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-6 bg-gray-100 text-center">
        <h2 className="text-xl font-bold mb-6">What Our Farmers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
          {[
            {
              name: 'Jake Smith',
              feedback:
                'Agri has transformed my farming experience, providing access to equipment I never thought I could afford.',
            },
            {
              name: 'Tom Johnson',
              feedback:
                'Thanks to Agri, I can rent high-quality machinery without the burden of ownership.',
            },
            {
              name: 'Ella Brown',
              feedback:
                'Agri’s support and resources have significantly increased my farm productivity and efficiency.',
            },
          ].map(({ name, feedback }) => (
            <div key={name} className="border p-4 rounded shadow-md bg-white">
              <p>"{feedback}"</p>
              <span>- {name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-green-100 py-16 text-center">
        Join the Agri Community Today
        <p>Empower your farming journey with reliable solutions and insights. Let’s grow together!</p>
        <button className="bg-green-500 text-white px-6 py-3 rounded mt-4 hover:bg-green-600">
          Get Started
        </button>

        {/* Copyright */}
        <div className="mt-8 text-sm">&copy; {new Date().getFullYear()} Agri</div>
      </footer>
    </main>
  );
};

export default Landing;
