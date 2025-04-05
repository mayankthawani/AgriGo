import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaTractor, FaRupeeSign, FaRobot, FaCog, FaFileUpload } from "react-icons/fa";

const AddEquipment = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [equipment, setEquipment] = useState({
    name: "",
    type: "",
    description: "",
    season: "",
    location: "",
    pricePerDay: "",
    vehicleDetails: {
      registrationNumber: "",
      manufacturer: "",
      model: "",
      yearOfManufacture: ""
    },
    documents: {
      registrationDoc: null,
      insuranceDoc: null
    }
  });
  const [aiPrice, setAiPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setEquipment({ ...equipment, [e.target.name]: e.target.value });
  };

  const handleVehicleDetailsChange = (e) => {
    setEquipment({
      ...equipment,
      vehicleDetails: {
        ...equipment.vehicleDetails,
        [e.target.name]: e.target.value
      }
    });
  };

  const handleFileChange = (e, docType) => {
    setEquipment({
      ...equipment,
      documents: {
        ...equipment.documents,
        [docType]: e.target.files[0]
      }
    });
  };

  const getAIPrediction = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/ai-pricing/predict",
        {
          type: equipment.type,
          season: equipment.season,
          location: equipment.location
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setAiPrice(response.data.predictedPrice);
    } catch (error) {
      setError("Failed to get AI prediction");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      // Append basic equipment details
      Object.keys(equipment).forEach(key => {
        if (key !== 'documents') {
          formData.append(key, equipment[key]);
        }
      });
      
      // Append vehicle details
      Object.keys(equipment.vehicleDetails).forEach(key => {
        formData.append(`vehicleDetails[${key}]`, equipment.vehicleDetails[key]);
      });

      // Append documents if they exist
      if (equipment.documents.registrationDoc) {
        formData.append('registrationDoc', equipment.documents.registrationDoc);
      }
      if (equipment.documents.insuranceDoc) {
        formData.append('insuranceDoc', equipment.documents.insuranceDoc);
      }

      const response = await axios.post(
        "http://localhost:5000/api/equipment",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.data.success) {
        navigate("/book-equipment");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to add equipment");
    } finally {
      setLoading(false);
    }
  };

  const useAIPrice = () => {
    setEquipment({ ...equipment, pricePerDay: aiPrice });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-green-600 p-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <FaTractor />
              {step === 1 ? "Add Equipment Details" : "Set Equipment Price"}
            </h2>
          </div>

          {step === 1 ? (
            /* Step 1: Equipment Details */
            <form className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Equipment Name</label>
                  <input
                    type="text"
                    name="name"
                    value={equipment.name}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Equipment Type</label>
                  <select
                    name="type"
                    value={equipment.type}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="Tractor">Tractor</option>
                    <option value="Harvester">Harvester</option>
                    <option value="Plough">Plough</option>
                    <option value="Seeder">Seeder</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    name="description"
                    value={equipment.description}
                    onChange={handleChange}
                    rows="3"
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Season</label>
                  <select
                    name="season"
                    value={equipment.season}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
                    required
                  >
                    <option value="">Select Season</option>
                    <option value="Kharif">Kharif</option>
                    <option value="Rabi">Rabi</option>
                    <option value="Zaid">Zaid</option>
                    <option value="Any">Any Season</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={equipment.location}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
              </div>

              {/* Vehicle Details Section */}
              <div className="border-t pt-6 mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Vehicle Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Registration Number</label>
                    <input
                      type="text"
                      name="registrationNumber"
                      value={equipment.vehicleDetails.registrationNumber}
                      onChange={handleVehicleDetailsChange}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
                      required
                      placeholder="e.g., MH02BR2023"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Manufacturer</label>
                    <input
                      type="text"
                      name="manufacturer"
                      value={equipment.vehicleDetails.manufacturer}
                      onChange={handleVehicleDetailsChange}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
                      required
                      placeholder="e.g., John Deere"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Model</label>
                    <input
                      type="text"
                      name="model"
                      value={equipment.vehicleDetails.model}
                      onChange={handleVehicleDetailsChange}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
                      required
                      placeholder="e.g., 5310"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Year of Manufacture</label>
                    <input
                      type="number"
                      name="yearOfManufacture"
                      value={equipment.vehicleDetails.yearOfManufacture}
                      onChange={handleVehicleDetailsChange}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
                      required
                      min="1990"
                      max={new Date().getFullYear()}
                      placeholder={new Date().getFullYear()}
                    />
                  </div>
                </div>
              </div>

              {/* Document Upload Section */}
              <div className="border-t pt-6 mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Vehicle Documents</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Vehicle Registration Document</label>
                    <div className="mt-1 flex items-center">
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(e, 'registrationDoc')}
                        className="hidden"
                        id="registrationDoc"
                        accept=".pdf,.jpg,.jpeg,.png"
                      />
                      <label
                        htmlFor="registrationDoc"
                        className="cursor-pointer flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 w-full"
                      >
                        <FaFileUpload className="text-green-600" />
                        {equipment.documents.registrationDoc ? equipment.documents.registrationDoc.name : 'Upload Registration Document'}
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Vehicle Insurance</label>
                    <div className="mt-1 flex items-center">
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(e, 'insuranceDoc')}
                        className="hidden"
                        id="insuranceDoc"
                        accept=".pdf,.jpg,.jpeg,.png"
                      />
                      <label
                        htmlFor="insuranceDoc"
                        className="cursor-pointer flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 w-full"
                      >
                        <FaFileUpload className="text-green-600" />
                        {equipment.documents.insuranceDoc ? equipment.documents.insuranceDoc.name : 'Upload Insurance Document'}
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setStep(2)}
                  type="button"
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                >
                  Next: Set Price
                </motion.button>
              </div>
            </form>
          ) : (
            /* Step 2: Pricing */
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* AI Price Prediction */}
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
                    <FaRobot className="text-green-600" />
                    AI Price Prediction
                  </h3>
                  <button
                    onClick={getAIPrediction}
                    disabled={loading}
                    className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 mb-4"
                  >
                    {loading ? "Calculating..." : "Get AI Prediction"}
                  </button>
                  {aiPrice && (
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">₹{aiPrice}/day</p>
                      <button
                        onClick={useAIPrice}
                        className="mt-2 text-green-600 hover:text-green-700"
                      >
                        Use this price
                      </button>
                    </div>
                  )}
                </div>

                {/* Manual Price Setting */}
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
                    <FaCog className="text-green-600" />
                    Set Price Manually
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Price per Day (₹)</label>
                    <input
                      type="number"
                      name="pricePerDay"
                      value={equipment.pricePerDay}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {error && (
                <div className="mt-4 text-red-600 text-center">{error}</div>
              )}

              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setStep(1)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  ← Back to Details
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  disabled={loading || !equipment.pricePerDay}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                >
                  {loading ? "Adding Equipment..." : "Add Equipment"}
                </motion.button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AddEquipment;
