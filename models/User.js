const { Model } = require("objection");

class User extends Model {
  static get tableName() {
    return "users";
  }
  static get relationMappings() {
    const City = require("./City");
    const Opportunity = require("./Opportunity");
    return {
      cities: {
        relation: Model.ManyToManyRelation,
        modelClass: City,
        join: {
          from: "users.id",
          through: {
            from: "user_cities.user_id",
            to: "user_cities.city_id",
          },
          to: "cities.id",
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
