/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("user_locations", function (table) {
    table.integer("user_id");
    table.foreign("user_id").references("id").inTable("users");
    table.integer("location_id");
    table.foreign("location_id").references("id").inTable("locations");
    table.timestamps(true, true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("user_locations");
};
