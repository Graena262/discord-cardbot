console.log("NEW VERSION 2026");
const { Client, GatewayIntentBits } = require("discord.js");
const { createCanvas } = require("canvas");
const fs = require("fs");

// ★起動確認（超重要）
console.log("🔥 INDEX LOADED (NEW VERSION)");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

process.on("unhandledRejection", console.error);
process.on("uncaughtException", console.error);

// コマンド登録
requ
client.once("ready", () => {
  console.log(`🤖 Bot起動: ${client.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {
  try {
    if (!interaction.isChatInputCommand()) return;

    // =====================
    // ■ card（まずデバッグ）
    // =====================
    if (interaction.commandName === "card") {

      // ★ここ超重要：まず到達確認
      console.log("📩 /card received");

      await interaction.reply("NEW CARD VERSION OK");
      return;
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
