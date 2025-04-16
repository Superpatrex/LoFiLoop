const express = require('express');
const { sendMessage, getMessages } = require("../controllers/messageController.js");
const authenticateToken = require("../middleware/auth");

const router = express.Router();

// route to send message
router.post("/send", authenticateToken, sendMessage);

// route to get messages
router.get("/messages", getMessages);

module.exports = router;