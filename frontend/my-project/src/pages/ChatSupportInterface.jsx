import React, { useState, useRef, useEffect } from 'react';
import { FaMicrophone, FaStop, FaPaperPlane, FaSmile, FaSearch, FaPaperclip, FaEllipsisV, FaCheck, FaCheckDouble } from 'react-icons/fa';
import { BsThreeDots } from "react-icons/bs";
import EmojiPicker from 'emoji-picker-react';

const ChatSupportInterface = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const farmerInfo = {
    name: "John Smith",
    location: "Karnataka, India",
    expertise: "Organic Farming",
    avatar: "JS"
  };

  const otherFarmer = {
    name: "Raj Kumar",
    location: "Tamil Nadu, India",
    expertise: "Rice Cultivation",
    avatar: "RK"
  };

  const equipmentCategories = {
    tractors: ['tractor', 'cultivator', 'rotavator'],
    harvesters: ['harvester', 'combine', 'reaper'],
    irrigation: ['pump', 'sprinkler', 'drip'],
    sprayers: ['sprayer', 'duster', 'fogger'],
    seeders: ['seeder', 'planter', 'drill'],
  };

  const equipmentDetails = {
    "Mahindra 575": {
      type: "Tractor",
      hp: "47 HP",
      rateDay: 2000,
      rateHour: 300,
      availability: "Available from 15th Oct"
    },
    "John Deere 5310": {
      type: "Tractor",
      hp: "55 HP",
      rateDay: 2500,
      rateHour: 350,
      availability: "Available now"
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const onEmojiClick = (emojiObject) => {
    setNewMessage(prev => prev + emojiObject.emoji);
  };

  const farmingTopics = {
    crops: {
      rice: ['paddy', 'rice', 'basmati', 'SRI method'],
      wheat: ['wheat', 'grain', 'rabi crop'],
      vegetables: ['vegetable', 'tomato', 'potato', 'onion'],
      pulses: ['dal', 'pulse', 'lentil', 'beans']
    },
    techniques: {
      organic: ['organic', 'natural', 'chemical-free'],
      irrigation: ['water', 'irrigation', 'drip', 'sprinkler'],
      pest_control: ['pest', 'disease', 'control', 'spray']
    }
  };

  const getFarmerResponse = (message) => {
    const rentalPatterns = {
      inquiry: {
        condition: /available|rent|hire|when|cost|price|rate/i,
        responses: [
          `I have a ${Object.keys(equipmentDetails)[0]} available for rent:
- Daily rate: ₹${equipmentDetails["Mahindra 575"].rateDay}
- Hourly rate: ₹${equipmentDetails["Mahindra 575"].rateHour}
- ${equipmentDetails["Mahindra 575"].availability}
- Includes operator
- Fuel cost extra
Would you like to book it?`,
          `I can rent out my ${Object.keys(equipmentDetails)[1]}:
- Specifications: ${equipmentDetails["John Deere 5310"].hp}
- Rate: ₹${equipmentDetails["John Deere 5310"].rateDay}/day
- ${equipmentDetails["John Deere 5310"].availability}
- Insurance included
Interested?`
        ]
      },
      booking: {
        condition: /book|confirm|reserve|when can|schedule/i,
        responses: [
          "Great! To confirm the booking, please provide:\n1. Rental date\n2. Duration needed\n3. Your location\n4. Purpose\n\nI'll also share my equipment papers and insurance details.",
          "Sure! Let's proceed with the booking. I need:\n- Preferred dates\n- Usage duration\n- Delivery location\n\nI can also show you previous rental feedback and maintenance records."
        ]
      },
      negotiation: {
        condition: /reduce|discount|lower|best price|negotiate/i,
        responses: [
          "For longer duration rentals (>5 days), I can offer:\n- 15% discount on daily rate\n- Free transportation\n- Flexible timing\nShall we discuss the details?",
          "I can work out a better rate if you:\n- Book for multiple days\n- Share fuel costs\n- Pick up from my location\nWhat works for you?"
        ]
      },
      payment: {
        condition: /payment|pay|advance|security|deposit/i,
        responses: [
          "My rental terms are:\n- 30% advance booking\n- Security deposit: ₹10,000\n- Balance before equipment handover\n- Online payment preferred\nAll transactions through AgriGo platform for security.",
          "Standard payment terms:\n- Booking amount: 25%\n- Refundable deposit\n- Daily payment option available\n- Platform-secured transaction"
        ]
      }
    };

    // Identify topic and context
    let response = "I have farming equipment available for rent. Please ask about:\n- Available equipment\n- Rental rates\n- Booking process\n- Payment terms";

    Object.keys(rentalPatterns).forEach(category => {
      if (rentalPatterns[category].condition.test(message)) {
        const responses = rentalPatterns[category].responses;
        response = responses[Math.floor(Math.random() * responses.length)];
      }
    });

    return response;
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, type: 'user' }]);
      setNewMessage('');
      setIsTyping(true);
      
      // Simulate natural typing delay
      const response = getFarmerResponse(newMessage);
      const typingDelay = Math.min(1500, response.length * 20);
      
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, { 
          text: response,
          type: 'other' 
        }]);
      }, typingDelay);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setMessages(prev => [...prev, { audio: audioUrl, type: 'user' }]);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setMessages(prev => [...prev, { 
        file: { name: file.name, url, type: file.type },
        type: 'user'
      }]);
    }
  };

  const filteredMessages = messages.filter(msg => 
    msg.text?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-green-50 to-gray-50">
      <div className="p-4 bg-white shadow-lg border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-600 to-green-700 flex items-center justify-center">
                <span className="text-white font-bold text-lg">{otherFarmer.avatar}</span>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold">{otherFarmer.name}</h1>
              <div className="flex flex-col text-sm text-gray-500">
                <span>{otherFarmer.location}</span>
                <span className="text-green-600">{otherFarmer.expertise}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {showSearch && (
              <input
                type="text"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-2 rounded-lg border focus:ring-2 focus:ring-blue-300"
              />
            )}
            <button onClick={() => setShowSearch(!showSearch)} className="p-2 hover:bg-gray-100 rounded-full">
              <FaSearch className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <FaEllipsisV className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto">
        {(searchQuery ? filteredMessages : messages).map((message, index) => (
          <div key={index} className={`flex items-start space-x-2 mb-4 ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              message.type === 'user' 
                ? 'bg-gradient-to-r from-green-600 to-green-700' 
                : 'bg-gradient-to-r from-green-700 to-green-800'
            }`}>
              <span className="text-white text-sm">
                {message.type === 'user' ? farmerInfo.avatar : otherFarmer.avatar}
              </span>
            </div>
            <div className={`flex flex-col ${message.type === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`rounded-2xl p-3 max-w-[70%] ${
                message.type === 'user' 
                  ? 'bg-gradient-to-r from-green-600 to-green-700 text-white rounded-tr-none' 
                  : 'bg-white shadow-sm rounded-tl-none border'
              }`}>
                {message.text ? (
                  <p className="break-words">{message.text}</p>
                ) : message.audio ? (
                  <audio src={message.audio} controls className="w-full" />
                ) : message.file && (
                  <div className="flex items-center space-x-2">
                    <FaPaperclip />
                    <a href={message.file.url} download className="underline">{message.file.name}</a>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs text-gray-500">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                {message.type === 'user' && (
                  <FaCheckDouble className="text-blue-500 text-xs" />
                )}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-center space-x-2 text-gray-500">
            <BsThreeDots className="animate-bounce" />
            <span className="text-sm">Farmer is typing...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t shadow-lg">
        <form onSubmit={sendMessage} className="relative flex gap-2">
          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="p-2 text-gray-500 hover:text-gray-700"
          >
            <FaSmile />
          </button>
          {showEmojiPicker && (
            <div className="absolute bottom-full mb-2">
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-gray-500 hover:text-gray-700"
          >
            <FaPaperclip />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileUpload}
          />
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 p-3 border rounded-full bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent shadow-sm"
            placeholder="Ask about equipment rental..."
          />
          <button
            type="submit"
            className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
          >
            <FaPaperPlane />
          </button>
          <button
            type="button"
            onClick={isRecording ? stopRecording : startRecording}
            className={`p-3 rounded-full transition-colors ${
              isRecording 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-green-500 hover:bg-green-600'
            } text-white`}
          >
            {isRecording ? <FaStop /> : <FaMicrophone />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatSupportInterface;
