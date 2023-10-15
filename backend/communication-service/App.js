const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // The origin of your React application
    methods: ["GET", "POST"],
  },
});

// Store mapping of room/socket IDs to their respective socket instances
const clients = {};

io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);

  // When a client wants to join a room
  socket.on("join", (roomId) => {
    socket.join(roomId);
    clients[socket.id] = socket;
  });

  // Handle sending messages
  socket.on("message", (data) => {
    const { roomId, message } = data;
    // Send message to all clients in the room except the sender
    socket.to(roomId).emit("receive-message", message);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
    delete clients[socket.id];
  });
});

const PORT = 3005;
server.listen(PORT, () => {
  console.log(`WebSocket server listening on port ${PORT}`);
});
