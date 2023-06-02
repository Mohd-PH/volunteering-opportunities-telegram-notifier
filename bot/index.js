require("../env.js");
const { Telegraf } = require("telegraf");
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

const launchBot = async () => {
  bot.start(require("./commands/start.js"));
  bot.command("settings", require("./commands/settings.js"));

  bot.action("select-region", require("./actions/select-region.js"));
  bot.action(
    /display-region-\d+-cities/,
    require("./actions/display-region-cities.js")
  );
  bot.action(/toggle-city-\d+/, require("./actions/toggle-city.js"));

  bot.launch();
  process.once("SIGINT", () => bot.stop("SIGINT"));
  process.once("SIGTERM", () => bot.stop("SIGTERM"));

  return bot;
};

module.exports = {
  launchBot,
  bot,
};
