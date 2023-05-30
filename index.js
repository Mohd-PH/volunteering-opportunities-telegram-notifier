require("./env.js");
const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");

const main = async () => {
  const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

  bot.command("quit", async (ctx) => {
    console.log("quitted");
    await ctx.leaveChat();
  });

  bot.start(require("./bot/commands/start.js"));
  bot.command("settings", require("./bot/commands/settings.js"));

  bot.action("edit-locations", async (ctx) => {
    await ctx.reply("editing locations reply");
    await ctx.answerCbQuery("editing locations cb query");
  });

  bot.launch();
  process.once("SIGINT", () => bot.stop("SIGINT"));
  process.once("SIGTERM", () => bot.stop("SIGTERM"));

  return;
};

main();
