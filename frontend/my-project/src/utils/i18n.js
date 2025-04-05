import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "BOOK_FARM_EQUIPMENT": "Book Farm Equipment",
      "FIND_PERFECT_EQUIPMENT": "Find the perfect equipment for your farming needs",
      "SEARCH_PLACEHOLDER": "Search equipment by type...",
      "TYPE": "Type",
      "OWNER": "Owner",
      "LOCATION": "Location",
      "PRICE_PER_DAY": "Price per Day",
      "UNKNOWN": "Unknown",
      "SEND_REQUEST": "Send Request",
      "NO_EQUIPMENT_FOUND": "No equipment found",
      "ADJUST_SEARCH": "Try adjusting your search criteria",
      "BOOK_EQUIPMENT": "Book Equipment",
      "START_DATE": "Start Date",
      "END_DATE": "End Date",
      "TOTAL_DAYS": "Total Days",
      "TOTAL_PRICE": "Total Price",
      "CANCEL": "Cancel",
      "CONFIRM_BOOKING": "Confirm Booking"
    }
  },
  hi: {
    translation: {
      "BOOK_FARM_EQUIPMENT": "कृषि उपकरण बुक करें",
      "FIND_PERFECT_EQUIPMENT": "अपनी खेती की जरूरतों के लिए सही उपकरण खोजें",
      "SEARCH_PLACEHOLDER": "प्रकार द्वारा उपकरण खोजें...",
      "TYPE": "प्रकार",
      "OWNER": "मालिक",
      "LOCATION": "स्थान",
      "PRICE_PER_DAY": "प्रति दिन मूल्य",
      "UNKNOWN": "अज्ञात",
      "SEND_REQUEST": "अनुरोध भेजें",
      "NO_EQUIPMENT_FOUND": "कोई उपकरण नहीं मिला",
      "ADJUST_SEARCH": "अपनी खोज मानदंडों को समायोजित करने का प्रयास करें",
      "BOOK_EQUIPMENT": "उपकरण बुक करें",
      "START_DATE": "आरंभ तिथि",
      "END_DATE": "अंतिम तिथि",
      "TOTAL_DAYS": "कुल दिन",
      "TOTAL_PRICE": "कुल मूल्य",
      "CANCEL": "रद्द करें",
      "CONFIRM_BOOKING": "बुकिंग की पुष्टि करें"
    }
  },
  mr: {
    translation: {
      "BOOK_FARM_EQUIPMENT": "शेती उपकरणे बुक करा",
      "FIND_PERFECT_EQUIPMENT": "तुमच्या शेतीसाठी योग्य उपकरणे शोधा",
      "SEARCH_PLACEHOLDER": "प्रकारानुसार उपकरणे शोधा...",
      "TYPE": "प्रकार",
      "OWNER": "मालक",
      "LOCATION": "स्थान",
      "PRICE_PER_DAY": "प्रति दिवस किंमत",
      "UNKNOWN": "अज्ञात",
      "SEND_REQUEST": "विनंती पाठवा",
      "NO_EQUIPMENT_FOUND": "कोणतीही उपकरणे सापडली नाहीत",
      "ADJUST_SEARCH": "तुमचे शोध निकष समायोजित करण्याचा प्रयत्न करा",
      "BOOK_EQUIPMENT": "उपकरण बुक करा",
      "START_DATE": "सुरुवात तारीख",
      "END_DATE": "शेवटची तारीख",
      "TOTAL_DAYS": "एकूण दिवस",
      "TOTAL_PRICE": "एकूण किंमत",
      "CANCEL": "रद्द करा",
      "CONFIRM_BOOKING": "बुकिंग निश्चित करा"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;