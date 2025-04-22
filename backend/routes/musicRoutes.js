const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const axios = require("axios");

const router = express.Router();

router.post("/generate_music", async (req, res) => {
    const { prompt } = req.body;
    console.log("Received prompt:", prompt);

    try
    {
        // Send the prompt to the music generation API
        const response = await axios.post("https://cf0d-136-55-185-33.ngrok-free.app/generate_music", { prompt });
        console.log("Response from music generation API:", response.data);
        return res.json({ message: "Music generation started", prompt, song_id: response.data.song_id });
    }
    catch (error) 
    {
        console.error("Error generating music:", error);
        return res.status(500).json({ message: "Error generating music" });
    }

});

router.get("/progress/:song_id", async (req, res) => {
    const { song_id } = req.params;
    console.log("Received song_id:", song_id);

    try {
        // Poll the music generation API for progress
        const response = await axios.get(`https://cf0d-136-55-185-33.ngrok-free.app/progress/${song_id}`);
        console.log("Response from progress API:", response.data);
        return res.json(response.data);
    } catch (error) {
        console.error("Error fetching progress:", error);
        return res.status(500).json({ message: "Error fetching progress" });
    }
});

router.post("/download", async (req, res) => {
    const { url } = req.body;
    console.log("Received download URL:", url);
    try {
        // Download the generated music file
        const response = await axios.get(url, { responseType: "arraybuffer" });
        console.log("Downloaded music file:", response.data);
        res.set("Content-Type", "audio/mpeg");
        res.send(response.data);
    } catch (error) {
        console.error("Error downloading music file:", error);
        res.status(500).json({ message: "Error downloading music file" });
    }
});

module.exports = router;