const { actionsLogger } = require("../../logger.js");
const { User } = require("../../models/index.js");
const path = require("path");

module.exports = async (ctx) => {
  await ctx.reply("حياك الله " + ctx.message.from.first_name + "!");
  let user = await User.query().findOne({
    telegram_user_id: ctx.message.from.id,
    chat_id: ctx.message.chat.id,
  });
  if (!user) {
    user = await User.query().insertGraph({
      name: ctx.message.from.first_name,
      username: ctx.message.from.username,
      telegram_user_id: ctx.message.from.id,
      chat_id: ctx.message.chat.id,
    });
    actionsLogger.info(`Created user: ${JSON.stringify(user)}`);
  } else {
    actionsLogger.info(`User already created: ${JSON.stringify(user)}`);
  }
  return;
};
