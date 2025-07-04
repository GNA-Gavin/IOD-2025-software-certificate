const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  io.emit("user status", "a user connected");
  
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    io.emit("chat message", msg);
  });
  
  socket.on("disconnect", () => {
    console.log("a user disconnected");
    io.emit("user status", "a user disconnected");
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
