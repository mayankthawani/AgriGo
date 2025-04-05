const jwt = require('jsonwebtoken');
const RentalRequest = require('../models/RentalRequest');

const socketHandler = (io) => {
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error('Authentication error'));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.id;
      next();
    } catch (err) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.userId);

    socket.on('join_chat', async (requestId) => {
      try {
        const request = await RentalRequest.findById(requestId);
        if (!request) return;

        socket.join(requestId);
        console.log(`User ${socket.userId} joined chat room ${requestId}`);
      } catch (error) {
        console.error('Error joining chat:', error);
      }
    });

    socket.on('send_message', async ({ requestId, content }) => {
      try {
        const request = await RentalRequest.findById(requestId);
        if (!request) return;

        // Verify user is part of this request
        if (request.renterId.toString() !== socket.userId && 
            request.ownerId.toString() !== socket.userId) {
          return;
        }

        // Save message to database
        const newMessage = {
          sender: socket.userId,
          content,
          timestamp: new Date()
        };
        
        request.messages.push(newMessage);
        await request.save();

        // Send message to all users in the room except sender
        socket.to(requestId).emit('new_message', {
          ...newMessage,
          isOwn: false
        });

        // Send confirmation only to sender
        socket.emit('message_confirmation', {
          ...newMessage,
          isOwn: true
        });

      } catch (error) {
        console.error('Error handling message:', error);
        socket.emit('message_error', { error: 'Failed to send message' });
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.userId);
    });
  });
};

module.exports = socketHandler;
