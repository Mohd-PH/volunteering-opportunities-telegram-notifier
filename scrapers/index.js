const { knex } = require("../models/index.js");
const { scrape: scrapeMOH } = require("./moh/scrape.js");
const { scrape: scrapeSRCA } = require("./srca/scrape.js");
const annouceOpportunities = require("../bot/annouceOpportunities.js");
const { logger } = require("../logger.js");

const scrape = async () => {
  try {
    logger.info("Starting MOH scraper");
    await scrapeMOH();
    logger.info("Starting SRCA scraper");
    await scrapeSRCA({
      stopAfter: 10,
    });
    logger.info("Finished scraping");

    await annouceOpportunities();

    await knex.destroy();
  } catch (error) {
    logger.error(error);
  }
};

scrape();

module.exports = {
  scrape,
  scrapeMOH,
  scrapeSRCA,
};
