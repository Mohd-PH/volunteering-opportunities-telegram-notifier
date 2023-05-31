const axios = require("axios");
const { scrape } = require("../../../scrapers/moh/scrape.js");
const { Region, City, Opportunity } = require("../../../models/index.js");

jest.mock("axios");
describe("MOH scraper test", () => {
  beforeEach(async () => {
    await require("../../utils/migrateDatabase.js")();
  });

  test("It gets the regions, cities and opportunities", async () => {
    const regions = require("./regions.json");
    const cities = require("./cities.json");
    const opportunities = require("./opportunities.json");

    axios.get.mockImplementation((url) => {
      if (url.match(/regionsRegistration/i)) {
        return Promise.resolve({ data: regions });
      }
      if (url.match(/citiesRegistration/i)) {
        return Promise.resolve({ data: cities });
      }
      if (url.match(/privateEventsbyPageWithRegionsCitiesSQL/i)) {
        return Promise.resolve({ data: opportunities });
      }
    });

    await scrape();
    const regionsInDB = await Region.query();
    expect(regionsInDB.length).toBe(regions.length);
    const citiesInDB = await City.query();
    expect(citiesInDB.length).toBe(172); // 172 unique english city name
    const opportunitiesInDB = await Opportunity.query().withGraphFetched(
      "city.region"
    );
    expect(opportunitiesInDB.length).toBe(opportunities.length);
    expect(opportunitiesInDB[0].city.name_en).toBe("Dammam");
    expect(opportunitiesInDB[0].city.region.name_en).toBe("Eastern Province");
  });
});
