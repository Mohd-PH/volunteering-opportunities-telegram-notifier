const annouceOpportunities = require("../annouceOpportunities");

module.exports = async (ctx) => {
  await ctx.editMessageText("تم حفظ اعداداتك");
  await annouceOpportunities(ctx.callbackQuery.message.chat.id);
  return;
};
