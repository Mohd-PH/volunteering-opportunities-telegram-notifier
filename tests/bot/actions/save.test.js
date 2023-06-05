const save = require("../../../bot/actions/save.js");
const annouceOpportunities = require("../../../bot/annouceOpportunities.js");
jest.mock("../../../bot/annouceOpportunities.js");

describe("save command", () => {
  test("it removes the inline keyboard and send opportunities to the user", async () => {
    const ctx = require("../../utils/ctx.js")();
    ctx.callbackQuery.data = `save`;
    await save(ctx);
    expect(ctx.editMessageText.mock.calls).toHaveLength(1);
    expect(ctx.editMessageText.mock.calls[0][0]).toBe("تم حفظ اعداداتك");
    expect(ctx.editMessageReplyMarkup.mock.calls).toHaveLength(0);
    expect(annouceOpportunities.mock.calls).toHaveLength(1);
    expect(annouceOpportunities.mock.calls[0][0]).toBe(
      ctx.callbackQuery.message.chat.id
    );
  });
});
