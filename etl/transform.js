// Logic from organizedData.js, mapTables.js, addEpId.js
// Takes the output from extract.js and applies further transformations
// transform.js
const fs = require('fs');
const path = require('path');

// Assuming the extract.js script has already created these JSON files
const episodesFilePath = path.join(__dirname, '../data_list/The_Joy_Of_Painting_Episode_Dates.json');
const colorsFilePath = path.join(__dirname, '../data_list/The_Joy_Of_Painting_Colors.json');
const subjectsFilePath = path.join(__dirname, '../data_list/The_Joy_Of_Painting_Subjects.json');

const episodesData = require(episodesFilePath);
const colorsData = require(colorsFilePath);
const subjectsData = require(subjectsFilePath);

// Step 1: Add img_url and youtube_url to episodes
function addMediaToEpisodes(episodes, colors) {
  return episodes.map(episode => {
    const colorInfo = colors.find(color => color.title === episode.title);
    return {
      ...episode,
      img_url: colorInfo?.img_src,
      youtube_url: colorInfo?.youtube_src,
      painting_index: colorInfo?.painting_index,
    };
  });
}

// Step 2: Create unique subjects and colors
function extractUniqueSubjects(subjects) {
  return [...new Set(subjects.flatMap(data => data.subjects))];
}

function extractUniqueColors(colors) {
  return [...new Set(colors.flatMap(data => data.colors))];
}

// Step 3: Create episode-subject and episode-color mappings
function createEpisodeSubjectMappings(episodes, subjects) {
  return episodes.map(episode => {
    const episodeSubjects = subjects.find(s => s.title === episode.title)?.subjects || [];
    return {
      episode_id: episode.episode_id, // Make sure episode_id is already present
      subjects: episodeSubjects,
    };
  });
}

function createEpisodeColorMappings(episodes, colors) {
  return episodes.map(episode => {
    const episodeColors = colors.find(c => c.title === episode.title)?.colors.map(color => color.name) || [];
    return {
      episode_id: episode.episode_id, // Make sure episode_id is already present
      colors: episodeColors,
    };
  });
}

// Function to add episode_id to each episode
function addEpisodeIds(episodes) {
  let episodeId = 1; // Start episode IDs at 1 or any other logic you follow
  return episodes.map(episode => {
    return { ...episode, episode_id: episodeId++ };
  });
}

// Transform and save the data
const episodesWithMedia = addMediaToEpisodes(episodesData, colorsData);
const episodesWithIds = addEpisodeIds(episodesWithMedia); // Add episode IDs after adding media
const uniqueSubjects = extractUniqueSubjects(subjectsData);
const uniqueColors = extractUniqueColors(colorsData);
const episodeSubjectMappings = createEpisodeSubjectMappings(episodesWithIds, subjectsData); // Use episodesWithIds
const episodeColorMappings = createEpisodeColorMappings(episodesWithIds, colorsData); // Use episodesWithIds

// Save to JSON files
fs.writeFileSync('episodes_with_media.json', JSON.stringify(episodesWithIds, null, 2)); // Use episodesWithIds
fs.writeFileSync('unique_subjects.json', JSON.stringify(uniqueSubjects, null, 2));
fs.writeFileSync('unique_colors.json', JSON.stringify(uniqueColors, null, 2));
fs.writeFileSync('episode_subject_mappings.json', JSON.stringify(episodeSubjectMappings, null, 2));
fs.writeFileSync('episode_color_mappings.json', JSON.stringify(episodeColorMappings, null, 2));

console.log('Transformation complete and data saved.');
