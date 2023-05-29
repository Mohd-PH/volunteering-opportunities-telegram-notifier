const { Model } = require("objection");

class Location extends Model {
  static get tableName() {
    return "locations";
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
          from: "locations.region_id",
          to: "regions.id",
        },
      },
      opportunities: {
        relation: Model.HasManyRelation,
        modelClass: Opportunity,
        join: {
          from: "locations.id",
          to: "opportunities.location_id",
        },
      },
      users: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: "locations.id",
          through: {
            from: "user_locations.location_id",
            to: "user_locations.user_id",
          },
          to: "users.id",
        },
      },
    };
  }
}

module.exports = Location;
