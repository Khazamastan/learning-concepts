# IRC Client Concept Guide

## Concept Overview
The Internet Relay Chat (IRC) protocol enables real-time text communication across channels and direct messages. Clients connect to an IRC server via TCP (optionally TLS) and exchange lines using the IRC message format (`<prefix> command params :trailing`). Core commands include `NICK`, `USER`, `JOIN`, `PRIVMSG`, and `PING`/`PONG` keep-alives. Modern networks add SASL authentication, capability negotiation (CAP), and IRCv3 extensions.

## Real-World Usage
- **Open-Source Communities:** Libera.Chat and OFTC host project support channels and community discussions.
- **Internal Chat Systems:** Some companies run private IRC servers for chatops and automation bots.
- **Bots & Automation:** IRC bots perform moderation, monitoring, and integrations with CI/CD pipelines.

## Architecture Highlights
1. **Connection Lifecycle:** Clients register with `NICK` and `USER`, handle welcome numerics (001–004), and maintain the session with PING/PONG.
2. **Parsing:** IRC messages are CRLF-terminated; clients must parse prefix, command, and parameters carefully—including trailing parameters containing spaces.
3. **Capabilities:** IRCv3 adds features like `server-time`, `account-tag`, and message tags that clients can opt into using CAP negotiation.
4. **Security:** TLS, SASL (PLAIN/EXTERNAL), and NickServ integration provide authentication and encryption.

## Included Working Example (Node.js)
The `example.js` script is a lightweight IRC client built with Node.js. It connects to a server (default: `irc.libera.chat:6697` over TLS), registers a nickname, joins a channel, and echoes messages to the console. To run:

```bash
node example.js --nick MiniUser --channel #testchannel
```

Use `--no-tls` to connect to non-TLS servers. Type messages into stdin to send to the joined channel.

## React 19 Interactive Demo
`example.jsx` walks through client registration, welcome numerics, joins, and message sending entirely in the browser:

```jsx
import IrcClientDemo from "./irc-client/example.jsx";

export default function App() {
  return <IrcClientDemo />;
}
```

Use the simulation to teach IRC command flow without opening a real TCP connection.

## Learning Checklist
- Implement SASL authentication for networks that require NickServ login.
- Persist chat logs with timestamps and handle multi-channel chat windows.
- Add support for CTCP commands and IRCv3 message tags.

## References
- RFC 1459 – Internet Relay Chat Protocol: https://www.rfc-editor.org/rfc/rfc1459
- IRCv3 Working Group Specifications: https://ircv3.net/
- Libera.Chat Client Guide: https://libera.chat/guides/connect
