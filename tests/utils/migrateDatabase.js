const path = require("path");
const { knex } = require("../../models/index.js");
const { logger } = require("../../logger.js");

module.exports = async () => {
  try {
    await knex.migrate.rollback({
      directory: path.join(__dirname, "..", "..", "database", "migrations"),
    });
    await knex.migrate.latest({
      directory: path.join(__dirname, "..", "..", "database", "migrations"),
    });
  } catch (error) {
    logger.error(error);
  }
  return;
};
