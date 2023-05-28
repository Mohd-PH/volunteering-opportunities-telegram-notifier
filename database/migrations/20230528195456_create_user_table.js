module.exports = {
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  up(knex) {
    return knex.schema.createTable("users", function (table) {
      table.increments("id").index().primary();
      table.string("name").nullable();
      table.string("chat_id").unique();
      table.boolean("active").defaultTo(true);
      table.timestamps(true, true, true);
    });
  },

  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  down(knex) {
    return knex.schema.dropTable("users");
  },
};
