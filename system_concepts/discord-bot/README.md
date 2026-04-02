# Discord Bot Concept Guide

## Concept Overview
Discord bots interact with the Discord API via HTTP REST endpoints and the Gateway websocket. Bots authenticate with a bot token, subscribe to intents, and respond to events such as messages, reactions, and slash commands. Responsibilities include rate-limit management, state caching, and command dispatch.

## Real-World Usage
- **Community Moderation:** Bots like MEE6 and Dyno automate moderation, onboarding, and custom commands.
- **DevOps ChatOps:** Teams trigger deployments, CI pipelines, or incident runbooks directly from Discord.
- **Games & Education:** Trivia, RPG companions, and classroom helpers provide interactive experiences.

## Architecture Highlights
1. **Gateway Connection:** Clients maintain a websocket session, respond to heartbeats, and handle opcode events (READY, MESSAGE_CREATE, INTERACTION_CREATE).
2. **REST API:** Used for creating channels, sending messages, and managing guild resources; subject to per-route rate limits.
3. **Slash Commands & Components:** Application commands provide structured interfaces with built-in validation and autocomplete.
4. **Permissions & Intents:** Bots must request privileged intents (message content, member list) and manage permission overwrites per channel.

## Included Working Example (Node.js)
The `example.js` script uses the `discord.js` library to implement a bot with:
- Slash command `/ping` returning latency.
- Listener that echoes messages mentioning the bot.
- Graceful shutdown and basic error handling.

```bash
npm install discord.js
export DISCORD_BOT_TOKEN=your_bot_token
export DISCORD_CLIENT_ID=your_application_id
node example.js --guild-id 123456789012345678
```

## Learning Checklist
- Persist configurations in a database (SQLite, Postgres) per guild.
- Add background tasks (e.g., reminders) with `asyncio.create_task`.
- Integrate with external APIs (GitHub, Jira) and secure tokens via environment variables.

## React 19 Interactive Demo
`example.jsx` visualizes gateway events and slash command handling:

```jsx
import DiscordBotDemo from "./discord-bot/example.jsx";

export default function App() {
  return <DiscordBotDemo />;
}
```

Use the component to describe how bots respond to interactions without connecting to Discord.

## References
- Discord Developer Documentation: https://discord.com/developers/docs/intro
- discord.py Guide: https://discordpy.readthedocs.io/
- Discord Rate Limits Explained: https://discord.com/developers/docs/topics/rate-limits
