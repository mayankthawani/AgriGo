exports.getMyBookings = async (req, res) => {
    try {
      // Your logic to fetch user's bookings
      res.json({ message: "Fetched bookings successfully" });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  };
  
  exports.getMyRentedEquipment = async (req, res) => {
    try {
      // Your logic to fetch rented equipment
      res.json({ message: "Fetched rented equipment successfully" });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  };
  