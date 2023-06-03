const { bot } = require("./index.js");
const { Opportunity, User } = require("../models/index.js");
const { logger, actionsLogger } = require("../logger.js");

module.exports = async (sendUser = null) => {
  const opportunities = await Opportunity.query()
    .where("end_date", ">=", new Date().toISOString())
    .withGraphFetched("city.users");

  for (const opportunity of opportunities) {
    if (opportunity.accepted_volunteers >= opportunity.required_volunteers) {
      continue;
    }
    for (const user of opportunity.city.users) {
      try {
        if (sendUser && sendUser.id != user.id) {
          continue;
        }
        const alreadySent =
          (
            await user
              .$relatedQuery("opportunities")
              .where("id", opportunity.id)
          ).length > 0;
        if (!alreadySent) {
          await bot.telegram.sendMessage(user.chat_id, "message");
          await user.$relatedQuery("opportunities").relate(opportunity);
        }
      } catch (error) {
        if (
          error.response.error_code == 403 &&
          error.response.description == "Forbidden: bot was blocked by the user"
        ) {
          await User.query().patchAndFetchById(user.id, { active: false });
          actionsLogger.info(`User ${user.name} blocked the bot, deactivated`);
        } else {
          logger.error(error);
        }
      }
    }
  }
};
