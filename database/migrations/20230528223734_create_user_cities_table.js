/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("user_cities", function (table) {
    table.integer("user_id").unsigned();
    table.foreign("user_id").references("users.id");
    table.integer("city_id").unsigned();
    table.foreign("city_id").references("cities.id");
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
