module.exports = async (ctx) => {
  await ctx.reply("إعداداتك", {
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
};
