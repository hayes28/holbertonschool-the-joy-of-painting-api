// unique_subjects migration
exports.up = function (knex) {
  return knex.schema.createTable("unique_subjects", (table) => {
    table.increments("id").primary();
    table.string("subject").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("unique_subjects");
};
