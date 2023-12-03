// Example migration file for creating the 'episodes' table
exports.up = function (knex) {
  return knex.schema.createTable("episodes", (table) => {
    table.increments("id").primary(); // Auto-incrementing ID
    table.string("title").notNullable();
    table.date("broadcast_date");
    table.string("guest");
    table.string("img_url");
    table.string("youtube_url");
    table.string("painting_index");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("episodes");
};
