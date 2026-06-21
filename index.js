const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

// 1回だけコマンド登録
require("./deploy-commands.js");

client.once("ready", () => {
  console.log("Bot起動");
});

client.login(process.env.TOKEN);
