import axios from "axios";

const API_URL = "http://localhost:5000/api/equipment"; // Change if using deployed backend

// Set auth token (if needed)
const getAuthHeaders = () => {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
};

// Add Equipment
export const addEquipment = async (equipmentData) => {
  return await axios.post(API_URL, equipmentData, getAuthHeaders());
};

// Get All Equipment
export const getAllEquipment = async () => {
  return await axios.get(API_URL);
};

// Edit Equipment
export const updateEquipment = async (id, equipmentData) => {
  return await axios.put(`${API_URL}/${id}`, equipmentData, getAuthHeaders());
};

// Delete Equipment
export const deleteEquipment = async (id) => {
  return await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
};
