module.exports = async (ctx) => {
  await ctx.reply("ماهي الإعدادات التي تريد تعديلها؟", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "حدد المدن",
            callback_data: "select-region",
          },
        ],
      ],
    },
  });
};
