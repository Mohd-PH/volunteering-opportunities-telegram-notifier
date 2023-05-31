const { Region, User } = require("../../models");

module.exports = async (ctx) => {
  const regionId = ctx.callbackQuery.data.match(
    /display-region-(\d+)-cities/i
  )[1];
  const region = await Region.query()
    .findById(regionId)
    .withGraphFetched("cities");
  const user = await User.query()
    .findOne({
      telegram_user_id: ctx.message.from.id,
      chat_id: ctx.message.chat.id,
    })
    .withGraphFetched("cities");
  await ctx.editMessageText("إختر المدن\n🔴 غير مفعلة\n🟢 مفعلة");
  await ctx.editMessageReplyMarkup({
    inline_keyboard: region.cities.map((city) => {
      const userCity = user.cities.find((userCity) => userCity.id == city.id);
      return [
        {
          text: (userCity ? "🟢 " : "🔴 ") + city.name_ar,
          callback_data: `toggle-city-${city.id}`,
        },
      ];
    }),
  });
};
