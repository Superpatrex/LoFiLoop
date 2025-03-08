// defines the commands that users can use in the songRequests chatroom
// includes: /request <song request> (adds track to queue based off <song request>)
//           /queue (returns a list of the queued requests and the user who requested it)
//           /mood (returns an AI summary of the mood of the past 10 songs + queued songs)
const { generateSongInfo } = require("../openai");
// stores song requests
const SongQueue = require("../models/SongQueue");

// placeholder function for generating tracks (connect to Anna's part once done)
async function generateAIMusic(songRequest) {
    // this should be replaced with a call to the AI music generation service
    console.log(`Generating AI music for: ${songRequest}`);
    return `Generated_Track_${Date.now()}.mp3`; // placeholder return value
}

// handle "/request <song>"
async function handleRequest(songRequest, senderId, username) {
    const song = songRequest.replace("/request ", "").trim();

    if (!song) {
        return { error: "Invalid request format. Use /request <song name>." };
    }

    const openAIResponse = await generateSongInfo(song);

    // parse the OpenAI response from generateSongInfo
    console.log("OpenAI Response: ", openAIResponse);

    if (!openAIResponse) {
        throw new Error("OpenAI response is undefined or empty.");
        }
    const parsedResponse = JSON.parse(openAIResponse);

    // extract title and artist
    const title = parsedResponse.title;
    const artist = parsedResponse.artist;

    if (!title || !artist) {
        throw new Error("Invalid OpenAI response: Missing title or artist");
    }

    // generate a placeholder track path
    const track = `generated_tracks/${title}_${artist}.mp3`;

    // // generate AI music (connect to Anna's part)
    // const generatedTrack = await generateAIMusic(song);

   // add song request to the queue in MongoDB
    const newSong = new SongQueue({
        title,
        artist,
        userId: senderId,
        username,
        track
    });

    await newSong.save();  // save the song to the database
    
    console.log("Song added to queue: ", newSong);
    return { message: `Track added to the queue: "${title}" by ${artist}` };
}

// handle "/queue"
async function handleQueue() {
    
    const queue = await SongQueue.find().sort({ timestamp: 1 });

    if (queue.length === 0) {
        return { message: "The queue is currently empty." };
    }

    const currentSong = await SongQueue.find().sort({ timestamp: 1 }).limit(1);

    if (currentSong.length === 0) {
        return { message: "No current song." };
    }

    const index = currentSong.length - 1;
    
    const currentSongData = currentSong[index];

    // format the song queue
    const queueList = queue.map((item, index) => 
        `${index + 1}. ${item.title} (requested by ${item.artist})`
    ).join("\n");

    return { 
        message: `**Current Song Queue:**\n${queueList}\nNow Playing: ${currentSongData.title} by ${currentSongData.artist}`
    };
}

async function handleCommands() {
    return {
        message: `🎵 **Song Request Commands** 🎵

Use the following commands to interact with the song request system:

✅ **/request <song name>** – Add a song to the queue.  
✅ **/queue** – View the current song queue.
✅ **/commands** – Display this list of commands.

Enjoy the music! 🎶`
    };
}

// // handle "/mood <mood>" (placeholder, not implemented yet)
// async function handleMood(moodRequest) {
//     // this will require an OpenAI API call
// }

module.exports = { handleRequest, handleQueue, handleCommands };