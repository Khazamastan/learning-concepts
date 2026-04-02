import { useEffect, useMemo, useState } from "react";

function createMessage(topic, payload) {
  return {
    id: crypto.randomUUID(),
    topic,
    payload,
    timestamp: new Date(),
  };
}

export default function MessageBrokerDemo() {
  const [topics, setTopics] = useState(["orders", "alerts"]);
  const [messages, setMessages] = useState([]);
  const [inputTopic, setInputTopic] = useState("orders");
  const [content, setContent] = useState("New order placed");
  const subscribers = useMemo(() => new Map(), []);

  useEffect(() => {
    topics.forEach((topic) => {
      if (!subscribers.has(topic)) subscribers.set(topic, []);
    });
  }, [topics]);

  function addSubscriber(topic) {
    subscribers.set(topic, [
      ...subscribers.get(topic),
      `consumer-${crypto.randomUUID().slice(0, 4)}`,
    ]);
    forceRender({});
  }

  function publish(event) {
    event.preventDefault();
    if (!inputTopic || !topics.includes(inputTopic)) return;
    const message = createMessage(inputTopic, content);
    const audience = subscribers.get(inputTopic) ?? [];
    setMessages((current) => [
      { ...message, deliveredTo: audience },
      ...current,
    ]);
    setContent("");
  }

  const [, forceRender] = useState({});

  return (
    <div className="panel">
      <h2>Message Broker (Pub/Sub)</h2>
      <section>
        <h3>Topics</h3>
        <ul>
          {topics.map((topic) => (
            <li key={topic}>
              <strong>{topic}</strong> ({(subscribers.get(topic) || []).length}{" "}
              subscribers)
              <button onClick={() => addSubscriber(topic)}>Add Subscriber</button>
            </li>
          ))}
        </ul>
        <button
          onClick={() => {
            const name = prompt("New topic name", "notifications");
            if (name && !topics.includes(name)) {
              setTopics((current) => [...current, name]);
            }
          }}
        >
          Add Topic
        </button>
      </section>
      <form onSubmit={publish} className="form-grid">
        <label>
          Topic
          <select
            value={inputTopic}
            onChange={(event) => setInputTopic(event.target.value)}
          >
            {topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </label>
        <label>
          Payload
          <input
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder='{"orderId": 123}'
            required
          />
        </label>
        <button type="submit">Publish</button>
      </form>
      <section>
        <h3>Recent Messages</h3>
        <ol>
          {messages.map((msg) => (
            <li key={msg.id}>
              <strong>{msg.topic}</strong> — {msg.payload} (delivered to{" "}
              {msg.deliveredTo.length || "0"} subscriber(s))
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
