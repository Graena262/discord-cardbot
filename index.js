console.log("🔥🔥🔥 NEW VERSION 1000");

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

    await interaction.reply({
      content: "TEST1000",
      ephemeral: false,
    });
  }
});

client.login(process.env.TOKEN);
