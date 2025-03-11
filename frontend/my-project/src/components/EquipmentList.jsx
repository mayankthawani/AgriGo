import React, { useEffect, useState } from "react";
import axios from "axios";

const EquipmentList = () => {
  const [equipment, setEquipment] = useState([]);

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/equipment", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setEquipment(response.data);
      } catch (error) {
        console.error("Error fetching equipment:", error);
      }
    };

    fetchEquipment();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Equipment List</h2>
      {equipment.length === 0 ? (
        <p>No equipment available.</p>
      ) : (
        <ul className="space-y-4">
          {equipment.map((item) => (
            <li key={item._id} className="p-4 border rounded">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p>{item.description}</p>
              <p className="font-bold">Price: ${item.pricePerDay}/day</p>
              <p>Location: {item.location}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EquipmentList;
