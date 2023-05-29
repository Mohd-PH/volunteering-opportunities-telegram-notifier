const { Model } = require("objection");

class User extends Model {
  static get tableName() {
    return "users";
  }
  static get relationMappings() {
    const Location = require("./Location");
    const Opportunity = require("./Opportunity");
    return {
      locations: {
        relation: Model.ManyToManyRelation,
        modelClass: Location,
        join: {
          from: "users.id",
          through: {
            from: "user_locations.user_id",
            to: "user_locations.location_id",
          },
          to: "locations.id",
        },
      },
      opportunities: {
        relation: Model.ManyToManyRelation,
        modelClass: Opportunity,
        join: {
          from: "users.id",
          through: {
            from: "user_opportunities.user_id",
            to: "user_opportunities.opportunity_id",
          },
          to: "opportunities.id",
        },
      },
    };
  }
}

module.exports = User;
