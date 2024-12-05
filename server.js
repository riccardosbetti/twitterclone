const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

// Create Express app and HTTP server
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from the "public" folder
app.use(express.static('public'));

// WebSocket logic
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle new tweets
  socket.on('newTweet', (tweet) => {
    console.log('New tweet received:', tweet); // Log received tweet
    io.emit('updateTweets', tweet); // Broadcast tweet to all clients
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
