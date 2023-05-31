const { Model } = require("objection");

class Opportunity extends Model {
  static get tableName() {
    return "opportunities";
  }
  static get relationMappings() {
    const City = require("./City");
    const User = require("./User");
    return {
      city: {
        relation: Model.BelongsToOneRelation,
        modelClass: City,
        join: {
          from: "opportunities.city_id",
          to: "cities.id",
        },
      },
      users: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: "opportunities.id",
          through: {
            from: "user_opportunities.opportunity_id",
            to: "user_opportunities.user_id",
          },
          to: "users.id",
        },
      },
    };
  }
}

module.exports = Opportunity;
