const { logger } = require("../logger.js");
const { knex } = require("../models/index.js");

module.exports = async () => {
  try {
    await knex.destroy();
  } catch (error) {
    logger.error(error);
  }
  return;
};
