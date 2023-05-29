const { Model } = require("objection");

class Opportunity extends Model {
  static get tableName() {
    return "opportunities";
  }
  static get relationMappings() {
    const Location = require("./Location");
    const User = require("./User");
    return {
      region: {
        relation: Model.BelongsToOneRelation,
        modelClass: Location,
        join: {
          from: "opportunities.location_id",
          to: "locations.id",
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
