const { REST, Routes, SlashCommandBuilder } = require("discord.js");

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

if (!TOKEN || !CLIENT_ID) {
  console.log("TOKEN or CLIENT_ID missing");
}

const commands = [
  new SlashCommandBuilder()
    .setName("card")
    .setDescription("会員カード表示")
    .toJSON()
];

const rest = new REST({ version: "10" }).setToken(TOKEN);

(async () => {
  try {
    await rest.put(
      Routes.applicationCommands(CLIENT_ID),
      { body: commands }
    );

    console.log("コマンド登録完了");
  } catch (err) {
    console.error("登録失敗:", err);
  }
})();
