const { generateSongInfo } = require('./openai');
const SongQueue = require('./models/songQueue'); // import the SongQueue model

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('A user connected');

    // handle the '/request' event when a song request is sent
    socket.on('requestSong', async (songRequest, user) => {
      try {
        // generate song info (title and artist)
        const songInfo = await generateSongInfo(songRequest);

        // create a new SongQueue entry and save it to the database
        const newSong = new SongQueue({
          title: songInfo.title,
          artist: songInfo.artist,
          user: user,  // the user who made the request
        });

        // save the song to the database
        await newSong.save();

        console.log(`Song Requested: ${songInfo.title} by ${songInfo.artist}`);

        // emit the new song info to all connected clients
        io.emit('songQueued', { songInfo, user });
      } catch (error) {
        console.error("Error handling song request:", error);
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
};
