const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const fs = require("fs");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

// エラー可視化
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

      // 初回登録
      if (!data[userId]) {
        data[userId] = {
          memberNo: Object.keys(data).length + 1,
          pokemon: "未設定",
          createdAt: new Date().toISOString()
        };
      }

      const userData = data[userId];

      // 安全な名前取得
      const displayName =
        interaction.member?.displayName ||
        interaction.user.globalName ||
        interaction.user.username;

      // ポケモン安全処理
      const pokemonRaw = userData?.pokemon ?? "未設定";
      const pokemon = pokemonRaw.toLowerCase();

      const imageUrl =
        pokemonRaw !== "未設定"
          ? `https://img.pokemondb.net/artwork/large/${pokemon}.jpg`
          : null;

      fs.writeFileSync("./data.json", JSON.stringify(data, null, 2));

      const embed = new EmbedBuilder()
        .setTitle("🎴 会員カード")
        .setColor(0x00bfff)
        .setThumbnail(interaction.user.displayAvatarURL())
        .addFields(
          {
            name: "会員No.",
            value: String(userData.memberNo),
            inline: true
          },
          {
            name: "名前",
            value: displayName,
            inline: true
          },
          {
            name: "好きなポケモン",
            value: userData.pokemon,
            inline: true
          },
          {
            name: "入会日",
            value: userData.createdAt.split("T")[0],
            inline: false
          }
        )
        .setFooter({ text: "Member Card System" });

      if (imageUrl) {
        embed.setImage(imageUrl);
      }

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

      await interaction.editReply(`🐾 好きなポケモンを「${pokemon}」に設定したよ`);
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
