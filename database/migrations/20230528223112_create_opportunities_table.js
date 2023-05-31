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
    table.integer("city_id");
    table.foreign("city_id").references("id").inTable("cities");
    table.text("description", "mediumtext");
    table.date("start_date");
    table.date("end_date");
    table.text("department_name_en");
    table.text("department_name_ar");
    table.text("location");
    table.integer("accepted_volunteers");
    table.integer("required_volunteers");
    table.boolean("is_invitation_full");
    table.text("event_leader_name");
    table.text("event_leader_phone");
    table.text("event_leader_email");
    table.text("type_ar");
    table.text("type_en");
    table.text("category_en");
    table.text("category_ar");
    table.text("gender");
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
