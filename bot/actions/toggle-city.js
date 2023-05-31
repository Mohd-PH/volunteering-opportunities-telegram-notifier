const { City, User } = require("../../models");
const displayRegionCities = require("./display-region-cities");
module.exports = async (ctx) => {
  try {
    const cityId = ctx.callbackQuery.data.match(/toggle-city-(\d+)/i)[1];
    const city = await City.query().findById(cityId).withGraphFetched("region");
    const user = await User.query()
      .findOne({
        chat_id: ctx.callbackQuery.message.chat.id,
      })
      .withGraphFetched("cities");

    if (user.cities.find((userCity) => userCity.id == city.id)) {
      await user.$relatedQuery("cities").unrelate().where("id", city.id);
    } else {
      await user.$relatedQuery("cities").relate(city);
    }

    ctx.callbackQuery.data = `display-region-${city.region.id}-cities`;
  } catch (error) {
    console.error(error);
    console.error(ctx);
  }
  return displayRegionCities(ctx);
};
