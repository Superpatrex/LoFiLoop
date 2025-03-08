const express = require("express");
const router = express.Router();
const Listener = require("../models/Listener"); // Import the Listener model

// GET the current listener count
router.get("/", async (req, res) => {
    try {
        const listenerDoc = await Listener.findOne();
        if (!listenerDoc) {
            return res.status(404).json({ message: "Listener count not found" });
        }
        res.json({ listenerCount: listenerDoc.count });
    } catch (error) {
        res.status(500).json({ message: "Error fetching listener count", error });
    }
});

// INCREMENT the listener count
router.post("/increment", async (req, res) => {
    try {
        let listenerDoc = await Listener.findOne();
        if (!listenerDoc) {
            listenerDoc = new Listener({ count: 1 });
        } else {
            listenerDoc.count += 1;
        }
        await listenerDoc.save();
        res.json({ message: "Listener count incremented", listenerCount: listenerDoc.count });
    } catch (error) {
        res.status(500).json({ message: "Error incrementing listener count", error });
    }
});

// DECREMENT the listener count (ensuring it doesn’t go below zero)
router.post("/decrement", async (req, res) => {
    try {
        let listenerDoc = await Listener.findOne();
        if (!listenerDoc) {
            listenerDoc = new Listener({ count: 0 });
        } else {
            listenerDoc.count = Math.max(0, listenerDoc.count - 1);
        }
        await listenerDoc.save();
        res.json({ message: "Listener count decremented", listenerCount: listenerDoc.count });
    } catch (error) {
        res.status(500).json({ message: "Error decrementing listener count", error });
    }
});

// RESET the listener count (for admin or debugging)
router.post("/reset", async (req, res) => {
    try {
        let listenerDoc = await Listener.findOne();
        if (!listenerDoc) {
            listenerDoc = new Listener({ count: 0 });
        } else {
            listenerDoc.count = 0;
        }
        await listenerDoc.save();
        res.json({ message: "Listener count reset", listenerCount: listenerDoc.count });
    } catch (error) {
        res.status(500).json({ message: "Error resetting listener count", error });
    }
});

module.exports = router;