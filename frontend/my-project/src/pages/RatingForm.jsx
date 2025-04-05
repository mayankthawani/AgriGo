import React, { useState } from "react";
import axios from "axios";

const RatingForm = ({ bookingId, onRatingSubmitted }) => {
  const [rating, setRating] = useState(5);
  const token = localStorage.getItem("token");

  const submitRating = async () => {
    try {
      await axios.post(
        `http://localhost:5000/api/booking/${bookingId}/rate`,
        { rating },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Rating submitted successfully!");
      onRatingSubmitted();
    } catch (error) {
      console.error("Error submitting rating:", error.response?.data?.message || error.message);
      alert("Failed to submit rating.");
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold">Rate this rental</h3>
      <select
        value={rating}
        onChange={(e) => setRating(parseInt(e.target.value))}
        className="border p-2 rounded w-full mt-2"
      >
        {[5, 4, 3, 2, 1].map((star) => (
          <option key={star} value={star}>
            {star} Stars
          </option>
        ))}
      </select>
      <button
        onClick={submitRating}
        className="mt-3 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Submit Rating
      </button>
    </div>
  );
};

export default RatingForm;
