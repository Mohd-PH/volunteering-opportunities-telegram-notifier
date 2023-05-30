const settings = require("../../../bot/commands/settings.js");
test("It sends the settings to the user", () => {
  const ctx = require("../../utils/ctx.js")();
  settings(ctx);
  expect(ctx.reply.mock.calls).toHaveLength(1);
  expect(ctx.reply.mock.calls[0][0]).toBe("إعداداتك");
  expect(ctx.reply.mock.calls[0][1].reply_markup.inline_keyboard).toStrictEqual(
    [
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
    ]
  );
});
