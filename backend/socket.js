import { io } from 'socket.io-client';

// create a socket connection to the server
const socket = io('http://localhost:3001');

// Emit a message event to the server
export function sendMessage(message) {
  socket.emit('sendMessage', message);
}

// listen for messages broadcasted by the server
export function listenForMessages(callback) {
  socket.on('receiveMessage', (message) => {
    callback(message);
  });
}

export default socket;
