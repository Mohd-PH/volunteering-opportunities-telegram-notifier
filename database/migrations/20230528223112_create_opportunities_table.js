/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("opportunities", function (table) {
    table.increments("id").index().primary();
    table.string("source_id");
    table.string("source");
    table.string("title");
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
  return knex.schema.dropTable("opportunities");
};
