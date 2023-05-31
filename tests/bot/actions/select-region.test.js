const selectRegion = require("../../../bot/actions/select-region.js");
const { Region } = require("../../../models/index.js");

describe("Start", () => {
  beforeEach(async () => {
    await require("../../utils/migrateDatabase.js")();
  });

  test("It sends the regions list when action envoked", async () => {
    const region1 = await Region.query().insert({
      name_en: "region 1",
      name_ar: "region 1 ar",
    });
    const region2 = await Region.query().insert({
      name_en: "region 2",
      name_ar: "region 2 ar",
    });
    const ctx = require("../../utils/ctx.js")();
    await selectRegion(ctx);
    expect(ctx.editMessageText.mock.calls).toHaveLength(1);
    expect(ctx.editMessageText.mock.calls[0][0]).toBe("إختر المنطقة");
    expect(ctx.editMessageReplyMarkup.mock.calls).toHaveLength(1);

    expect(
      ctx.editMessageReplyMarkup.mock.calls[0][0].inline_keyboard
    ).toStrictEqual([
      [
        {
          text: region1.name_ar,
          callback_data: `display-region-${region1.id}-cities`,
        },
      ],
      [
        {
          text: region2.name_ar,
          callback_data: `display-region-${region2.id}-cities`,
        },
      ],
    ]);
  });
});
