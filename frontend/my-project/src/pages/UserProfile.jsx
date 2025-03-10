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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-green-400 to-green-600 p-8">
            <div className="flex items-center">
              <div className="w-32 h-32 bg-white rounded-full p-2 shadow-lg">
                <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faUser} className="w-16 h-16 text-gray-400" />
                </div>
              </div>
              <div className="ml-8 text-white">
                <div className="flex items-center">
                  <h1 className="text-3xl font-bold">{user.name}</h1>
                  {user.verified && (
                    <FontAwesomeIcon 
                      icon={faCheckCircle} 
                      className="ml-3 text-2xl text-white hover:text-green-200 transition-colors"
                      title="Verified User" 
                    />
                  )}
                </div>
                <div className="mt-3 flex items-center space-x-1">
                  {renderStars(user.trustRating)}
                  <span className="ml-2 text-lg">
                    ({user.trustRating} • {user.totalReviews} reviews)
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* New Bio Section */}
          <div className="px-8 py-4 border-t border-gray-100">
            <p className="text-gray-600 italic">{user.bio}</p>
            <button className="mt-2 text-green-600 hover:text-green-700 text-sm flex items-center" onClick={() => setShowEditModal(true)}>
              <FontAwesomeIcon icon={faPencilAlt} className="w-3 h-3 mr-1" />
              Edit Bio
            </button>
          </div>
        </div>

        {/* Profile Completion */}
        <div className="bg-white rounded-xl p-6 shadow-md mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">Profile Completion</h3>
            <span className="text-green-600 font-bold">{user.profileCompletion}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${user.profileCompletion}%` }}
            />
          </div>
        </div>

        {/* Achievements Section */}
        <div className="bg-white rounded-xl p-6 shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {user.achievements.map(achievement => (
              <div key={achievement.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                <FontAwesomeIcon icon={achievement.icon} className="text-yellow-400 w-8 h-8" />
                <div className="ml-3">
                  <h3 className="font-semibold">{achievement.title}</h3>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Products */}
        <div className="bg-white rounded-xl p-6 shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {user.featuredProducts.map(product => (
              <div key={product.id} className="flex items-center p-4 border rounded-lg hover:shadow-md transition-shadow">
                <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                <div className="ml-4">
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-green-600">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Total Sales</h3>
              <FontAwesomeIcon icon={faShoppingCart} className="text-green-500 w-5 h-5" />
            </div>
            <p className="text-3xl font-bold text-green-600 mt-2">{user.stats.totalSales}</p>
            <p className="text-sm text-gray-500 mt-1">Completed orders</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Products Listed</h3>
              <FontAwesomeIcon icon={faChartLine} className="text-green-500 w-5 h-5" />
            </div>
            <p className="text-3xl font-bold text-green-600 mt-2">{user.stats.productsListed}</p>
            <p className="text-sm text-gray-500 mt-1">Active listings</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Total Earnings</h3>
              <FontAwesomeIcon icon={faChartLine} className="text-green-500 w-5 h-5" />
            </div>
            <p className="text-3xl font-bold text-green-600 mt-2">{user.stats.totalEarnings}</p>
            <p className="text-sm text-gray-500 mt-1">Earnings to date</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Contact & Status Cards */}
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors">
                    <FontAwesomeIcon icon={faEnvelope} className="text-green-500 w-5 h-5" />
                    <span className="ml-3 text-gray-600">{user.email}</span>
                  </div>
                  <div className="flex items-center p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors">
                    <FontAwesomeIcon icon={faPhone} className="text-green-500 w-5 h-5" />
                    <span className="ml-3 text-gray-600">{user.phone}</span>
                  </div>
                  <div className="flex items-center p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-green-500 w-5 h-5" />
                    <span className="ml-3 text-gray-600">{user.location}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Status</h2>
                <div className="bg-white p-4 rounded-lg">
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full ${user.verified ? 'bg-green-500' : 'bg-red-500'} mr-3`}></div>
                    <span className="text-lg">
                      {user.verified ? 'Verified Account' : 'Unverified Account'}
                    </span>
                  </div>
                  <p className="mt-3 text-gray-600 text-sm">
                    {user.verified 
                      ? 'This account has been verified and is in good standing.'
                      : 'This account is pending verification.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* New Recent Activity Section */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FontAwesomeIcon icon={faCalendarAlt} className="text-green-500 w-5 h-5 mr-2" />
              Recent Activity
            </h2>
            <div className="space-y-4">
              {user.recentActivity.map(activity => (
                <div key={activity.id} className="flex items-start border-l-2 border-green-500 pl-3">
                  <div>
                    <p className="text-gray-700">{activity.description}</p>
                    <p className="text-sm text-gray-500">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-4 mt-6">
          {Object.entries(user.socialLinks).map(([platform, url]) => (
            <a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-green-500 transition-colors"
            >
              <FontAwesomeIcon icon={`fa${platform.charAt(0).toUpperCase() + platform.slice(1)}`} className="w-6 h-6" />
            </a>
          ))}
        </div>
      </div>

      {showEditModal && <EditProfileModal />}
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;