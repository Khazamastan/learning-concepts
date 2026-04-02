import { useState } from "react";

const welcomeMessages = [
  { code: "001", text: "Welcome to the Internet Relay Network" },
  { code: "002", text: "Your host is irc.example.net" },
  { code: "003", text: "This server was created today" },
];

export default function IrcClientDemo() {
  const [nick, setNick] = useState("MiniUser");
  const [channel, setChannel] = useState("#testchannel");
  const [log, setLog] = useState([]);
  const [message, setMessage] = useState("");

  function connect() {
    const events = [
      { from: "server", text: `NICK ${nick}` },
      { from: "server", text: `USER ${nick} 0 * :React IRC Client` },
      ...welcomeMessages.map((msg) => ({
        from: "server",
        text: `:${msg.code} ${nick} :${msg.text}`,
      })),
      { from: "server", text: `JOIN ${channel}` },
    ];
    setLog(events);
  }

  function sendMessage(event) {
    event.preventDefault();
    if (!message) return;
    setLog((current) => [
      ...current,
      { from: nick, text: `PRIVMSG ${channel} :${message}` },
    ]);
    setMessage("");
  }

  return (
    <div className="panel">
      <h2>IRC Client Flow</h2>
      <div className="form-grid">
        <label>
          Nickname
          <input value={nick} onChange={(event) => setNick(event.target.value)} />
        </label>
        <label>
          Channel
          <input
            value={channel}
            onChange={(event) => setChannel(event.target.value)}
          />
        </label>
      </div>
      <div className="button-row">
        <button onClick={connect}>Connect</button>
      </div>
      <form onSubmit={sendMessage} className="form-grid">
        <label>
          Message
          <input
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Hello IRC!"
          />
        </label>
        <button type="submit">Send</button>
      </form>
      <section>
        <h3>Session Log</h3>
        <ul className="log">
          {log.map((entry, index) => (
            <li key={index}>
              <strong>{entry.from}</strong>: {entry.text}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
