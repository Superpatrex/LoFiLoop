const mongoose = require("mongoose");
const { getDatabase } = require("../db"); // Import function to get DB

// Get the "live-tracker" database
const liveTrackerDB = getDatabase("live-data");

const listenerSchema = new mongoose.Schema({
    count: { type: Number, required: true, default: 0 }
});

// Create model in "live-tracker" database
module.exports = liveTrackerDB.model("Listener", listenerSchema);