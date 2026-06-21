client.on("interactionCreate", async (interaction) => {
  try {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "card") {
      await interaction.reply({
        content: "🎴 会員カード表示OK",
        ephemeral: false
      });
    }
  } catch (err) {
    console.error(err);
  }
});
