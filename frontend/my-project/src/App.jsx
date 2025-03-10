import { Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import SignUp from './pages/auth/SignUp';
import Login from './pages/auth/Login';
import Dashboard from './pages/Dashboard';
import SearchEquipment from './pages/SearchEquipment';
import AddEquipment from './pages/AddEquipment';
import ChatSupportInterface from './pages/ChatSupportInterface';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path="/search-equipment" element={<SearchEquipment />} />
      <Route path="/add-equipment" element={<AddEquipment />} />
      <Route path="/chat-support" element={<ChatSupportInterface />} />
    </Routes>
  );

  
}

export default App;
