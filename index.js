const { User, Region } = require("./models/index.js");
require("./env.js");
const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");

const main = async () => {
  const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

  bot.command("quit", async (ctx) => {
    console.log("quitted");
    await ctx.leaveChat();
  });

  bot.start(async (ctx) => {
    await ctx.reply("حياك الله " + ctx.message.from.first_name + "!");
    ctx.message.from.first_name;
    let user = await User.query().findOne({
      telegram_user_id: ctx.message.from.id,
      chat_id: ctx.message.chat.id,
    });
    console.log(user);
    if (!user) {
      user = await User.query().insertGraph({
        name: ctx.message.from.first_name,
        username: ctx.message.from.username,
        telegram_user_id: ctx.message.from.id,
        chat_id: ctx.message.chat.id,
      });
      console.log(`Created user: ${JSON.stringify(user)}`);
    } else {
      console.log(`User already created: ${JSON.stringify(user)}`);
    }
  });

  bot.action("edit-locations", async (ctx) => {
    await ctx.reply("editing locations reply");
    await ctx.answerCbQuery("editing locations cb query");
  });

  bot.command("settings", async (ctx) => {
    ctx.reply("اعداداتك", {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "المدن",
              callback_data: "edit-locations",
            },
            {
              text: "المناطق",
              callback_data: "edit-regions",
            },
          ],
        ],
      },
    });
  });

  bot.launch();
  process.once("SIGINT", () => bot.stop("SIGINT"));
  process.once("SIGTERM", () => bot.stop("SIGTERM"));

  return;
};

main();
