const Message = require("../models/Message");
const User = require("../models/User");
const { handleRequest, handleQueue, handleCommands } = require("../utils/songRequests");

// send message
const sendMessage = async (req, res) => {
    try {
        const { senderId, text } = req.body;

        if (!senderId || !text) {
            return res.status(400).json({ error: "senderId and text are required"});
        }

        // fetch user details from database
        const user = await User.findById(senderId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const username = user.username;

        let responseMessage = null;

        // enforce chat rules
        if (!text.startsWith("/")) {
            console.log("Regular message recieved");
        } else if (text.startsWith("/request ")) {
            const result = await handleRequest(text, senderId, username);
            responseMessage = result.message;
        } else if (text == "/queue") {
            const result = await handleQueue();
            responseMessage = result.message;
        } else if (text == "/commands") {
            const result = await handleCommands();
            responseMessage = result.message;
        } else {
            return res.status(400).json({ error: "Type '/commands' for a list of commands"});
        }

        // save message
        const message = new Message({ senderId, text });
        await message.save();

        console.log("Message saved:, " + message);

        res.status(201).json(responseMessage ? { message: responseMessage } : message);
    } catch (error) {
        console.error("Error in sendMessage:", error);
        res.status(500).json({ error: "Server error: Unable to send message" });
    }
};

// Get all messages
const getMessages = async (req, res) => {
    try {
        // Retrieve all messages from the global chat, sorted by timestamp
        const messages = await Message.find().sort({ createdAt: -1 });

        // If there are no messages
        if (!messages || messages.length === 0) {
            return res.status(404).json({ message: "No messages found" });
        }

        // Send the messages as response
        return res.status(200).json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        return res.status(500).json({ error: 'Error fetching messages' });
    }
};

module.exports = { sendMessage, getMessages };
