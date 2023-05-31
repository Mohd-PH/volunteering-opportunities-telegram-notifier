const { Region } = require("../../models/index.js");

module.exports = async (ctx) => {
  const regions = await Region.query();
  await ctx.editMessageText("إختر المنطقة");
  await ctx.editMessageReplyMarkup({
    inline_keyboard: regions.map((region) => {
      return [
        {
          text: region.name_ar,
          callback_data: `display-region-${region.id}-cities`,
        },
      ];
    }),
  });
};
