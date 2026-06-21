console.log("🚨 IMAGE VERSION LOADED");

const {
  Client,
  GatewayIntentBits,
  AttachmentBuilder
} = require("discord.js");

const { createCanvas } = require("canvas");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once("ready", () => {
  console.log(`🤖 Bot起動: ${client.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "card") {

    console.log("📩 /card received");

    const canvas = createCanvas(800, 500);
    const ctx = canvas.getContext("2d");

    // 背景
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 800, 500);

    // 黒枠
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 8;
    ctx.strokeRect(10, 10, 780, 480);

    // タイトル帯
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, 800, 80);

    // タイトル
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 40px Sans";
    ctx.fillText("MEMBER CARD", 30, 50);

    ctx.font = "24px Sans";
    ctx.fillText("こわおねランド", 30, 75);

    // テスト文字
    ctx.fillStyle = "#000000";
    ctx.font = "32px Sans";
    ctx.fillText("画像生成テスト成功", 220, 260);

    const attachment = new AttachmentBuilder(
      canvas.toBuffer(),
      { name: "member-card.png" }
    );

    await interaction.reply({
      files: [attachment]
    });
  }
});

client.login(process.env.TOKEN);
