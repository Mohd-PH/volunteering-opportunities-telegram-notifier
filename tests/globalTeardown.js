const { knex } = require("../models/index.js");

module.exports = async () => {
  try {
    await knex.destroy();
  } catch (error) {
    console.log(error);
  }
  return;
};
