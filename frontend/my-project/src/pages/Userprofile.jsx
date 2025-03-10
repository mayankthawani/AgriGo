import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faStar, faCheckCircle, faUser, faEnvelope, faPhone, faMapMarkerAlt,
  faPencilAlt, faChartLine, faCalendarAlt, faShoppingCart, faMedal, faLink, faEdit, faLeaf, faAward, faTimes 
} from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const UserProfile = () => {
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

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Cover Photo & Profile Section */}
      <div className="relative h-64 bg-gradient-to-r from-green-600 to-green-400">
        <div className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-black bg-opacity-50">
          <div className="max-w-7xl mx-auto flex items-end space-x-6">
            <div className="relative -mb-12">
              <div className="w-32 h-32 rounded-full border-4 border-white bg-white overflow-hidden">
                <FontAwesomeIcon icon={faUser} className="w-full h-full text-gray-400 p-4" />
              </div>
              <div className="absolute -bottom-2 -right-2">
                {user.verified && (
                  <div className="bg-green-500 rounded-full p-2">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-white text-lg" />
                  </div>
                )}
              </div>
            </div>
            <div className="pb-4">
              <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                {user.name}
              </h1>
              <p className="text-gray-200 mt-1">{user.location}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Profile Info Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Profile Info</h2>
              <div className="space-y-3">
                <ProfileInfoItem icon={faEnvelope} text={user.email} />
                <ProfileInfoItem icon={faPhone} text={user.phone} />
                <ProfileInfoItem icon={faMapMarkerAlt} text={user.location} />
                <ProfileInfoItem icon={faCalendarAlt} text={`Joined ${user.joinDate}`} />
              </div>
              <button 
                onClick={() => setShowEditModal(true)}
                className="mt-4 w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200 flex items-center justify-center gap-2"
              >
                <FontAwesomeIcon icon={faEdit} />
                Edit Profile
              </button>
            </div>

            {/* Trust Score Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Trust Score</h2>
              <div className="flex items-center justify-center mb-4">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full border-8 border-green-500 flex items-center justify-center">
                    <span className="text-2xl font-bold">{user.trustRating}</span>
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-yellow-400 rounded-full p-2">
                    <FontAwesomeIcon icon={faStar} className="text-white" />
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="flex items-center">
                  {renderStars(user.trustRating)}
                  <span className="ml-2 text-gray-600">({user.totalReviews} Reviews)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Center Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio Section */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">About</h2>
              <p className="text-gray-600">{user.bio}</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              <StatCard icon={faShoppingCart} title="Total Sales" value={user.stats.totalSales} />
              <StatCard icon={faLeaf} title="Products Listed" value={user.stats.productsListed} />
              <StatCard icon={faChartLine} title="Total Earnings" value={user.stats.totalEarnings} />
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {user.recentActivity.map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit Profile</h2>
              <button onClick={() => setShowEditModal(false)} className="text-gray-500 hover:text-gray-700">
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <form className="space-y-4">
              <EditField label="Name" defaultValue={user.name} />
              <EditField label="Email" defaultValue={user.email} type="email" />
              <EditField label="Phone" defaultValue={user.phone} />
              <EditField label="Location" defaultValue={user.location} />
              <EditField label="Bio" defaultValue={user.bio} multiline />
              <div className="flex justify-end space-x-2 mt-6">
                <button 
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper Components
const ProfileInfoItem = ({ icon, text }) => (
  <div className="flex items-center space-x-3 text-gray-600">
    <FontAwesomeIcon icon={icon} className="w-5 h-5 text-green-500" />
    <span>{text}</span>
  </div>
);

const StatCard = ({ icon, title, value }) => (
  <div className="bg-white rounded-lg shadow p-4 text-center">
    <FontAwesomeIcon icon={icon} className="text-2xl text-green-500 mb-2" />
    <h3 className="text-gray-600 text-sm">{title}</h3>
    <p className="text-xl font-bold text-gray-800">{value}</p>
  </div>
);

const ActivityItem = ({ activity }) => (
  <div className="flex items-start space-x-3">
    <div className="bg-green-100 rounded-full p-2">
      <FontAwesomeIcon icon={getActivityIcon(activity.type)} className="text-green-500" />
    </div>
    <div>
      <p className="text-gray-800">{activity.description}</p>
      <p className="text-sm text-gray-500">{activity.date}</p>
    </div>
  </div>
);

const EditField = ({ label, defaultValue, type = "text", multiline = false }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    {multiline ? (
      <textarea
        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        defaultValue={defaultValue}
        rows={4}
      />
    ) : (
      <input
        type={type}
        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        defaultValue={defaultValue}
      />
    )}
  </div>
);

const getActivityIcon = (type) => {
  switch (type) {
    case 'sale':
      return faShoppingCart;
    case 'listing':
      return faPencilAlt;
    case 'review':
      return faStar;
    default:
      return faStar;
  }
};

export default UserProfile;
