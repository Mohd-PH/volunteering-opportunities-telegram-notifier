const axios = require("axios");
const { scrape } = require("../../../scrapers/srca/scrape.js");
const { Region, City, Opportunity } = require("../../../models/index.js");

jest.mock("axios");
describe("SRCA scraper test", () => {
  beforeEach(async () => {
    await require("../../utils/migrateDatabase.js")();
  });

  test("It gets the regions, cities and opportunities", async () => {
    const regions = require("./regions.json");
    const cities = require("./cities.json");
    const opportunities1 = require("./opportunities1.json");
    const opportunities2 = require("./opportunities2.json");

    axios.get.mockImplementation((url) => {
      if (url.match(/regionsRegistration/i)) {
        return Promise.resolve({ data: regions });
      }
      if (url.match(/citiesRegistration/i)) {
        return Promise.resolve({ data: cities });
      }
      if (url.match(/eventsbyPageWithRegionsCities\/1/i)) {
        return Promise.resolve({ data: opportunities1 });
      }
      if (url.match(/eventsbyPageWithRegionsCities\/2/i)) {
        return Promise.resolve({ data: opportunities2 });
      }
      if (url.match(/eventsCountWithRegionsCities/i)) {
        return Promise.resolve({ data: 24 });
      }
    });

    await scrape();
    const regionsInDB = await Region.query();
    expect(regionsInDB.length).toBe(regions.length);
    const citiesInDB = await City.query();
    expect(citiesInDB.length).toBe(154); // 154 unique english city name
    const opportunitiesInDB = await Opportunity.query().withGraphFetched(
      "city.region"
    );
    expect(opportunitiesInDB.length).toBe(
      opportunities1.length + opportunities2.length
    );
    expect(opportunitiesInDB[0].city.name_en).toBe("Mecca");
    expect(opportunitiesInDB[0].city.region.name_en).toBe("Mecca");
  });
});
