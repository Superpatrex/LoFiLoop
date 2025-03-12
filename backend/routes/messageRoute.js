const express = require('express');
const { sendMessage, getMessages } = require("../controllers/messageController.js");

const router = express.Router();

// route to send message
router.post("/send", sendMessage);

// route to get messages
router.post("/messages", getMessages);

// route to get songRequests
// router.post("/songRequests", async (req, res) => {
//     const { message, user } = req.body;
//     const response = await handleRequest(message, user);

//     if (response.error) {
//         return res.status(400).json({ error: response.error});
//     }
//     return res.json({ message: response.message });
// });

module.exports = router;