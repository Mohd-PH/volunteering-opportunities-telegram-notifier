/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("id").index().primary();
    table.string("telegram_user_id").unique().primary().notNullable();
    table.string("chat_id").unique().primary().notNullable();
    table.string("name").nullable();
    table.string("username").nullable();
    table.boolean("active").defaultTo(true);
    table.timestamps(true, true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
