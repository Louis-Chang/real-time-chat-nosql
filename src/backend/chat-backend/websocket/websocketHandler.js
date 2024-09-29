const WebSocket = require("ws");
const Message = require("../models/Message");
const redisUtils = require("../utils/redisUtils");

module.exports = (wss) => {
  wss.on("connection", (ws) => {
    ws.on("message", async (message) => {
      const parsedMessage = JSON.parse(message);
      const { content, sender, friendId } = parsedMessage;

      await redisUtils.storeMessage(friendId, parsedMessage);

      const newMessage = new Message({ content, sender, friendId });
      await newMessage.save();

      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ content, sender, friendId }));
        }
      });
    });
  });
};
