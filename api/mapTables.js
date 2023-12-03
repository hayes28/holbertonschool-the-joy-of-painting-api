const fs = require("fs");

const episodesData = require("../data_list/episodes_with_media.json");
const colorsData = require("../data_list/The_Joy_Of_Painting_Colors.json");
const subjectsData = require("../data_list/The_Joy_Of_Painting_Subjects.json");

// Create Episode-Color Mappings
const episodeColorMappings = episodesData.map((episode) => {
  const episodeColors =
    colorsData
      .find((c) => c.title === episode.title)
      ?.colors.map((color) => color.name) || [];
  return {
    episode_id: episode.episode_id,
    colors: episodeColors,
  };
});

// Create Episode-Subject Mappings
const episodeSubjectMappings = episodesData.map((episode) => {
  const episodeSubjects =
    subjectsData.find((s) => s.title === episode.title)?.subjects || [];
  return {
    episode_id: episode.episode_id,
    subjects: episodeSubjects,
  };
});

// Save to JSON files
fs.writeFileSync(
  "episode_color_mappings.json",
  JSON.stringify(episodeColorMappings, null, 2)
);
fs.writeFileSync(
  "episode_subject_mappings.json",
  JSON.stringify(episodeSubjectMappings, null, 2)
);
