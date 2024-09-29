const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const mongoose = require("mongoose");
const messageRoutes = require("./routes/messageRoutes");
const userRoutes = require("./routes/userRoutes");
const websocketHandler = require("./websocket/websocketHandler");
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

require('dotenv').config();
app.use(express.json());
app.use(cors());
app.use(messageRoutes);
app.use(userRoutes);

mongoose.connect(process.env.MONGO_URI);

websocketHandler(wss);

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
