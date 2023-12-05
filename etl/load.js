// Use the logic from knexInsert.js to insert transformed data into the database
// This would likely use knex to build and run the SQL queries
const knex = require('knex')(require('../knexfile').development);

async function insertEpisodes(episodesData) {
  for (const episode of episodesData) {
    await knex("episodes").insert({
      title: episode.title,
      broadcast_date: episode.date,
      guest: episode.guest,
      img_url: episode.img_url,
      youtube_url: episode.youtube_url,
      painting_index: episode.painting_index,
    });
  }
}

async function insertUniqueColors(uniqueColorsData) {
  for (const color of uniqueColorsData) {
    await knex("unique_colors").insert({
      color: color.color,
      hex_code: color.hex_code,
    });
  }
}

async function insertUniqueSubjects(uniqueSubjectsData) {
  for (const subject of uniqueSubjectsData) {
    await knex("unique_subjects").insert({ subject });
  }
}

async function insertEpisodeColors(episodeColorMappings) {
  for (const mapping of episodeColorMappings) {
    // Assume each mapping contains episode_id and an array of color names
    for (const color of mapping.colors) {
      const colorId = await knex("unique_colors")
        .where("color", color)
        .select("id");
      await knex("episode_color").insert({
        episode_id: mapping.episode_id,
        color_id: colorId[0].id,
      });
    }
  }
}

async function insertEpisodeSubjects(episodeSubjectMappings) {
  for (const mapping of episodeSubjectMappings) {
    // Assume each mapping contains episode_id and an array of subjects
    for (const subject of mapping.subjects) {
      const subjectId = await knex("unique_subjects")
        .where("subject", subject)
        .select("id");
      await knex("episode_subject").insert({
        episode_id: mapping.episode_id,
        subject_id: subjectId[0].id,
      });
    }
  }
}

async function loadAllData() {
  const episodesData = require('../data_list/episodes_with_media.json');
  const uniqueColorsData = require('../data_list/unique_colors.json');
  const uniqueSubjectsData = require('../data_list/unique_subjects.json');
  const episodeColorMappings = require('../data_list/episode_color_mappings.json');
  const episodeSubjectMappings = require('../data_list/episode_subject_mappings.json');

  try {
    await insertEpisodes(episodesData);
    console.log("Episodes data inserted");
    await insertUniqueColors(uniqueColorsData);
    console.log("Unique colors data inserted");
    await insertUniqueSubjects(uniqueSubjectsData);
    console.log("Unique subjects data inserted");
    await insertEpisodeColors(episodeColorMappings);
    console.log("Episode colors data inserted");
    await insertEpisodeSubjects(episodeSubjectMappings);
    console.log("Episode subjects data inserted");
  } catch (err) {
    console.error("Error inserting data:", err);
  } finally {
    knex.destroy();
  }
}

loadAllData();

module.exports = {
  insertEpisodes,
  insertUniqueColors,
  insertUniqueSubjects,
  insertEpisodeColors,
  insertEpisodeSubjects,
};
