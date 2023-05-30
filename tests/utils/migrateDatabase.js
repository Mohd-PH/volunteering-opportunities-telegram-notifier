const path = require("path");
const { knex } = require("../../models/index.js");

module.exports = async () => {
  try {
    await knex.migrate.rollback({
      directory: path.join(__dirname, "..", "..", "database", "migrations"),
    });
    await knex.migrate.latest({
      directory: path.join(__dirname, "..", "..", "database", "migrations"),
    });
  } catch (error) {
    console.log(error);
  }
  return;
};
