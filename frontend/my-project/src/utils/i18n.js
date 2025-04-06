import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const resources = {
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
      "CONFIRM_BOOKING": "Confirm Booking",
      'Welcome': 'Welcome',
      'dashboard.requests.actions.chat': 'Open Chat',
      "DASHBOARD": {
        "WELCOME": "Welcome",
        "ACTIVE_BOOKINGS": "Active Bookings",
        "SEARCH_EQUIPMENT": "Search Equipment",
        "ADD_EQUIPMENT": "Add Equipment",
        "CHAT_SUPPORT": "Chat Support",
        "PROFILE": "Profile",
        "LOADING": "Loading",
        "STATS": {
          "ACTIVE_BOOKINGS": "Active Bookings",
          "RECEIVED_REQUESTS": "Received Requests"
        },
        "RENTALS": {
          "TITLE": "Your Rentals",
          "OWNER": "Owner",
          "RENTAL_PERIOD": "Rental Period",
          "STATUS": "Status",
          "NO_EQUIPMENT": "No equipment rented yet"
        },
        "REQUESTS": {
          "RECEIVED": "Received Requests",
          "SENT": "Sent Requests",
          "FROM": "From",
          "EMAIL": "Email",
          "PRICE": "Price",
          "MESSAGE": "Message",
          "STATUS": "Status",
          "OWNER": "Owner",
          "ACTIONS": {
            "ACCEPT": "Accept",
            "REJECT": "Reject",
            "CHAT": "Open Chat",
            "RATE": "Rate Equipment"
          },
          "REQUEST_REJECTED": "Request rejected",
          "PRICE_PER_DAY": "/day"
        }
      },
      "LOGIN": {
        "WELCOME": "Welcome Back!",
        "SUBTITLE": "Continue your farming journey with AgriGo",
        "EMAIL": "Email Address",
        "EMAIL_PLACEHOLDER": "Enter your email",
        "PASSWORD": "Password",
        "PASSWORD_PLACEHOLDER": "Enter your password",
        "REMEMBER_ME": "Remember me",
        "FORGOT_PASSWORD": "Forgot password?",
        "SIGN_IN": "Sign in",
        "OR_CONTINUE": "Or continue with",
        "NOT_REGISTERED": "Not registered yet?",
        "CREATE_ACCOUNT": "Create an Account",
        "LOGIN_SUCCESS": "Login Successful!",
        "ERROR": "Something went wrong!"
      }
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
      "CONFIRM_BOOKING": "बुकिंग की पुष्टि करें",
      'Welcome': 'स्वागत है',
      'dashboard.requests.actions.chat': 'चैट खोलें',
      "DASHBOARD": {
        "WELCOME": "स्वागत है",
        "ACTIVE_BOOKINGS": "सक्रिय बुकिंग",
        "SEARCH_EQUIPMENT": "उपकरण खोजें",
        "ADD_EQUIPMENT": "उपकरण जोड़ें",
        "CHAT_SUPPORT": "चैट सहायता",
        "PROFILE": "प्रोफ़ाइल",
        "LOADING": "लोड हो रहा है",
        "STATS": {
          "ACTIVE_BOOKINGS": "सक्रिय बुकिंग",
          "RECEIVED_REQUESTS": "प्राप्त अनुरोध"
        },
        "RENTALS": {
          "TITLE": "आपके किराए",
          "OWNER": "मालिक",
          "RENTAL_PERIOD": "किराये की अवधि",
          "STATUS": "स्थिति",
          "NO_EQUIPMENT": "अभी तक कोई उपकरण किराए पर नहीं लिया"
        },
        "REQUESTS": {
          "RECEIVED": "प्राप्त अनुरोध",
          "SENT": "भेजे गए अनुरोध",
          "FROM": "से",
          "EMAIL": "ईमेल",
          "PRICE": "कीमत",
          "MESSAGE": "संदेश",
          "STATUS": "स्थिति",
          "OWNER": "मालिक",
          "ACTIONS": {
            "ACCEPT": "स्वीकार करें",
            "REJECT": "अस्वीकार करें",
            "CHAT": "चैट खोलें",
            "RATE": "उपकरण रेट करें"
          },
          "REQUEST_REJECTED": "अनुरोध अस्वीकृत",
          "PRICE_PER_DAY": "/दिन"
        }
      },
      "LOGIN": {
        "WELCOME": "वापस स्वागत है!",
        "SUBTITLE": "AgriGo के साथ अपनी कृषि यात्रा जारी रखें",
        "EMAIL": "ईमेल पता",
        "EMAIL_PLACEHOLDER": "अपना ईमेल दर्ज करें",
        "PASSWORD": "पासवर्ड",
        "PASSWORD_PLACEHOLDER": "अपना पासवर्ड दर्ज करें",
        "REMEMBER_ME": "मुझे याद रखें",
        "FORGOT_PASSWORD": "पासवर्ड भूल गए?",
        "SIGN_IN": "साइन इन करें",
        "OR_CONTINUE": "या जारी रखें",
        "NOT_REGISTERED": "अभी तक पंजीकृत नहीं हैं?",
        "CREATE_ACCOUNT": "खाता बनाएं",
        "LOGIN_SUCCESS": "लॉगिन सफल!",
        "ERROR": "कुछ गलत हो गया!"
      }
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
      "CONFIRM_BOOKING": "बुकिंग निश्चित करा",
      'Welcome': 'स्वागत आहे',
      'dashboard.requests.actions.chat': 'चॅट उघडा',
      "DASHBOARD": {
        "WELCOME": "स्वागत आहे",
        "ACTIVE_BOOKINGS": "सक्रिय बुकिंग",
        "SEARCH_EQUIPMENT": "उपकरणे शोधा",
        "ADD_EQUIPMENT": "उपकरण जोडा",
        "CHAT_SUPPORT": "चॅट सपोर्ट",
        "PROFILE": "प्रोफाइल",
        "LOADING": "लोड होत आहे",
        "STATS": {
          "ACTIVE_BOOKINGS": "सक्रिय बुकिंग",
          "RECEIVED_REQUESTS": "प्राप्त विनंत्या"
        },
        "RENTALS": {
          "TITLE": "तुमची भाडी",
          "OWNER": "मालक",
          "RENTAL_PERIOD": "भाड्याचा कालावधी",
          "STATUS": "स्थिती",
          "NO_EQUIPMENT": "अजून कोणतेही उपकरण भाड्याने घेतले नाही"
        },
        "REQUESTS": {
          "RECEIVED": "प्राप्त विनंत्या",
          "SENT": "पाठवलेल्या विनंत्या",
          "FROM": "कडून",
          "EMAIL": "ईमेल",
          "PRICE": "किंमत",
          "MESSAGE": "संदेश",
          "STATUS": "स्थिती",
          "OWNER": "मालक",
          "ACTIONS": {
            "ACCEPT": "स्वीकारा",
            "REJECT": "नाकारा",
            "CHAT": "चॅट उघडा",
            "RATE": "उपकरण रेट करा"
          },
          "REQUEST_REJECTED": "विनंती नाकारली",
          "PRICE_PER_DAY": "/दिवस"
        }
      },
      "LOGIN": {
        "WELCOME": "पुन्हा स्वागत आहे!",
        "SUBTITLE": "AgriGo सोबत तुमचा शेती प्रवास सुरू ठेवा",
        "EMAIL": "ईमेल पत्ता",
        "EMAIL_PLACEHOLDER": "तुमचा ईमेल टाका",
        "PASSWORD": "पासवर्ड",
        "PASSWORD_PLACEHOLDER": "तुमचा पासवर्ड टाका",
        "REMEMBER_ME": "माझी माहिती लक्षात ठेवा",
        "FORGOT_PASSWORD": "पासवर्ड विसरलात?",
        "SIGN_IN": "साइन इन करा",
        "OR_CONTINUE": "किंवा सुरू ठेवा",
        "NOT_REGISTERED": "अजून नोंदणी केली नाही?",
        "CREATE_ACCOUNT": "खाते तयार करा",
        "LOGIN_SUCCESS": "लॉगिन यशस्वी!",
        "ERROR": "काहीतरी चूक झाली!"
      }
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