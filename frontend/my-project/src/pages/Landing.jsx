import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaLeaf, FaTractor, FaMapMarkedAlt, FaUsers, FaGlobe, FaQuoteLeft, FaCheckCircle } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import '../i18n/i18n';

const Landing = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-900 to-green-800 text-white flex flex-col">
      
      {/* Language Selector */}
      <div className="fixed top-4 right-4 z-50">
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-lg p-2">
          <FaGlobe className="text-yellow-400" />
          <select 
            onChange={(e) => changeLanguage(e.target.value)}
            value={i18n.language}
            className="bg-transparent text-white outline-none cursor-pointer"
          >
            <option value="en" className="text-gray-800">English</option>
            <option value="hi" className="text-gray-800">हिंदी</option>
            <option value="mr" className="text-gray-800">मराठी</option>
          </select>
        </div>
      </div>

      {/* Navbar */}
      <nav className="fixed w-full z-40 backdrop-blur-md bg-green-800/90 flex justify-between items-center px-8 py-4 shadow-lg">
        <h1 className="text-3xl font-serif text-yellow-400 hover:scale-105 transition-transform">
          🌱 AgriGo
        </h1>
        <div className="space-x-4">
          <Link to="/login" className="px-6 py-2 bg-white/10 backdrop-blur-md text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300">
            {t('login')}
          </Link>
          <Link to="/signup" className="px-6 py-2 bg-yellow-400 text-green-900 font-semibold rounded-full hover:bg-yellow-300 transition-all duration-300 hover:shadow-lg">
            {t('signup')}
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
    className="absolute top-12 left-10 w-24 h-24 rounded-full shadow-lg animate-pulse"
  />
  <img 
    src="https://media.istockphoto.com/id/1284378353/photo/young-indian-farmer-using-smartphone-in-cotton-field.jpg?s=1024x1024&w=is&k=20&c=Z35ItHTaLhHcvefWesXj72EQ9-vwvTaCS9pcBLP-r38=" 
    alt="Farmer"
    className="absolute top-50 right-10 w-28 h-28 rounded-full shadow-lg "
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
      {t('welcome')}
    </motion.h2>

    <p className="mt-6 text-xl text-gray-100 max-w-2xl">
      {t('subtitle')}
    </p>
    
    <Link 
      to="/signup" 
      className="mt-8 px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-green-900 font-bold text-lg rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105"
    >
      {t('getStarted')}
    </Link>
  </motion.div>
</div>


      {/* Stats Section */}
      <div className="bg-green-800/50 backdrop-blur-md py-12">
        {/* How It Works Section */}
<div className="bg-green-800/50 backdrop-blur-md py-16">
  <div className="max-w-6xl mx-auto px-6 text-center">
    <h3 className="text-4xl font-bold text-yellow-400 mb-10">{t('howItWorks.title')}</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} className="p-6 bg-green-900 rounded-lg shadow-lg">
        <FaUsers className="text-yellow-400 text-4xl mx-auto mb-4" />
        <h4 className="text-2xl font-semibold">{t('howItWorks.step1.title')}</h4>
        <p className="text-gray-300 mt-2">{t('howItWorks.step1.description')}</p>
      </motion.div>

      <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} className="p-6 bg-green-900 rounded-lg shadow-lg">
        <FaTractor className="text-yellow-400 text-4xl mx-auto mb-4" />
        <h4 className="text-2xl font-semibold">{t('howItWorks.step2.title')}</h4>
        <p className="text-gray-300 mt-2">{t('howItWorks.step2.description')}</p>
      </motion.div>

      <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} className="p-6 bg-green-900 rounded-lg shadow-lg">
        <FaCheckCircle className="text-yellow-400 text-4xl mx-auto mb-4" />
        <h4 className="text-2xl font-semibold">{t('howItWorks.step3.title')}</h4>
        <p className="text-gray-300 mt-2">{t('howItWorks.step3.description')}</p>
      </motion.div>
    </div>
  </div>
</div>

      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-b from-green-800 to-green-700 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-4xl font-bold text-center mb-16 text-yellow-400">{t('whyJoin')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <FeatureCard icon={<FaLeaf size={40} />} title={t('features.access.title')} description={t('features.access.description')} />
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <FeatureCard icon={<FaUsers size={40} />} title={t('features.secure.title')} description={t('features.secure.description')} />
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <FeatureCard icon={<FaMapMarkedAlt size={40} />} title={t('features.community.title')} description={t('features.community.description')} />
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
        <p className="text-xl mt-4">Sign up today and revolutionize farming with AI-powered tools! </p>
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
};

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

export default Landing;
