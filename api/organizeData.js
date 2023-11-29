const episodesData = require("../data_list/The_Joy_Of_Painting_Episode_Dates.json");
const colorsData = require("../data_list/The_Joy_Of_Painting_Colors.json");
const subjectsData = require("../data_list/The_Joy_Of_Painting_Subjects.json");

// Step 1: Add img_url and youtube_url to episodes
const episodesWithMedia = episodesData.map((episode) => {
  const colorInfo = colorsData.find((color) => color.title === episode.title);
  return {
    ...episode,
    img_url: colorInfo?.img_src,
    youtube_url: colorInfo?.youtube_src,
    painting_index: colorInfo?.painting_index,
  };
});

// Step 2: Create unique subjects and colors
const uniqueSubjects = [
  ...new Set(subjectsData.flatMap((data) => data.subjects)),
];
const uniqueColors = [...new Set(colorsData.flatMap((data) => data.colors))];

// Step 3: Create episode-subject and episode-color mappings
const episodeSubjectMappings = subjectsData.map((data) => ({
  episode: data.episode,
  subjects: data.subjects,
}));

const episodeColorMappings = colorsData.map((data) => ({
  episode: data.episode,
  colors: data.colors,
}));

// Convert arrays to JSON and save them to files
const fs = require("fs");
fs.writeFileSync(
  "episodes_with_media.json",
  JSON.stringify(episodesWithMedia, null, 2)
);
fs.writeFileSync(
  "unique_subjects.json",
  JSON.stringify(uniqueSubjects, null, 2)
);
fs.writeFileSync("unique_colors.json", JSON.stringify(uniqueColors, null, 2));
fs.writeFileSync(
  "episode_subject_mappings.json",
  JSON.stringify(episodeSubjectMappings, null, 2)
);
fs.writeFileSync(
  "episode_color_mappings.json",
  JSON.stringify(episodeColorMappings, null, 2)
);
