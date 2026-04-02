import { WebSocketServer } from 'ws';

const server = new WebSocketServer({ port: 4101 });

server.on('connection', (socket) => {
  console.log('Client connected');
  socket.send(JSON.stringify({ type: 'welcome', message: 'Connected to WebSocket demo' }));

  socket.on('message', (data) => {
    console.log('Received message:', data.toString());
    socket.send(JSON.stringify({ type: 'echo', message: data.toString() }));
  });

  socket.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server listening on ws://localhost:4101');
