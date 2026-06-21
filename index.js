const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

// エラー可視化（重要）
process.on("unhandledRejection", console.error);
process.on("uncaughtException", console.error);

// コマンド登録
require("./deploy-commands.js");

client.once("ready", () => {
  console.log(`Bot起動: ${client.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {
  try {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "card") {
      await interaction.deferReply();

      const embed = {
        title: "🎴 会員カード",
        color: 0x00bfff,
        fields: [
          {
            name: "名前",
            value: interaction.user.username,
            inline: true
          },
          
        ],
        thumbnail: {
          url: interaction.user.displayAvatarURL()
        },
        footer: {
          text: "Card System"
        }
      };

      await interaction.editReply({
        embeds: [embed]
      });

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
