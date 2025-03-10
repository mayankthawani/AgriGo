// src/components/Header.jsx
import React from 'react';

const Header = () => {
  return (
    <header className="flex justify-between items-center py-4 px-6 bg-green-100">
      <div className="text-xl font-bold flex items-center">
        <img
          src="https://dev-harvester.pantheonsite.io/"
          alt="Agri Logo"
          className="h-8 w-8 mr-2"
        />
        Agri
      </div>
      <nav className="space-x-4">
        <a href="#about" className="hover:text-green-500">
          About
        </a>
        <a href="#services" className="hover:text-green-500">
          Services
        </a>
        <a href="#blog" className="hover:text-green-500">
          Blog
        </a>
        <a href="#contact" className="hover:text-green-500">
          Contact
        </a>
      </nav>
      <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        Get Started
      </button>
    </header>
  );
};

export default Header;
