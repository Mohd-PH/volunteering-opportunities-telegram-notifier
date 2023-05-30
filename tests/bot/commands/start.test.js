const start = require("../../../bot/commands/start.js");
const User = require("../../../models/User.js");
describe("Start", () => {
  beforeEach(async () => {
    await require("../../utils/migrateDatabase.js")();
  });

  test("It stores the user when they sign up", async () => {
    const ctx = require("../../utils/ctx.js")();
    await start(ctx);
    expect(ctx.reply.mock.calls).toHaveLength(1);
    expect(ctx.reply.mock.calls[0][0]).toBe(
      "حياك الله " + ctx.message.from.first_name + "!"
    );

    const users = await User.query();
    expect(users.length).toBe(1);
    expect(users[0].name).toBe(ctx.message.from.first_name);
    expect(users[0].telegram_user_id).toBe(ctx.message.from.id.toString());
    expect(users[0].chat_id).toBe(ctx.message.chat.id.toString());
    expect(users[0].active).toBe(1);
  });

  test("It doesn't store the user when they sign up", async () => {
    const ctx = require("../../utils/ctx.js")();
    await start(ctx);
    await start(ctx);
    await start(ctx);
    await start(ctx);
    await start(ctx);
    await start(ctx);
    expect(ctx.reply.mock.calls).toHaveLength(6);
    expect(ctx.reply.mock.calls[0][0]).toBe(
      "حياك الله " + ctx.message.from.first_name + "!"
    );

    const users = await User.query();
    expect(users.length).toBe(1);
    expect(users[0].name).toBe(ctx.message.from.first_name);
    expect(users[0].telegram_user_id).toBe(ctx.message.from.id.toString());
    expect(users[0].chat_id).toBe(ctx.message.chat.id.toString());
    expect(users[0].active).toBe(1);
  });
});
