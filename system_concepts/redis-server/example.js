// Minimal Redis-like TCP server implemented in Node.js.
// Supports SET, GET, DEL, and INCR commands using a simplified text protocol.

const net = require('net');

const store = new Map();

function handleCommand(line, socket) {
  const parts = line.trim().split(/\s+/);
  const command = parts.shift()?.toUpperCase();

  try {
    switch (command) {
      case 'SET': {
        if (parts.length < 2) {
          socket.write('-ERR wrong number of arguments for SET\r\n');
          break;
        }
        const key = parts.shift();
        const value = parts.join(' ');
        store.set(key, value);
        socket.write('+OK\r\n');
        break;
      }
      case 'GET': {
        if (parts.length !== 1) {
          socket.write('-ERR wrong number of arguments for GET\r\n');
          break;
        }
        const key = parts[0];
        if (!store.has(key)) {
          socket.write('$-1\r\n');
        } else {
          const value = store.get(key);
          socket.write(`$${Buffer.byteLength(value)}\r\n${value}\r\n`);
        }
        break;
      }
      case 'DEL': {
        if (parts.length < 1) {
          socket.write('-ERR wrong number of arguments for DEL\r\n');
          break;
        }
        let deleted = 0;
        for (const key of parts) {
          if (store.delete(key)) deleted += 1;
        }
        socket.write(`:${deleted}\r\n`);
        break;
      }
      case 'INCR': {
        if (parts.length !== 1) {
          socket.write('-ERR wrong number of arguments for INCR\r\n');
          break;
        }
        const key = parts[0];
        const current = Number(store.get(key) ?? '0');
        if (!Number.isInteger(current)) {
          socket.write('-ERR value is not an integer\r\n');
          break;
        }
        const next = current + 1;
        store.set(key, String(next));
        socket.write(`:${next}\r\n`);
        break;
      }
      case 'QUIT':
        socket.write('+BYE\r\n');
        socket.end();
        break;
      default:
        socket.write('-ERR unknown command\r\n');
    }
  } catch (error) {
    socket.write(`-ERR ${error.message}\r\n`);
  }
}

const server = net.createServer((socket) => {
  socket.write('+MiniRedis ready on port 6379\r\n');
  let buffer = '';
  socket.on('data', (chunk) => {
    buffer += chunk.toString();
    let index;
    while ((index = buffer.indexOf('\n')) >= 0) {
      const line = buffer.slice(0, index).trim();
      buffer = buffer.slice(index + 1);
      if (line.length > 0) handleCommand(line, socket);
    }
  });
});

server.listen(6379, () => {
  const { port } = server.address();
  console.log(`MiniRedis listening on tcp://127.0.0.1:${port}`);
});
