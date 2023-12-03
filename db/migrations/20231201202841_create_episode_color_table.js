exports.up = function (knex) {
    return knex.schema.createTable("episode_color", (table) => {
        table.increments("id").primary();
        table.integer("episode_id").unsigned().notNullable();
        table.foreign("episode_id").references("episodes.id");
        table.integer("color_id").unsigned().notNullable();
        table.foreign("color_id").references("unique_colors.id");
    });
    };

exports.down = function (knex) {
    return knex.schema.dropTable("episode_color");
};
