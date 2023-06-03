const { TelegramError } = require("telegraf");
const annouceOpportunities = require("../../bot/annouceOpportunities.js");
const { bot } = require("../../bot/index.js");
const { Region, City, Opportunity, User } = require("../../models/index.js");
const faker = require("../utils/faker.js");

describe("Annouce opportunities", () => {
  beforeEach(async () => {
    await require("../utils/migrateDatabase.js")();
    jest.clearAllMocks();
  });

  test("It sends new opportunities to subscribed users", async () => {
    bot.telegram.sendMessage = jest.fn(async (chat_id, message) => null);
    const region = await Region.query().insert(faker.region());
    const city = await City.query().insert(faker.city(region.id));
    const opportunity = await Opportunity.query().insert(
      faker.opportunity(city.id, {
        start_date: new Date(
          new Date().valueOf() - 1000 * 60 * 60 * 24 * 10
        ).toISOString(),
        end_date: new Date(
          new Date().valueOf() + 1000 * 60 * 60 * 24 * 30
        ).toISOString(),
      })
    );
    const user = await User.query().insert(faker.user());
    await user.$relatedQuery("cities").relate(city);

    expect((await user.$relatedQuery("opportunities")).length).toBe(0);

    await annouceOpportunities();

    expect(bot.telegram.sendMessage.mock.calls).toHaveLength(1);
    expect((await user.$relatedQuery("opportunities")).length).toBe(1);
    expect((await user.$relatedQuery("opportunities"))[0].title).toBe(
      opportunity.title
    );
  });

  test("It will not send ended opportunities to subscribed users", async () => {
    bot.telegram.sendMessage = jest.fn(async (chat_id, message) => null);
    const region = await Region.query().insert(faker.region());
    const city = await City.query().insert(faker.city(region.id));
    const opportunities = [
      await Opportunity.query().insert(
        faker.opportunity(city.id, {
          // currently active
          start_date: new Date(
            new Date().valueOf() - 1000 * 60 * 60 * 24 * 10
          ).toISOString(),
          end_date: new Date(
            new Date().valueOf() + 1000 * 60 * 60 * 24 * 30
          ).toISOString(),
        })
      ),
      await Opportunity.query().insert(
        faker.opportunity(city.id, {
          // ended 10 days ago
          start_date: new Date(
            new Date().valueOf() - 1000 * 60 * 60 * 24 * 20
          ).toISOString(),
          end_date: new Date(
            new Date().valueOf() - 1000 * 60 * 60 * 24 * 10
          ).toISOString(),
        })
      ),
      await Opportunity.query().insert(
        faker.opportunity(city.id, {
          // Will start in the future
          start_date: new Date(
            new Date().valueOf() + 1000 * 60 * 60 * 24 * 20
          ).toISOString(),
          end_date: new Date(
            new Date().valueOf() + 1000 * 60 * 60 * 24 * 30
          ).toISOString(),
        })
      ),
    ];

    const user = await User.query().insert(faker.user());
    await user.$relatedQuery("cities").relate(city);

    expect((await user.$relatedQuery("opportunities")).length).toBe(0);

    await annouceOpportunities();

    expect(bot.telegram.sendMessage.mock.calls).toHaveLength(2);
    expect((await user.$relatedQuery("opportunities")).length).toBe(2);
    expect((await user.$relatedQuery("opportunities"))[0].title).toBe(
      opportunities[0].title
    );
  });

  test("It doesn't send new opportunities to if blocked by users", async () => {
    bot.telegram.sendMessage = jest.fn(async (chat_id, message) => {
      throw new TelegramError({
        error_code: 403,
        description: "Forbidden: bot was blocked by the user",
      });
    });

    const region = await Region.query().insert(faker.region());
    const city = await City.query().insert(faker.city(region.id));
    const opportunity = await Opportunity.query().insert(
      faker.opportunity(city.id, {
        start_date: new Date(
          new Date().valueOf() - 1000 * 60 * 60 * 24 * 10
        ).toISOString(),
        end_date: new Date(
          new Date().valueOf() + 1000 * 60 * 60 * 24 * 30
        ).toISOString(),
      })
    );
    const user = await User.query().insert(faker.user());
    await user.$relatedQuery("cities").relate(city);

    expect((await user.$relatedQuery("opportunities")).length).toBe(0);

    await annouceOpportunities();

    expect(bot.telegram.sendMessage.mock.calls).toHaveLength(1);
    expect((await user.$relatedQuery("opportunities")).length).toBe(0);
    expect((await User.query().findById(user.id)).active).toBeFalsy();
  });

  test("It doesn't send full opportunities to users", async () => {
    bot.telegram.sendMessage = jest.fn(async (chat_id, message) => null);

    const region = await Region.query().insert(faker.region());
    const city = await City.query().insert(faker.city(region.id));
    const opportunity = await Opportunity.query().insert(
      faker.opportunity(city.id, {
        accepted_volunteers: 10,
        required_volunteers: 10,
      })
    );
    const user = await User.query().insert(faker.user());
    await user.$relatedQuery("cities").relate(city);

    expect((await user.$relatedQuery("opportunities")).length).toBe(0);

    await annouceOpportunities();

    expect(bot.telegram.sendMessage.mock.calls).toHaveLength(0);
    expect((await user.$relatedQuery("opportunities")).length).toBe(0);
  });

  test("It doesn't send opportunities to users that already has been sent", async () => {
    bot.telegram.sendMessage = jest.fn(async (chat_id, message) => null);

    const region = await Region.query().insert(faker.region());
    const city = await City.query().insert(faker.city(region.id));
    const opportunity = await Opportunity.query().insert(
      faker.opportunity(city.id, {
        start_date: new Date(
          new Date().valueOf() - 1000 * 60 * 60 * 24 * 10
        ).toISOString(),
        end_date: new Date(
          new Date().valueOf() + 1000 * 60 * 60 * 24 * 30
        ).toISOString(),
      })
    );
    const user = await User.query().insert(faker.user());
    await user.$relatedQuery("cities").relate(city);

    expect((await user.$relatedQuery("opportunities")).length).toBe(0);

    await annouceOpportunities();

    expect(bot.telegram.sendMessage.mock.calls).toHaveLength(1);
    expect((await user.$relatedQuery("opportunities")).length).toBe(1);

    await annouceOpportunities();
    await annouceOpportunities();
    await annouceOpportunities();
    await annouceOpportunities();
    await annouceOpportunities();

    expect(bot.telegram.sendMessage.mock.calls).toHaveLength(1);
    expect((await user.$relatedQuery("opportunities")).length).toBe(1);
  });

  test("It sends to user if the user specified", async () => {
    bot.telegram.sendMessage = jest.fn(async (chat_id, message) => null);

    const region = await Region.query().insert(faker.region());
    const city = await City.query().insert(faker.city(region.id));
    const opportunity = await Opportunity.query().insert(
      faker.opportunity(city.id, {
        start_date: new Date(
          new Date().valueOf() - 1000 * 60 * 60 * 24 * 10
        ).toISOString(),
        end_date: new Date(
          new Date().valueOf() + 1000 * 60 * 60 * 24 * 30
        ).toISOString(),
      })
    );
    const user1 = await User.query().insert(faker.user());
    await user1.$relatedQuery("cities").relate(city);
    const user2 = await User.query().insert(faker.user());
    await user2.$relatedQuery("cities").relate(city);

    expect((await user1.$relatedQuery("opportunities")).length).toBe(0);
    expect((await user2.$relatedQuery("opportunities")).length).toBe(0);

    await annouceOpportunities(user1);

    expect(bot.telegram.sendMessage.mock.calls).toHaveLength(1);
    expect((await user1.$relatedQuery("opportunities")).length).toBe(1);
    expect((await user2.$relatedQuery("opportunities")).length).toBe(0);
  });
});
