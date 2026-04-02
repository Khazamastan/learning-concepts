/**
 * Minimal Discord bot using discord.js v14.
 * Slash command: /ping
 * Message listener: replies when mentioned.
 */
import { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } from "discord.js";
import process from "node:process";
import readline from "node:readline";

const token = process.env.DISCORD_BOT_TOKEN;
if (!token) {
  console.error("Set DISCORD_BOT_TOKEN before running this example.");
  process.exit(1);
}

const guildId = process.argv.includes("--guild-id")
  ? process.argv[process.argv.indexOf("--guild-id") + 1]
  : undefined;

const clientId = process.env.DISCORD_CLIENT_ID;
if (!clientId) {
  console.error("Set DISCORD_CLIENT_ID for slash command registration.");
  process.exit(1);
}

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

const commands = [
  new SlashCommandBuilder().setName("ping").setDescription("Replies with latency"),
].map((command) => command.toJSON());

const rest = new REST({ version: "10" }).setToken(token);

async function registerCommands() {
  if (guildId) {
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });
    console.log(`Registered guild commands for ${guildId}`);
  } else {
    await rest.put(Routes.applicationCommands(clientId), { body: commands });
    console.log("Registered global commands (can take up to 1 hour).");
  }
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === "ping") {
    await interaction.reply(`Pong! ${client.ws.ping.toFixed(0)} ms`);
  }
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.mentions.has(client.user)) {
    await message.reply(`Hello ${message.author}! Need something?`);
  }
});

(async function main() {
  await registerCommands();
  await client.login(token);

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  rl.on("line", async (line) => {
    if (line.trim() === "quit") {
      console.log("Shutting down…");
      await client.destroy();
      process.exit(0);
    }
  });
})();
