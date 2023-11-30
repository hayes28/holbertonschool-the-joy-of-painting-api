const { Client } = require("pg");
const episodesData = require("./episodes_with_media.json");
const uniqueColorsData = require("./unique_colors.json");
const uniqueSubjectsData = require("./unique_subjects.json");
const episodeColorsMapData = require("./episode_color_mappings.json");
const episodeSubjectsMapData = require("./episode_subject_mappings.json");
const dotenv = require("dotenv");

dotenv.config();

const client = new Client({
  user: process.env.DB_USER || "hayes",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_DATABASE || "joy_of_painting",
  password: process.env.DB_PASSWORD || "Ikopup",
  port: process.env.DB_PORT || 5432,
});

async function insertData() {
  await client.connect();

  // Insert episodes data
  for (const episode of episodesData) {
    const query =
      "INSERT INTO episodes (title, broadcast_date, guest, img_url, youtube_url, painting_index) VALUES ($1, $2, $3, $4, $5, $6)";
    const values = [
      episode.title,
      episode.date,
      episode.guest,
      episode.img_url,
      episode.youtube_url,
      episode.painting_index,
    ];
    try {
      await client.query(query, values);
    } catch (err) {
      console.error("Insertion error in episodes:", err.stack);
    }
  }

  // Insert unique colors data
  for (const color of uniqueColorsData) {
    const colorQuery =
      "INSERT INTO unique_colors (name, hex_code) VALUES ($1, $2)";
    try {
      await client.query(colorQuery, [color.colors, color.hex_code]);
    } catch (err) {
      console.error("Insertion error in unique colors:", err.stack);
    }
  }

  // Insert unique subjects data
  for (const subject of uniqueSubjectsData) {
    const subjectQuery = "INSERT INTO unique_subjects (name) VALUES ($1)";
    try {
      await client.query(subjectQuery, [subject]);
    } catch (err) {
      console.error("Insertion error in unique subjects:", err.stack);
    }
  }

  // Insert episode-color mappings data
  for (const mapping of episodeColorsMapData) {
    const colorMappingQuery =
      "INSERT INTO episode_color (episode_id, color_id) VALUES ($1, $2)";
    try {
      // Assuming episode_id and color_id are correctly set in your JSON data
      await client.query(colorMappingQuery, [
        mapping.episode_id,
        mapping.color_id,
      ]);
    } catch (err) {
      console.error("Insertion error in episode-color mappings:", err.stack);
    }
  }

  // Insert episode-subject mappings data
  for (const mapping of episodeSubjectsMapData) {
    const subjectMappingQuery =
      "INSERT INTO episode_subject (episode_id, subject_id) VALUES ($1, $2)";
    try {
      // Assuming episode_id and subject_id are correctly set in your JSON data
      await client.query(subjectMappingQuery, [
        mapping.episode_id,
        mapping.subject_id,
      ]);
    } catch (err) {
      console.error("Insertion error in episode-subject mappings:", err.stack);
    }
  }
  await client.end();
}

insertData();
