const { Model } = require("objection");

class User extends Model {
  static get tableName() {
    return "users";
  }
  static get relationMappings() {
    return {};
  }
}

module.exports = User;
