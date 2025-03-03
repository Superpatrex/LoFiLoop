const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        text: {
            type: String,
            required: true
        },
        roomId: {
            type: String,
            enum: ["songRequests", "globalChat"],
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    });

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;