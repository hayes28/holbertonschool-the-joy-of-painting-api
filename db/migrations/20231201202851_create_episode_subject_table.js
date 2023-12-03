exports.up = function (knex) {
    return knex.schema.createTable("episode_subject", (table) => {
        table.increments("id").primary();
        table.integer("episode_id").unsigned().notNullable();
        table.foreign("episode_id").references("episodes.id");
        table.integer("subject_id").unsigned().notNullable();
        table.foreign("subject_id").references("unique_subjects.id");
    });
    };

exports.down = function (knex) {
    return knex.schema.dropTable("episode_subject");
};
