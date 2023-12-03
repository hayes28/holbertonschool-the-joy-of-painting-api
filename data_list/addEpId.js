const fs = require("fs");
const path = require("path");

// Load the JSON data
const episodesFilePath = path.join(
  __dirname,
  "episodes_with_media.json"
);
const episodesData = require(episodesFilePath);

// Add an episode_id to each episode
let episodeId = 1;
const updatedEpisodesData = episodesData.map((episode) => {
  return { ...episode, episode_id: episodeId++ };
});

// Save the updated data back to the JSON file
fs.writeFileSync(
  episodesFilePath,
  JSON.stringify(updatedEpisodesData, null, 2)
);

console.log("Updated episodes data with episode_id.");
