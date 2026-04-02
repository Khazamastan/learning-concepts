import WebSocket from 'ws';
import readline from 'node:readline';

const socket = new WebSocket('ws://localhost:4101');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

socket.on('open', () => {
  console.log('Connected to WebSocket server. Type messages and press enter.');
});

socket.on('message', (data) => {
  console.log('Server:', data.toString());
});

socket.on('close', () => {
  console.log('Connection closed');
  process.exit(0);
});

rl.on('line', (input) => {
  if (input.trim().toLowerCase() === '/exit') {
    socket.close();
    return;
  }
  socket.send(input);
});
