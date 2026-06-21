client.on("interactionCreate", async (interaction) => {
  try {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "card") {

      // ★即応答（タイムアウト防止）
      await interaction.deferReply();

      // ★処理（将来重くなってもOK）
      const reply = "🎴 会員カード表示OK";

      // ★確定返信
      await interaction.editReply(reply);
    }
  } catch (err) {
    console.error("interaction error:", err);

    // 失敗時も落ちないようにする
    if (interaction.deferred || interaction.replied) {
      await interaction.editReply("エラーが発生しました");
    }
  }
});
