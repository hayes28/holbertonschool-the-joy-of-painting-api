const fs = require("fs");

// Load the episodes data to get valid episode identifiers
const episodesData = JSON.parse(
  fs.readFileSync("../data_list/The_Joy_Of_Painting_Episode_Dates.json", "utf8")
);
const titleToEpisodeIdMap = new Map(
  episodesData.map((ep) => [ep.title.toLowerCase(), ep.episode])
);

function updateDatasetWithEpisodeIds(datasetFilePath) {
  let dataset = JSON.parse(fs.readFileSync(datasetFilePath, "utf8"));
  let updatesMade = 0;

  dataset.forEach((data) => {
    // Use title to find the episode identifier (SXXEXX)
    const episodeId = titleToEpisodeIdMap.get(data.title.toLowerCase());

    if (episodeId) {
      data.episode = episodeId; // Update with the correct episode identifier
      updatesMade++;
    } else {
      // Log a warning if no matching episode identifier is found
      console.warn(`No episode identifier found for title "${data.title}"`);
    }
  });

  // Write the updated dataset back to the file
  fs.writeFileSync(datasetFilePath, JSON.stringify(dataset, null, 2), "utf8");
  console.log(`Updated ${updatesMade} entries in ${datasetFilePath}`);
}

// Update episode identifiers for Subjects and Colors datasets
updateDatasetWithEpisodeIds("../data_list/The_Joy_Of_Painting_Subjects.json");
updateDatasetWithEpisodeIds("../data_list/The_Joy_Of_Painting_Colors.json");
