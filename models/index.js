require("../env.js");
const Knex = require("knex");
const knexfile = require("../knexfile.js");
const { Model } = require("objection");
const User = require("./User.js");

const knex = Knex(
  process.env.env == "production" ? knexfile.production : knexfile.development
);

Model.knex(knex);

module.exports = {
  User,
};
