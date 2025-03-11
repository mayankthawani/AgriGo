import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard";
import SearchEquipment from "./pages/SearchEquipment";
import AddEquipment from "./pages/AddEquipment";
import Userprofile from "./pages/Userprofile";
import AIPricing from "./pages/AIPricing";
import ChatSupportInterface from "./pages/ChatSupportInterface";
import BookEquipment from "./pages/BookEquipment";
import EquipmentList from "./components/EquipmentList";
import Payment from "./pages/Payment";
import LanguageSwitcher from "./components/LanguageSwitcher"; // ✅ Import Language Switcher
import "./i18n"; // ✅ Import i18n configuration

function App() {
  return (
    <div>
      {/* ✅ Add Language Switcher */}
      <div className="p-4 bg-gray-100 text-right">
        <LanguageSwitcher />
      </div>

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/search-equipment" element={<SearchEquipment />} />
        <Route path="/add-equipment" element={<AddEquipment />} />
        <Route path="/user-profile" element={<Userprofile />} />
        <Route path="/ai-pricing" element={<AIPricing />} />
        <Route path="/chatsupport" element={<ChatSupportInterface />} />
        <Route path="/book-equipment" element={<BookEquipment />} />
        <Route path="/equipment-list" element={<EquipmentList />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </div>
  );
}

export default App;
