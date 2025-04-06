import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaArrowRight, FaTractor, FaGlobe } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import '../../i18n';

const Login = () => {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", formData);
  
      console.log("Full Response:", response.data);  // Debugging line
  
      if (!response.data.token) {
        throw new Error("Token is missing in response");
      }
  
      alert("Login Successful!");
  
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
  
      navigate("/dashboard");
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Language Selector */}
      <div className="fixed top-4 right-4 flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-md">
        <FaGlobe className="text-green-600" />
        <select 
          onChange={(e) => changeLanguage(e.target.value)}
          value={i18n.language}
          className="bg-transparent outline-none cursor-pointer text-gray-700"
        >
          <option value="en">English</option>
          <option value="hi">हिंदी</option>
          <option value="mr">मराठी</option>
        </select>
      </div>

      <div className="max-w-md w-full space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <FaTractor className="mx-auto h-16 w-16 text-green-600" />
          <h2 className="mt-6 text-4xl font-extrabold text-gray-900">{t('LOGIN.WELCOME')}</h2>
          <p className="mt-2 text-sm text-gray-600">
            {t('LOGIN.SUBTITLE')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-8 rounded-2xl shadow-xl space-y-6"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">{t('LOGIN.EMAIL')}</label>
              <div className="mt-1 relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  placeholder={t('LOGIN.EMAIL_PLACEHOLDER')}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">{t('LOGIN.PASSWORD')}</label>
              <div className="mt-1 relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  placeholder={t('LOGIN.PASSWORD_PLACEHOLDER')}
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <label className="ml-2 block text-sm text-gray-700">{t('LOGIN.REMEMBER_ME')}</label>
              </div>
              <a href="#" className="text-sm font-medium text-green-600 hover:text-green-500">
                {t('LOGIN.FORGOT_PASSWORD')}
              </a>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white font-medium ${
                loading ? "bg-green-400" : "bg-green-600 hover:bg-green-700"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200`}
            >
              {loading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              ) : (
                <>
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <FaArrowRight className="h-5 w-5 text-green-100 group-hover:text-green-200" />
                  </span>
                  {t('LOGIN.SIGN_IN')}
                </>
              )}
            </motion.button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">{t('LOGIN.OR_CONTINUE')}</span>
              </div>
            </div>
          </div>
        </motion.div>

        <p className="mt-8 text-center text-sm text-gray-600">
          {t('LOGIN.NOT_REGISTERED')}{" "}
          <a href="/signup" className="font-medium text-green-600 hover:text-green-500">
            {t('LOGIN.CREATE_ACCOUNT')}
          </a>
        </p>
      </div>
    </div>
  );
};

const SocialButton = ({ icon }) => (
  <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
    <img src={`/icons/${icon}.svg`} alt={icon} className="h-5 w-5" />
  </button>
);

export default Login;
