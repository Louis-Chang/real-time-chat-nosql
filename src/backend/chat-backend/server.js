const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const Redis = require("ioredis");
const mongoose = require("mongoose");
const cron = require('node-cron');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.json());

// Redis setup
const redis = new Redis({
  host: "redis",
  port: 6379,
});

// MongoDB setup
mongoose.connect("mongodb://mongo:27017/chatapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Message schema
const messageSchema = new mongoose.Schema({
  content: String,
  sender: String,
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", messageSchema);

// Function to transfer messages from Redis to MongoDB
async function transferMessages() {
    try {
        const messages = await redis.lrange('recent_messages', 0, -1);
        if (messages.length > 0) {
            const parsedMessages = messages.map(JSON.parse);
            await Message.insertMany(parsedMessages);
            // Optionally clear messages from Redis after transfer
            // await redis.del('recent_messages');
        }
    } catch (error) {
        console.error('Failed to transfer messages:', error);
    }
}

// WebSocket connection handling
wss.on("connection", (ws) => {
  console.log("New client connected");

  ws.on("message", async (message) => {
    console.log("Received message:", message);

    const parsedMessage = JSON.parse(message);

    // Store message in Redis cache
    await redis.lpush("recent_messages", JSON.stringify(parsedMessage));
    await redis.ltrim("recent_messages", 0, 99); // Keep only last 100 messages

    // Check the size of the list and transfer if necessary
    const listSize = await redis.llen("recent_messages");
    if (listSize >= 100) { // Assuming you want to transfer after 100 messages
        await transferMessages();
    }

    // Store message in MongoDB
    const newMessage = new Message(parsedMessage);
    await newMessage.save();

    // Broadcast message to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(parsedMessage));
      }
    });
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

// Schedule the transfer to run every hour
cron.schedule('0 * * * *', transferMessages);

// API routes
app.get("/messages", async (req, res) => {
  try {
    const recentMessages = await redis.lrange("recent_messages", 0, 9);
    res.json(recentMessages.map(JSON.parse));
  } catch (error) {
    res.status(500).json({ error: "Error fetching messages" });
  }
});

app.get("/messages/history", async (req, res) => {
  try {
    const messages = await Message.find().sort("-timestamp").limit(100);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Error fetching message history" });
  }
});

// API route to save a message
app.post("/messages", async (req, res) => {
  try {
    const { content, sender } = req.body;
    if (!content || !sender) {
      return res.status(400).json({ error: "Content and sender are required" });
    }

    const message = { content, sender, timestamp: new Date() };

    // Save message to Redis
    await redis.lpush("recent_messages", JSON.stringify(message));
    await redis.ltrim("recent_messages", 0, 99); // Keep only last 100 messages

    // Optionally, broadcast message to all connected WebSocket clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });

    res.status(201).json(message);
  } catch (error) {
    console.error("Failed to save message:", error);
    res.status(500).json({ error: "Failed to save message" });
  }
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
