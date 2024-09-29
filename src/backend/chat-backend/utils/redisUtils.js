const Redis = require("ioredis");
const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

exports.storeMessage = async (userId, friendId, message) => {
  const key = `recent_messages:${userId}:${friendId}`;
  await redis.lpush(key, JSON.stringify(message));
  await redis.ltrim(key, 0, 99); 
};

exports.getRecentMessages = async (userId, friendId, count) => {
  try {
    const key = `recent_messages:${userId}:${friendId}`;
    const safeCount = parseInt(count, 10) || 10;  
    const messages = await redis.lrange(key, 0, safeCount - 1);
    return messages.map(JSON.parse);
  } catch (error) {
    console.error('Error getting recent messages from Redis:', error);
    return [];
  }
};
