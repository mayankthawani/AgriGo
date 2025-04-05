import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaGlobe } from 'react-icons/fa';

const LanguageSelector = ({ className }) => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <FaGlobe className="text-yellow-400" />
      <select 
        onChange={(e) => changeLanguage(e.target.value)}
        value={i18n.language}
        className="bg-transparent outline-none cursor-pointer"
      >
        <option value="en" className="text-gray-800">English</option>
        <option value="hi" className="text-gray-800">हिंदी</option>
        <option value="mr" className="text-gray-800">मराठी</option>
      </select>
    </div>
  );
};

export default LanguageSelector;