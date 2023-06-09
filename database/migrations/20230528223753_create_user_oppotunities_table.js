/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("user_opportunities", function (table) {
    table.integer("user_id").unsigned();
    table.foreign("user_id").references("users.id");
    table.integer("opportunity_id").unsigned();
    table.foreign("opportunity_id").references("opportunities.id");
    table.timestamps(true, true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("user_opportunities");
};
