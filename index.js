const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once("ready", () => {
  console.log("Bot起動");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "card") {
    await interaction.reply(
      "🎴 会員カード\n名前: YUKA KAI\nID: 000123456\nランク: VIP"
    );
  }
});

client.login(process.env.TOKEN);
