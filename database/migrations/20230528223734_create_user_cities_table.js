/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("user_cities", function (table) {
    table.integer("user_id");
    table.foreign("user_id").references("id").inTable("users");
    table.integer("city_id");
    table.foreign("city_id").references("id").inTable("cities");
    table.timestamps(true, true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("user_cities");
};
