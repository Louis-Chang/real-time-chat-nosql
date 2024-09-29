const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  content: String,
  sender: String,
  friendId: mongoose.Schema.Types.ObjectId,
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
