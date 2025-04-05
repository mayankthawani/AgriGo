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
import SendRequest from './pages/SendRequest';
import FarmerChat from './pages/FarmerChat';

function App() {
  return (
    <div>
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
        <Route path="/send-request/:equipmentId" element={<SendRequest />} />
        <Route path="/farmer-chat/:requestId" element={<FarmerChat />} />
      </Routes>
    </div>
  );
}

export default App;
