exports.up = function (knex) {
  return knex.schema.createTable("unique_colors", (table) => {
    table.increments("id").primary();
    table.string("color").notNullable();
    table.string("hex_code");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("unique_colors");
};
