import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          'Welcome': 'Welcome',
          'Active Bookings': 'Active Bookings',
          'Loading': 'Loading',
          'Requests': 'Rental Requests',
          'Your Rentals': 'Your Rentals',
          'Search Equipment': 'Search Equipment',
          'Add Equipment': 'Add Equipment',
          'Chat Support': 'Chat Support',
          'Profile': 'Profile',
          'dashboard.rentals.owner': 'Owner',
          'dashboard.rentals.rentalPeriod': 'Rental Period',
          'dashboard.rentals.status': 'Status',
          'dashboard.rentals.noEquipment': 'No equipment rented yet',
          'dashboard.requests.received': 'Received Requests',
          'dashboard.requests.sent': 'Sent Requests',
          'dashboard.requests.from': 'From',
          'dashboard.requests.email': 'Email',
          'dashboard.requests.price': 'Price',
          'dashboard.requests.message': 'Message',
          'dashboard.requests.actions.accept': 'Accept',
          'dashboard.requests.actions.reject': 'Reject',
          'dashboard.requests.actions.chat': 'Open Chat'
        }
      },
      hi: {
        translation: {
          'Welcome': 'स्वागत है',
          'Active Bookings': 'सक्रिय बुकिंग',
          'Loading': 'लोड हो रहा है',
          'Requests': 'किराये के अनुरोध',
          'Your Rentals': 'आपके किराए',
          'Search Equipment': 'उपकरण खोजें',
          'Add Equipment': 'उपकरण जोड़ें',
          'Chat Support': 'चैट सहायता',
          'Profile': 'प्रोफ़ाइल',
          'dashboard.rentals.owner': 'मालिक',
          'dashboard.rentals.rentalPeriod': 'किराये की अवधि',
          'dashboard.rentals.status': 'स्थिति',
          'dashboard.rentals.noEquipment': 'अभी तक कोई उपकरण किराए पर नहीं लिया',
          'dashboard.requests.received': 'प्राप्त अनुरोध',
          'dashboard.requests.sent': 'भेजे गए अनुरोध',
          'dashboard.requests.from': 'से',
          'dashboard.requests.email': 'ईमेल',
          'dashboard.requests.price': 'कीमत',
          'dashboard.requests.message': 'संदेश',
          'dashboard.requests.actions.accept': 'स्वीकार करें',
          'dashboard.requests.actions.reject': 'अस्वीकार करें',
          'dashboard.requests.actions.chat': 'चैट खोलें'
        }
      },
      mr: {
        translation: {
          'Welcome': 'स्वागत आहे',
          'Active Bookings': 'सक्रिय बुकिंग',
          'Loading': 'लोड होत आहे',
          'Requests': 'भाड्याच्या विनंत्या',
          'Your Rentals': 'तुमची भाडी',
          'Search Equipment': 'उपकरणे शोधा',
          'Add Equipment': 'उपकरण जोडा',
          'Chat Support': 'चॅट सपोर्ट',
          'Profile': 'प्रोफाइल',
          'dashboard.rentals.owner': 'मालक',
          'dashboard.rentals.rentalPeriod': 'भाड्याचा कालावधी',
          'dashboard.rentals.status': 'स्थिती',
          'dashboard.rentals.noEquipment': 'अजून कोणतेही उपकरण भाड्याने घेतले नाही',
          'dashboard.requests.received': 'प्राप्त विनंत्या',
          'dashboard.requests.sent': 'पाठवलेल्या विनंत्या',
          'dashboard.requests.from': 'कडून',
          'dashboard.requests.email': 'ईमेल',
          'dashboard.requests.price': 'किंमत',
          'dashboard.requests.message': 'संदेश',
          'dashboard.requests.actions.accept': 'स्वीकारा',
          'dashboard.requests.actions.reject': 'नाकारा',
          'dashboard.requests.actions.chat': 'चॅट उघडा'
        }
      }
    },
    lng: localStorage.getItem('language') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;