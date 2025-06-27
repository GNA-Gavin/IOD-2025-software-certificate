const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);
const io = new Server(server);

// Store connected users
const connectedUsers = new Map();

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected:", socket.id);

  // Handle nickname setting
  socket.on("set nickname", (nickname) => {
    connectedUsers.set(socket.id, nickname);
    console.log(`User ${socket.id} set nickname to: ${nickname}`);

    // Broadcast that user joined with nickname
    socket.broadcast.emit("user status", `${nickname} joined the chat`);

    // Send updated online users list to everyone
    io.emit("online users", Array.from(connectedUsers.values()));
  });

  // Handle chat messages
  socket.on("chat message", (data) => {
    const nickname = connectedUsers.get(socket.id) || "Anonymous";
    console.log(`message from ${nickname}: ${data.message}`);

    // Send message to everyone except the sender
    socket.broadcast.emit("chat message", {
      nickname: nickname,
      message: data.message,
      timestamp: new Date().toLocaleTimeString(),
    });
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    const nickname = connectedUsers.get(socket.id) || "Anonymous";
    console.log("user disconnected:", nickname);

    // Remove user from connected users
    connectedUsers.delete(socket.id);

    // Broadcast that user left
    socket.broadcast.emit("user status", `${nickname} left the chat`);

    // Send updated online users list to everyone
    io.emit("online users", Array.from(connectedUsers.values()));
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
