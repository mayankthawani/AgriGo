import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import socketService from '../services/socket';

const FarmerChat = () => {
  const { requestId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [otherFarmer, setOtherFarmer] = useState({});
  const [request, setRequest] = useState(null);
  const token = localStorage.getItem('token');
  const socket = useRef(null);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    startDate: '',
    endDate: '',
    days: 0,
  });

  useEffect(() => {
    socket.current = socketService.connect(token);
    socket.current.emit('join_chat', requestId);

    // Listen for new messages from others
    socket.current.on('new_message', (message) => {
      setMessages(prev => [...prev, message]);
    });

    // Listen for confirmation of our own messages
    socket.current.on('message_confirmation', (message) => {
      setMessages(prev => [...prev, message]);
    });

    socket.current.on('message_error', (error) => {
      console.error('Message error:', error);
      alert('Failed to send message');
    });

    fetchMessages();
    fetchRequestDetails();

    return () => {
      socket.current.off('new_message');
      socket.current.off('message_confirmation');
      socket.current.off('message_error');
      socketService.disconnect();
    };
  }, [requestId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchRequestDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/equipment/rental-requests/${requestId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (response.data) {
        setRequest(response.data.request);
        setOtherFarmer(response.data.otherFarmer);
      } else {
        console.error('Invalid response format:', response.data);
      }
    } catch (error) {
      console.error('Error fetching request details:', error.response?.data || error.message);
      alert('Error loading chat. Please try again.');
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/equipment/rental-requests/${requestId}/messages`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      socket.current.emit('send_message', {
        requestId,
        content: newMessage.trim()
      });

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message');
    }
  };

  const calculateDays = () => {
    if (bookingDetails.startDate && bookingDetails.endDate) {
      const start = new Date(bookingDetails.startDate);
      const end = new Date(bookingDetails.endDate);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      setBookingDetails(prev => ({ ...prev, days }));
    }
  };

  useEffect(() => {
    calculateDays();
  }, [bookingDetails.startDate, bookingDetails.endDate]);

  const handlePayment = () => {
    if (!bookingDetails.startDate || !bookingDetails.endDate) {
      alert('Please select rental dates');
      return;
    }
    if (bookingDetails.days <= 0) {
      alert('Invalid date range');
      return;
    }
    if (socket.current) {
      socket.current.disconnect();
    }
    navigate(`/payment?equipmentId=${request?.equipmentId._id}&days=${bookingDetails.days}&total=${request?.proposedPrice * bookingDetails.days}&startDate=${bookingDetails.startDate}&endDate=${bookingDetails.endDate}&requestId=${requestId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg">
        <div className="border-b p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">
            Chat with {otherFarmer?.name || 'Farmer'}
          </h2>
          <button
            onClick={() => setShowBookingForm(true)}
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
          >
            Book Equipment
          </button>
        </div>
        
        {/* Booking Form Modal */}
        {showBookingForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">Select Rental Dates</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Start Date</label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={bookingDetails.startDate}
                    onChange={(e) => setBookingDetails(prev => ({ ...prev, startDate: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">End Date</label>
                  <input
                    type="date"
                    min={bookingDetails.startDate || new Date().toISOString().split('T')[0]}
                    value={bookingDetails.endDate}
                    onChange={(e) => setBookingDetails(prev => ({ ...prev, endDate: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                {bookingDetails.days > 0 && (
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Rental Duration: {bookingDetails.days} days</p>
                    <p className="text-lg font-bold text-green-700">
                      Total Amount: ₹{(request?.proposedPrice * bookingDetails.days).toFixed(2)}
                    </p>
                  </div>
                )}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => setShowBookingForm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlePayment}
                    className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    Proceed to Payment
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="h-[600px] overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[70%] p-3 rounded-lg ${
                msg.isOwn ? 'bg-green-500 text-white' : 'bg-gray-100'
              }`}>
                <p>{msg.content}</p>
                <span className="text-xs opacity-75">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={sendMessage} className="border-t p-4 flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            placeholder="Type your message..."
          />
          <button 
            type="submit"
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default FarmerChat;
