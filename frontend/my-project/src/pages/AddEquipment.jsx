import React, { useState } from 'react';

const AddEquipment = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    location: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // Add logic to send form data to backend API
    alert('Equipment added successfully!');
  };

  return (
    <div className="px-6 py-12 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Add Equipment</h1>
      <form onSubmit={handleSubmit}>
        {/* Equipment Name */}
        <input
          type="text"
          name="name"
          placeholder="Equipment Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded mb-4"
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-2 border rounded mb-4"
        ></textarea>

        {/* Price */}
        <input
          type="number"
          name="price"
          placeholder="Price per day ($)"
          value={formData.price}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded mb-4"
        />

        {/* Location */}
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded mb-4"
        />

        {/* Image Upload */}
        <input
          type="file"
          onChange={handleImageUpload}
          className="w-full px-4 py-2 border rounded mb-4"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
        >
          Add Equipment
        </button>
      </form>
    </div>
  );
};

export default AddEquipment;
