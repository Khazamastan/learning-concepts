#!/usr/bin/env node
/**
 * Minimal IRC client using Node.js net/tls modules.
 */
import net from "node:net";
import tls from "node:tls";
import readline from "node:readline";
import process from "node:process";

const args = process.argv.slice(2);
const nickIndex = args.indexOf("--nick");
const channelIndex = args.indexOf("--channel");
const noTls = args.includes("--no-tls");

const nick = nickIndex >= 0 ? args[nickIndex + 1] : "MiniUser";
const channel = channelIndex >= 0 ? args[channelIndex + 1] : "#testchannel";

const hostIndex = args.indexOf("--host");
const portIndex = args.indexOf("--port");
const host = hostIndex >= 0 ? args[hostIndex + 1] : "irc.libera.chat";
const port = portIndex >= 0 ? Number(args[portIndex + 1]) : 6697;

const socket = noTls
  ? net.createConnection({ host, port }, onConnect)
  : tls.connect({ host, port, rejectUnauthorized: false }, onConnect);

socket.on("data", (chunk) => {
  const lines = chunk.toString().split(/\r\n/);
  lines.forEach((line) => {
    if (!line) return;
    console.log("<-", line);
    if (line.startsWith("PING")) {
      const payload = line.slice(5);
      socket.write(`PONG ${payload}\r\n`);
      console.log("->", `PONG ${payload}`);
    }
  });
});

socket.on("error", (err) => {
  console.error("Socket error:", err);
  process.exit(1);
});

function onConnect() {
  console.log(`Connected to ${host}:${port}`);
  socket.write(`NICK ${nick}\r\n`);
  socket.write(`USER ${nick} 0 * :Node IRC Client\r\n`);
  socket.write(`JOIN ${channel}\r\n`);
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.on("line", (line) => {
  if (line === "/quit") {
    socket.write("QUIT :Client exiting\r\n");
    socket.end();
    rl.close();
    return;
  }
  if (line.startsWith("/")) {
    socket.write(`${line.slice(1)}\r\n`);
  } else {
    socket.write(`PRIVMSG ${channel} :${line}\r\n`);
  }
});
