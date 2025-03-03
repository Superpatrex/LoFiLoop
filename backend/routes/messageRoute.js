const express = require('express');
const { sendMessage, getMessagesByRoom, handleSongRequestMessage } = require("../controllers/messageController.js");

const router = express.Router();

// route to send message
router.post("/send", sendMessage);

// route to get messages for a specific room
router.post("/:roomId", getMessagesByRoom);

// route to get messages from commands in songRequests room
router.post("/songRequests", async (req, res) => {
    const { message, user } = req.body;
    const response = await handleSongRequestMessage(message, user);

    if (response.error) {
        return res.status(400).json({ error: response.error});
    }
    return res.json({ message: response.message });
});

module.exports = router;