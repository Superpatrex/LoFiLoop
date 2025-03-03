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
async function handleRequest(songRequest, user) {
    const song = songRequest.replace("/request ", "").trim();
    if (!song) {
        return { error: "Invalid request format. Use /request <song name>." };
    }

    // get ai-generated song details
    const songInfo = await generateSongInfo(song);

    // generate AI music (connect to Anna's part)
    const generatedTrack = await generateAIMusic(song);

   // add song request to the queue in MongoDB
    const newSong = new SongQueue({
        title: songInfo.title,
        artist: songInfo.artist,
        user: user,
        track: generatedTrack
    });

    await newSong.save();  // save the song to the database

    return { message: `Track added to the queue: "${songInfo.title}" by ${songInfo.artist}` };
}

// handle "/queue"
async function handleQueue() {
    const queue = await SongQueue.find().sort({ timestamp: 1 });

    if (queue.length === 0) {
        return { message: "The queue is currently empty." };
    }

    const currentSong = await SongQueue.findOne().sort({ timestamp: -1 });

    // format the song queue
    const queueList = songQueue.map((item, index) => 
        `${index + 1}. ${item.title} (requested by ${item.user})`
    ).join("\n");

    return { 
        message: `**Current Song Queue:**\n${queueList}\nNow Playing: ${currentSong.title} by ${currentSong.artist}`
    };
}

// // handle "/mood <mood>" (placeholder, not implemented yet)
// async function handleMood(moodRequest) {
//     // this will require an OpenAI API call
// }

module.exports = { handleRequest, handleQueue };