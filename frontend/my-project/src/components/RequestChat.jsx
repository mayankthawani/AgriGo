import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RequestChat = ({ requestId, otherUserName }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchMessages();
  }, [requestId]);

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
    try {
      await axios.post(
        `http://localhost:5000/api/equipment/rental-requests/${requestId}/messages`,
        { content: newMessage },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewMessage('');
      fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4">Chat with {otherUserName}</h3>
      <div className="h-64 overflow-y-auto mb-4 p-2 border rounded">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 ${msg.isOwn ? 'text-right' : ''}`}>
            <div className={`inline-block p-2 rounded-lg ${
              msg.isOwn ? 'bg-green-100' : 'bg-gray-100'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-2 border rounded"
          placeholder="Type your message here..."
        />
        <button 
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default RequestChat;
