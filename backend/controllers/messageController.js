const Message = require("../models/Message");
const { handleRequest, handleQueue } = require("../utils/songRequests");

// send message
const sendMessage = async(req, res) => {
    try {
        const { senderId, text, roomId } = req.body;

        // validate roomId
        if (!["songRequests", "globalChat"].includes(roomId)) {
            return res.status(400).json({ error: "Invalid room" });
        }

        // enforce chat rules
        if (roomId === "songRequests" && 
            !text.startsWith("/request ") && 
            text !== "/queue" &&
            text !== "/mood" &&
            text !== "/commands") {
            return res.status(400).json({ error: "Type '/commands' for a list of commands"});
        }

        if (roomId === "globalChat" && text.trim().startsWith("/request ")) {
            return res.status(400).json({ error: "Song requests are not allowed in global chat"});
        }

        // save message
        const message = new Message({ senderId, text, roomId });
        await message.save();

        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ error: "Server error"});
    }
};

// get messages for a specific room
const getMessagesByRoom = async (req, res) => {
    try {
        const { roomId } = req.params;

        if (!["songRequests", "globalChat"].includes(roomId)) {
            return res.status(400).json({ error: "Invalid room" });
        }

        const messages = await Message.find({ roomId }).sort({ createdAt: 1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// handles commands in songRequest room
const handleSongRequestMessage = async (message, user) => {
    if (message.startsWith("/request ")) {
        return await handleRequest(message, user);
    } else if (message == "/queue") {
        return await handleQueue();
    } else {
        return { error: "Type '/commands' for a list of commands" };
    }
};

module.exports = { sendMessage, getMessagesByRoom, handleSongRequestMessage };
