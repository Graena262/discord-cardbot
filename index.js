const { Client, GatewayIntentBits } = require("discord.js");
const express = require("express");

const app = express();

// Render用のダミーポート
app.get("/", (req, res) => {
  res.send("Bot is running");
});

app.listen(process.env.PORT || 3000);

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once("ready", () => {
  console.log("Bot起動");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "card") {
    await interaction.reply("🎴 会員カード：YUKA KAI / ID: 000123456");
  }
});

client.login(process.env.TOKEN);
