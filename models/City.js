const { Model } = require("objection");

class City extends Model {
  static get tableName() {
    return "cities";
  }
  static get relationMappings() {
    const Region = require("./Region.js");
    const Opportunity = require("./Opportunity.js");
    const User = require("./User.js");

    return {
      region: {
        relation: Model.BelongsToOneRelation,
        modelClass: Region,
        join: {
          from: "cities.region_id",
          to: "regions.id",
        },
      },
      opportunities: {
        relation: Model.HasManyRelation,
        modelClass: Opportunity,
        join: {
          from: "cities.id",
          to: "opportunities.location_id",
        },
      },
      users: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: "cities.id",
          through: {
            from: "user_cities.city_id",
            to: "user_cities.user_id",
          },
          to: "users.id",
        },
      },
    };
  }
}

module.exports = City;
