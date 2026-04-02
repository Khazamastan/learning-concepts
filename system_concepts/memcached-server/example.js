// Minimal ASCII Memcached-like server implemented with Node.js net module.
const net = require('net');

const store = new Map(); // key -> { value: Buffer, flags: number, expiry: number|null }

function isExpired(entry) {
  return entry.expiry !== null && entry.expiry < Date.now();
}

function cleanIfExpired(key) {
  const entry = store.get(key);
  if (entry && isExpired(entry)) store.delete(key);
}

function handleLine(socket, line) {
  const parts = line.trim().split(/\s+/);
  const command = parts.shift()?.toLowerCase();
  if (!command) return;

  switch (command) {
    case 'set': {
      if (parts.length < 4) {
        socket.write('CLIENT_ERROR missing parameters\r\n');
        return;
      }
      const [key, flagsStr, exptimeStr, bytesStr, maybeNoreply] = parts;
      const noreply = maybeNoreply === 'noreply';
      const flags = Number(flagsStr);
      const exptime = Number(exptimeStr);
      const bytes = Number(bytesStr);
      if (Number.isNaN(flags) || Number.isNaN(exptime) || Number.isNaN(bytes)) {
        socket.write('CLIENT_ERROR invalid numeric value\r\n');
        return;
      }
      socket.once('data', (data) => {
        const value = data.slice(0, bytes);
        const expiry = exptime === 0 ? null : Date.now() + exptime * 1000;
        store.set(key, { value, flags, expiry });
        if (!noreply) socket.write('STORED\r\n');
      });
      break;
    }
    case 'get': {
      if (parts.length === 0) {
        socket.write('CLIENT_ERROR missing key\r\n');
        return;
      }
      for (const key of parts) {
        cleanIfExpired(key);
        if (!store.has(key)) continue;
        const { value, flags } = store.get(key);
        socket.write(`VALUE ${key} ${flags} ${value.length}\r\n`);
        socket.write(Buffer.concat([value, Buffer.from('\r\n')]));
      }
      socket.write('END\r\n');
      break;
    }
    case 'delete': {
      if (parts.length !== 1) {
        socket.write('CLIENT_ERROR delete takes 1 key\r\n');
        return;
      }
      const deleted = store.delete(parts[0]);
      socket.write(deleted ? 'DELETED\r\n' : 'NOT_FOUND\r\n');
      break;
    }
    case 'incr': {
      if (parts.length !== 2) {
        socket.write('CLIENT_ERROR incr requires key and value\r\n');
        return;
      }
      const [key, deltaStr] = parts;
      const delta = Number(deltaStr);
      if (Number.isNaN(delta)) {
        socket.write('CLIENT_ERROR delta must be integer\r\n');
        return;
      }
      cleanIfExpired(key);
      if (!store.has(key)) {
        socket.write('NOT_FOUND\r\n');
        return;
      }
      const entry = store.get(key);
      const current = Number(entry.value.toString());
      if (!Number.isInteger(current)) {
        socket.write('CLIENT_ERROR cannot increment non-numeric value\r\n');
        return;
      }
      const next = (current + delta) % 2 ** 64;
      entry.value = Buffer.from(String(next));
      store.set(key, entry);
      socket.write(`${next}\r\n`);
      break;
    }
    case 'quit':
      socket.write('BYE\r\n');
      socket.end();
      break;
    default:
      socket.write('ERROR\r\n');
  }
}

const server = net.createServer((socket) => {
  socket.write('TOY MEMCACHED READY\r\n');
  let buffer = '';
  socket.on('data', (chunk) => {
    buffer += chunk.toString();
    let index;
    while ((index = buffer.indexOf('\n')) >= 0) {
      const line = buffer.slice(0, index);
      buffer = buffer.slice(index + 1);
      if (line.trim().length > 0) handleLine(socket, line);
    }
  });
});

server.listen(11211, () => {
  console.log('Toy Memcached listening on tcp://0.0.0.0:11211');
});
