const { Model } = require("objection");

class Region extends Model {
  static get tableName() {
    return "regions";
  }
  static get relationMappings() {
    const City = require("./City.js");
    return {
      cities: {
        relation: Model.HasManyRelation,
        modelClass: City,
        join: {
          from: "regions.id",
          to: "cities.region_id",
        },
      },
    };
  }
}

module.exports = Region;
