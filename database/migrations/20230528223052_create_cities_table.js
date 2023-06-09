/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("cities", function (table) {
    table.increments("id").index().primary();
    table.string("name_en");
    table.string("name_ar");
    table.integer("region_id").unsigned();
    table.foreign("region_id").references("regions.id");
    table.string("latitude");
    table.string("longitude");
    table.timestamps(true, true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("cities");
};
