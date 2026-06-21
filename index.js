require("./deploy-commands.js");
const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once("ready", () => {
  console.log(`Bot起動: ${client.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "card") {
    await interaction.reply("🎴 会員カード：YUKA KAI / ID: 000123456 / VIP");
  }
});

client.login(process.env.TOKEN);
