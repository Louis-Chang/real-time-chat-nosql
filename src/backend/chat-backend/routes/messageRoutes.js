const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const auth = require('../middleware/auth');

router.get('/messages/:friendId', auth, messageController.getMessages);
router.post('/messages', auth, messageController.postMessage);

module.exports = router;
