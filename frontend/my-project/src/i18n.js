import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        dashboard: {
          title: "AgriGo",
          welcome: "Welcome back",
          searchEquipment: "Search Equipment",
          addEquipment: "Add Equipment",
          aiPricing: "Predict Price",
          chatSupport: "Chat Support",
          profile: "Profile",
          activeBookings: "Active Bookings",
          totalRentals: "Total Rentals",
          availableEquipment: "Available Equipment",
        },
        loading: "Loading...",
      },
    },
    hi: {
      translation: {
        dashboard: {
          title: "एग्रीगो",
          welcome: "वापस स्वागत है",
          searchEquipment: "उपकरण खोजें",
          addEquipment: "उपकरण जोड़ें",
          aiPricing: "कीमत की भविष्यवाणी करें",
          chatSupport: "चैट समर्थन",
          profile: "प्रोफ़ाइल",
          activeBookings: "सक्रिय बुकिंग",
          totalRentals: "कुल किराये",
          availableEquipment: "उपलब्ध उपकरण",
        },
        loading: "लोड हो रहा है...",
      },
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
