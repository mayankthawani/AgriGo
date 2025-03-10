import { Link } from "react-router-dom";
import { FaLeaf, FaTractor, FaMapMarkedAlt, FaStar, FaCheckCircle, FaUsers, FaQuoteLeft } from "react-icons/fa";
import { motion } from "framer-motion";


export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-900 to-green-800 text-white flex flex-col">
      
      {/* Navbar */}
      <nav className="fixed w-full z-50 backdrop-blur-md bg-green-800/90 flex justify-between items-center px-8 py-4 shadow-lg">
        <h1 className="text-3xl font-serif text-yellow-400 hover:scale-105 transition-transform">
          🌱 AgriGo
        </h1>
        <div className="space-x-4">
          <Link to="/login" className="px-6 py-2 bg-white/10 backdrop-blur-md text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300">
            Login
          </Link>
          <Link to="/signup" className="px-6 py-2 bg-yellow-400 text-green-900 font-semibold rounded-full hover:bg-yellow-300 transition-all duration-300 hover:shadow-lg">
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center h-screen text-center px-6 bg-cover bg-center" 
  style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?farm,agriculture')" }}>
  
  {/* Background Overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-green-900/70 to-green-800/90"></div>

  {/* Small Floating Images */}
  <img 
    src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=1989&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
    alt="Tractor"
    className="absolute top-10 left-10 w-24 h-24 rounded-full shadow-lg animate-pulse"
  />
  <img 
    src="https://media.istockphoto.com/id/1284378353/photo/young-indian-farmer-using-smartphone-in-cotton-field.jpg?s=1024x1024&w=is&k=20&c=Z35ItHTaLhHcvefWesXj72EQ9-vwvTaCS9pcBLP-r38=" 
    alt="Farmer"
    className="absolute top-40 right-10 w-28 h-28 rounded-full shadow-lg "
  />
  <img 
    src="https://media.istockphoto.com/id/484522704/photo/tractor-tire.jpg?s=1024x1024&w=is&k=20&c=_9s8JJlPMblgGRqczvEQSq1TZwbwDC79dhAVaRndakg=" 
    alt="Wheat"
    className="absolute bottom-20 left-20 w-24 h-24 rounded-full shadow-lg animate-spin"
  />

  {/* Main Content */}
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="relative z-10 flex flex-col items-center"
  >
    <motion.h2 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-5xl md:text-7xl font-serif leading-tight drop-shadow-lg bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400"
    >
      Smart Farming Starts Here: Equipment at Your Fingertips! 🚜
    </motion.h2>

    <p className="mt-6 text-xl text-gray-100 max-w-2xl">
      Rent, Buy, and Sell <span className="text-yellow-400 font-semibold">Farm Equipment</span> with 
      AI-powered <span className="text-yellow-400 font-semibold">Price Predictions</span> & 
      <span className="text-yellow-400 font-semibold"> Trusted Sellers</span>.
    </p>
    
    <Link 
      to="/signup" 
      className="mt-8 px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-green-900 font-bold text-lg rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105"
    >
      Get Started Today 🚀
    </Link>
  </motion.div>
</div>


      {/* Stats Section */}
      <div className="bg-green-800/50 backdrop-blur-md py-12">
        {/* How It Works Section */}
<div className="bg-green-800/50 backdrop-blur-md py-16">
  <div className="max-w-6xl mx-auto px-6 text-center">
    <h3 className="text-4xl font-bold text-yellow-400 mb-10">How AgriGo Works? 🚀</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} className="p-6 bg-green-900 rounded-lg shadow-lg">
        <FaUsers className="text-yellow-400 text-4xl mx-auto mb-4" />
        <h4 className="text-2xl font-semibold">1. Sign Up</h4>
        <p className="text-gray-300 mt-2">Create a free account and get started.</p>
      </motion.div>

      <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} className="p-6 bg-green-900 rounded-lg shadow-lg">
        <FaTractor className="text-yellow-400 text-4xl mx-auto mb-4" />
        <h4 className="text-2xl font-semibold">2. List or Rent Equipment</h4>
        <p className="text-gray-300 mt-2">Rent farm equipment or list your own for sale.</p>
      </motion.div>

      <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} className="p-6 bg-green-900 rounded-lg shadow-lg">
        <FaCheckCircle className="text-yellow-400 text-4xl mx-auto mb-4" />
        <h4 className="text-2xl font-semibold">3. Secure Payment</h4>
        <p className="text-gray-300 mt-2">Pay securely and get instant confirmation.</p>
      </motion.div>
    </div>
  </div>
</div>

      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-b from-green-800 to-green-700 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-4xl font-bold text-center mb-16 text-yellow-400">Our Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <FeatureCard icon={<FaLeaf size={40} />} title="AI-Powered Pricing" description="Get fair market prices for farm equipment using AI." />
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <FeatureCard icon={<FaUsers size={40} />} title="Trusted Sellers" description="Verified user ratings & trust scores for secure transactions." />
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <FeatureCard icon={<FaMapMarkedAlt size={40} />} title="Find Nearby Equipment" description="Easily locate farm machinery available near you." />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 bg-gradient-to-b from-green-700 to-green-800">
        <h3 className="text-4xl font-bold text-center text-yellow-400 mb-16">What Farmers Say</h3>
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
            <TestimonialCard name="Rajesh Kumar" feedback="AgriGo helped me rent a tractor at an affordable price! Highly recommended." />
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
            <TestimonialCard name="Meera Devi" feedback="I sold my old harvester through AgriGo and got the best market rate. Amazing platform!" />
          </motion.div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center py-20 bg-gradient-to-r from-yellow-400 to-yellow-500 text-green-900">
        <h3 className="text-4xl font-bold">Ready to Join AgriGo?</h3>
        <p className="text-xl mt-4">Sign up today and revolutionize farming with AI-powered tools! 🚀</p>
        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
          <Link to="/signup" className="inline-block mt-8 px-8 py-4 bg-green-900 text-white font-bold text-lg rounded-full hover:bg-green-800 transition-all duration-300 hover:shadow-xl">
            Sign Up Now
          </Link>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="text-center py-8 bg-green-900 text-gray-300">
        <p className="text-sm">© 2025 AgriGo | Empowering Farmers with Smart Solutions 🌱</p>
        <div className="mt-4 space-x-4">
          <Link className="hover:text-yellow-400 transition-colors" to="/privacy">Privacy Policy</Link>
          <Link className="hover:text-yellow-400 transition-colors" to="/terms">Terms of Service</Link>
          <Link className="hover:text-yellow-400 transition-colors" to="/contact">Contact Us</Link>
        </div>
      </footer>
    </div>
  );
}

const StatCard = ({ number, label }) => (
  <div className="text-center p-4">
    <h4 className="text-4xl font-bold text-yellow-400">{number}</h4>
    <p className="text-gray-300 mt-2">{label}</p>
  </div>
);

const FeatureCard = ({ icon, title, description }) => (
  <div className="p-8 bg-green-800/50 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
    <div className="text-yellow-400 mb-4">{icon}</div>
    <h3 className="text-2xl font-semibold mb-3">{title}</h3>
    <p className="text-gray-200">{description}</p>
  </div>
);

const TestimonialCard = ({ name, feedback }) => (
  <div className="p-8 bg-green-800/50 backdrop-blur-md rounded-2xl shadow-xl">
    <div className="text-yellow-400 mb-4"><FaQuoteLeft size={30} /></div>
    <p className="text-lg italic">{feedback}</p>
    <div className="mt-6 flex items-center">
      <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-green-900 font-bold text-xl">
        {name[0]}
      </div>
      <h4 className="ml-4 font-bold text-yellow-400">{name}</h4>
    </div>
  </div>
);
