const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

// ★コマンド登録を強制実行
require("./deploy-commands.js");

client.once("ready", () => {
  console.log("Bot起動");
});

client.login(process.env.TOKEN);
