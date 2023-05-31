const toggleCity = require("../../../bot/actions/toggle-city.js");
const { Region, User } = require("../../../models/index.js");

describe("Start", () => {
  beforeEach(async () => {
    await require("../../utils/migrateDatabase.js")();
  });

  test("It updates user cities when action envoked", async () => {
    const region1 = await Region.query().insert({
      name_en: "region 1",
      name_ar: "region 1 ar",
    });
    const city1 = await region1.$relatedQuery("cities").insert({
      name_en: "city 1",
      name_ar: "city 1 ar",
    });
    const city2 = await region1.$relatedQuery("cities").insert({
      name_en: "city 2",
      name_ar: "city 2 ar",
    });
    const region2 = await Region.query().insert({
      name_en: "region 2",
      name_ar: "region 2 ar",
    });
    const city3 = await region2.$relatedQuery("cities").insert({
      name_en: "city 3",
      name_ar: "city 3 ar",
    });
    const city4 = await region2.$relatedQuery("cities").insert({
      name_en: "city 4",
      name_ar: "city 4 ar",
    });

    const ctx = require("../../utils/ctx.js")();
    ctx.callbackQuery.data = `toggle-city-${city1.id}`;
    let user = await User.query().insertGraph({
      name: ctx.message.from.first_name,
      username: ctx.message.from.username,
      telegram_user_id: ctx.message.from.id,
      chat_id: ctx.message.chat.id,
    });

    await toggleCity(ctx);

    expect(ctx.editMessageText.mock.calls).toHaveLength(1);
    expect(ctx.editMessageText.mock.calls[0][0]).toBe(
      "إختر المدن\n🔴 غير مفعلة\n🟢 مفعلة"
    );
    expect(ctx.editMessageReplyMarkup.mock.calls).toHaveLength(1);

    expect(
      ctx.editMessageReplyMarkup.mock.calls[0][0].inline_keyboard
    ).toStrictEqual([
      [
        {
          text: "🟢 " + city1.name_ar,
          callback_data: `toggle-city-${city1.id}`,
        },
      ],
      [
        {
          text: "🔴 " + city2.name_ar,
          callback_data: `toggle-city-${city2.id}`,
        },
      ],
    ]);

    user = await User.query().findById(user.id).withGraphFetched("cities");
    expect(user.cities.length).toBe(1);
    expect(user.cities[0].id).toBe(city1.id);
    expect(user.cities[0].name_en).toBe(city1.name_en);
  });
});
