const mongoose = require('mongoose');

const songQueueSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  track: { type: String, required: true },  // the generated track file or path
  timestamp: { type: Date, default: Date.now }
});

const SongQueue = mongoose.model('SongQueue', songQueueSchema);

module.exports = SongQueue;
