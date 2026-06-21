const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const fs = require("fs");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

// エラー表示
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

    // =====================
    // ■ 会員カード
    // =====================
    if (interaction.commandName === "card") {
      await interaction.deferReply();

      let data = {};
      if (fs.existsSync("./data.json")) {
        data = JSON.parse(fs.readFileSync("./data.json", "utf8"));
      }

      const userId = interaction.user.id;

      if (!data[userId]) {
        data[userId] = {
          memberNo: Object.keys(data).length + 1,
          pokemon: "未設定",
          createdAt: new Date().toISOString()
        };
      }

      const userData = data[userId];

      const displayName =
        interaction.user.globalName ||
        interaction.user.username;

      fs.writeFileSync("./data.json", JSON.stringify(data, null, 2));

      const embed = new EmbedBuilder()
        .setTitle("MEMBER CARD")
        .setColor(0x2f80ed)
        .setThumbnail(interaction.user.displayAvatarURL({ size: 256 }))
        .addFields(
          {
            name: "NAME",
            value: `\`${displayName}\``,
            inline: true
          },
          {
            name: "MEMBER NO",
            value: `#${userData.memberNo}`,
            inline: true
          },
          {
            name: "FAVORITE POKEMON",
            value: userData.pokemon,
            inline: true
          },
          {
            name: "JOIN DATE",
            value: userData.createdAt.split("T")[0],
            inline: false
          }
        )
        // ★カード枠画像
        .setImage("https://i.imgur.com/0Z8XKXy.png")
        .setFooter({ text: "Pokemon Member System" })
        .setTimestamp();

      await interaction.editReply({ embeds: [embed] });
    }

    // =====================
    // ■ ポケモン設定
    // =====================
    if (interaction.commandName === "setpokemon") {
      await interaction.deferReply();

      const pokemon = interaction.options.getString("name");
      const userId = interaction.user.id;

      let data = {};
      if (fs.existsSync("./data.json")) {
        data = JSON.parse(fs.readFileSync("./data.json", "utf8"));
      }

      if (!data[userId]) {
        data[userId] = {
          memberNo: Object.keys(data).length + 1,
          pokemon: "未設定",
          createdAt: new Date().toISOString()
        };
      }

      data[userId].pokemon = pokemon;

      fs.writeFileSync("./data.json", JSON.stringify(data, null, 2));

      await interaction.editReply(`「${pokemon}」に設定したよ`);
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
