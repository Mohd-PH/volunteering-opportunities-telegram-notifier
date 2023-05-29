const { Model } = require("objection");

class Region extends Model {
  static get tableName() {
    return "regions";
  }
  static get relationMappings() {
    const Location = require("./Location.js");
    return {
      locations: {
        relation: Model.HasManyRelation,
        modelClass: Location,
        join: {
          from: "regions.id",
          to: "locations.region_id",
        },
      },
    };
  }
}

module.exports = Region;
