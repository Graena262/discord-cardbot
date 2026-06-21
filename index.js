console.log("🔥🔥🔥 NEW VERSION 999");
const { Client, GatewayIntentBits } = require("discord.js");

console.log("🔥 INDEX LOADED");

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once("ready", () => {
  console.log(`🤖 Bot起動: ${client.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "card") {
    console.log("📩 /card received");

    await interaction.reply("NEW CARD VERSION OK");
  }
});

client.login(process.env.TOKEN);
