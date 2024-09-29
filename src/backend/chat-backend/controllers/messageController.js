const Message = require('../models/Message');
const redisUtils = require('../utils/redisUtils');

exports.getMessages = async (req, res) => {
    try {
        const { friendId } = req.params;
        
        if (!req.user) {
            return res.status(401).json({ error: "Unauthorized: User not authenticated" });
        }
        
        const currentUserId = req.user._id;

        if (!currentUserId) {
            return res.status(401).json({ error: "Unauthorized: User ID not found" });
        }

        if (!friendId) {
            return res.status(400).json({ error: "Bad Request: Friend ID is required" });
        }

        const query = {
            $or: [
                { sender: currentUserId, receiver: friendId },
                { sender: friendId, receiver: currentUserId }
            ]
        };

        const recentMessages = await redisUtils.getRecentMessages(currentUserId.toString(), friendId, 10);
        
        if (recentMessages.length < 10) {
            const oldMessages = await Message.find(query)
                .sort("-timestamp")
                .limit(10 - recentMessages.length);
            const allMessages = [...recentMessages, ...oldMessages];
            res.json(allMessages);
        } else {
            res.json(recentMessages);
        }
    } catch (error) {
        console.error("Error in getMessages:", error);
        res.status(500).json({ error: "Error fetching messages", details: error.message });
    }
};

exports.postMessage = async (req, res) => {
    try {
        const { content, sender, friendId } = req.body;
        const newMessage = { content, sender, friendId, timestamp: new Date() };

        await redisUtils.storeMessage(sender, friendId, newMessage);
        const mongoMessage = new Message(newMessage);
        await mongoMessage.save();

        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ error: "Error sending message" });
    }
};
