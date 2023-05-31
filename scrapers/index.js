const { knex } = require("../models/index.js");
const { scrape: scrapeMOH } = require("./moh/scrape.js");
const { scrape: scrapeSRCA } = require("./srca/scrape.js");

const scrape = async () => {
  try {
    console.log("Starting MOH scraper");
    await scrapeMOH();
    console.log("Starting SRCA scraper");
    await scrapeSRCA();
    console.log("Finished scraping");
    await knex.destroy();
  } catch (error) {
    console.error(error);
  }
};

scrape();

module.exports = {
  scrape,
  scrapeMOH,
  scrapeSRCA,
};
