const { Client, GatewayIntentBits } = require("discord.js");
const { createCanvas } = require("canvas");
const fs = require("fs");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

process.on("unhandledRejection", console.error);
process.on("uncaughtException", console.error);

require("./deploy-commands.js");

client.once("ready", () => {
  console.log(`Bot起動: ${client.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {
  try {
    if (!interaction.isChatInputCommand()) return;

    // =====================
    // ■ 会員カード（画像生成）
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
          pokemon: "pikachu",
          createdAt: new Date().toISOString()
        };
      }

      const userData = data[userId];

      const displayName =
        interaction.user.globalName ||
        interaction.user.username;

      fs.writeFileSync("./data.json", JSON.stringify(data, null, 2));

      // =====================
      // ■ Canvasカード生成
      // =====================
      const canvas = createCanvas(600, 900);
      const ctx = canvas.getContext("2d");

      // 背景
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(0, 0, 600, 900);

      // 枠
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 6;
      ctx.strokeRect(20, 20, 560, 860);

      // タイトル
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 40px Sans";
      ctx.fillText("MEMBER CARD", 120, 80);

      // 名前
      ctx.font = "28px Sans";
      ctx.fillText(`NAME: ${displayName}`, 50, 200);

      // 会員No
      ctx.fillText(`ID: #${userData.memberNo}`, 50, 270);

      // ポケモン
      ctx.fillText(`POKEMON: ${userData.pokemon}`, 50, 340);

      // 日付
      ctx.fillText(`DATE: ${userData.createdAt.split("T")[0]}`, 50, 410);

      const buffer = canvas.toBuffer();

      await interaction.editReply({
        files: [{ attachment: buffer, name: "card.png" }]
      });
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
          pokemon: "pikachu",
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
