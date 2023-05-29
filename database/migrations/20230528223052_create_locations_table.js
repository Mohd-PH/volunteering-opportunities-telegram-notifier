/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("locations", function (table) {
    table.increments("id").index().primary();
    table.string("name");
    table.integer("region_id");
    table.foreign("region_id").references("id").inTable("regions");
    table.timestamps(true, true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("locations");
};
