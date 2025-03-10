import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faStar, faCheckCircle, faUser, faEnvelope, faPhone, faMapMarkerAlt,
  faPencilAlt, faChartLine, faCalendarAlt, faShoppingCart, faMedal, faLink, faEdit, faLeaf, faAward, 
  faFacebook, faTwitter, faInstagram 
} from '@fortawesome/free-solid-svg-icons';

const UserProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const user = {
    name: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    location: "New York, USA",
    verified: true,
    trustRating: 4.5,
    totalReviews: 28,
    bio: "Passionate farmer specializing in organic vegetables and sustainable farming practices.",
    joinDate: "January 2023",
    stats: {
      totalSales: 156,
      productsListed: 23,
      totalEarnings: "$12,450"
    },
    recentActivity: [
      { id: 1, type: 'sale', description: 'Sold 50kg Organic Tomatoes', date: '2 days ago' },
      { id: 2, type: 'listing', description: 'Listed Fresh Carrots', date: '5 days ago' },
      { id: 3, type: 'review', description: 'Received 5-star review', date: '1 week ago' },
    ],
    achievements: [
      { id: 1, title: 'Top Seller', icon: faMedal, description: 'Achieved 100+ sales' },
      { id: 2, title: 'Eco Warrior', icon: faLeaf, description: 'Uses sustainable practices' },
      { id: 3, title: 'Premium Vendor', icon: faAward, description: 'Maintained 4.5+ rating' },
    ],
    socialLinks: {
      facebook: 'https://facebook.com/johndoe',
      twitter: 'https://twitter.com/johndoe',
      instagram: 'https://instagram.com/johndoe'
    },
    featuredProducts: [
      { id: 1, name: 'Organic Tomatoes', price: '$4.99/kg', image: '/tomatoes.jpg' },
      { id: 2, name: 'Fresh Carrots', price: '$3.99/kg', image: '/carrots.jpg' },
    ],
    profileCompletion: 85
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FontAwesomeIcon
        key={index}
        icon={faStar}
        className={`${
          index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
        } w-5 h-5`}
      />
    ));
  };

  // Edit Profile Modal Component
  const EditProfileModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
        {/* Add form fields here */}
        <div className="flex justify-end space-x-2 mt-4">
          <button onClick={() => setShowEditModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
            Cancel
          </button>
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      hello
    </div>
  )
}

export default Userprofile
