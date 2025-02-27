const axios = require('axios');
const OpenAI = require('openai');
require('dotenv').config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const openai = new OpenAI();

// Function to generate song title and artist
async function generateSongInfo(prompt) {
    try {
        const response = await openai.chat.completions.create(
            {
                model: "gpt-4o",
                messages: [{ role: "system", content: "Return a creative song title and artist for the prompt in a structured JSON output. The JSON must include only two fields: 'title' and 'artist' (with proper capitalization). Do not include anything else."},
                           { role: "user", content: prompt }
                ],
                max_tokens: 50,
                response_format: { type: "json_object" }
            });

            const structuredData = response.choices[0].message.content;

        // console.log(response.choices);
        return structuredData; // JSON --> JS object
    } catch (error) {
        console.error("Error calling OpenAI API", error);
    }
}

async function generateAlbumArt(prompt) {
    
    let config = {
        method: 'post',
        url: 'https://api.openai.com/v1/images/generations',
        headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        data: JSON.stringify({
        "model": "dall-e-3",
        "prompt": prompt,
        "n": 1,
        "size": "1024x1024"
        })
    };
    
    try {
        const response = await axios.request(config);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching DALL·E image:", error.response?.data || error.message);
    }
}

module.exports = { generateSongInfo, generateAlbumArt };