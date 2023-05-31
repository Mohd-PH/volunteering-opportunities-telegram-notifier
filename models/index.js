require("../env.js");
const Knex = require("knex");
const knexfile = require("../knexfile.js");
const { Model } = require("objection");
const User = require("./User.js");
const Region = require("./Region.js");
const City = require("./City.js");
const Opportunity = require("./Opportunity.js");

const knex = Knex(
  process.env.ENV == "production"
    ? knexfile.production
    : process.env.ENV == "development"
    ? knexfile.development
    : knexfile.testing
);

Model.knex(knex);

module.exports = {
  User,
  Region,
  City,
  Opportunity,
  knex,
};
