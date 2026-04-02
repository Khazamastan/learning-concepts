// Minimal DNS query client using Node.js dgram.
const dgram = require('dgram');
const crypto = require('crypto');

function encodeName(name) {
  return Buffer.concat(
    name.split('.').map((label) => {
      const buf = Buffer.alloc(label.length + 1);
      buf.writeUInt8(label.length, 0);
      buf.write(label, 1, 'ascii');
      return buf;
    }).concat(Buffer.from([0]))
  );
}

function buildQuery(hostname, id) {
  const header = Buffer.alloc(12);
  header.writeUInt16BE(id, 0); // ID
  header.writeUInt16BE(0x0100, 2); // Recursion desired
  header.writeUInt16BE(1, 4); // QDCOUNT
  const question = Buffer.concat([encodeName(hostname), Buffer.from([0x00, 0x01, 0x00, 0x01])]); // Type A, class IN
  return Buffer.concat([header, question]);
}

function parseResponse(buffer, id) {
  const rid = buffer.readUInt16BE(0);
  if (rid !== id) throw new Error('Mismatched response ID');
  const flags = buffer.readUInt16BE(2);
  const qd = buffer.readUInt16BE(4);
  const an = buffer.readUInt16BE(6);
  const rcode = flags & 0x000f;
  if (rcode !== 0) throw new Error(`DNS error code ${rcode}`);
  let offset = 12;
  for (let i = 0; i < qd; i += 1) {
    offset = skipName(buffer, offset) + 4;
  }
  const answers = [];
  for (let i = 0; i < an; i += 1) {
    offset = skipName(buffer, offset);
    const type = buffer.readUInt16BE(offset); offset += 2;
    const klass = buffer.readUInt16BE(offset); offset += 2;
    const ttl = buffer.readUInt32BE(offset); offset += 4;
    const rdlength = buffer.readUInt16BE(offset); offset += 2;
    const rdata = buffer.slice(offset, offset + rdlength);
    offset += rdlength;
    if (type === 1 && klass === 1) {
      answers.push({ ip: Array.from(rdata).join('.'), ttl });
    }
  }
  return answers;
}

function skipName(buffer, offset) {
  let jumped = false;
  let original = offset;
  while (true) {
    const len = buffer.readUInt8(offset);
    if (len === 0) {
      if (!jumped) offset += 1;
      break;
    }
    if ((len & 0xc0) === 0xc0) {
      if (!jumped) original = offset + 2;
      offset = ((len & 0x3f) << 8) | buffer.readUInt8(offset + 1);
      jumped = true;
    } else {
      offset += len + 1;
    }
  }
  return jumped ? original : offset;
}

async function query(hostname, server) {
  const id = crypto.randomBytes(2).readUInt16BE();
  const payload = buildQuery(hostname, id);
  const socket = dgram.createSocket('udp4');

  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      socket.close();
      reject(new Error('Timeout waiting for DNS response'));
    }, 3000);

    socket.on('message', (msg) => {
      clearTimeout(timer);
      socket.close();
      try {
        resolve(parseResponse(msg, id));
      } catch (err) {
        reject(err);
      }
    });

    socket.send(payload, 53, server, (err) => {
      if (err) {
        clearTimeout(timer);
        socket.close();
        reject(err);
      }
    });
  });
}

async function main() {
  const hostname = process.argv[2];
  const server = process.argv[3] || '8.8.8.8';
  if (!hostname) {
    console.error('Usage: node example.js <hostname> [server]');
    process.exit(1);
  }
  try {
    const answers = await query(hostname, server);
    if (answers.length === 0) {
      console.log('No A records returned');
    } else {
      answers.forEach((answer) => {
        console.log(`${hostname} -> ${answer.ip} (TTL=${answer.ttl}s)`);
      });
    }
  } catch (err) {
    console.error('Lookup failed:', err.message);
  }
}

if (require.main === module) {
  main();
}
