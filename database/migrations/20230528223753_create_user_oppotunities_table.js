/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("user_opportunities", function (table) {
    table.integer("user_id");
    table.foreign("user_id").references("id").inTable("users");
    table.integer("opportunity_id");
    table.foreign("opportunity_id").references("id").inTable("opportunities");
    table.boolean("notified").defaultsTo(false);
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
