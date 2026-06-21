const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

// エラー可視化（超重要）
process.on("unhandledRejection", console.error);
process.on("uncaughtException", console.error);

// コマンド登録（起動時に1回）
require("./deploy-commands.js");

client.once("ready", () => {
  console.log(`Bot起動: ${client.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {
  try {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "card") {
      console.log("card受信");

      await interaction.deferReply().catch(console.error);

      await interaction.editReply("🎴 会員カード表示OK").catch(console.error);

      console.log("card完了");
    }
  } catch (err) {
    console.error("interaction error:", err);

    try {
      if (interaction.deferred || interaction.replied) {
        await interaction.editReply("エラーが発生しました");
      }
    } catch (e) {
      console.error("fallback error:", e);
    }
  }
});

client.login(process.env.TOKEN);
