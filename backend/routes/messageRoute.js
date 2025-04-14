const express = require('express');
const { sendMessage, getMessages } = require("../controllers/messageController.js");

const router = express.Router();

// route to send message
router.post("/send", sendMessage);

// route to get messages
router.get("/messages", getMessages);

module.exports = router;