const fs = require("fs");

// Load the episodes data to get valid episode identifiers
const episodesData = JSON.parse(
  fs.readFileSync("../data_list/The_Joy_Of_Painting_Episode_Dates.json", "utf8")
);
const validTitles = new Set(episodesData.map((ep) => ep.title.toLowerCase()));

// Function to check titles in a dataset
function checkTitles(datasetFilePath) {
  const dataset = JSON.parse(fs.readFileSync(datasetFilePath, "utf8"));
  let missingTitles = [];

  dataset.forEach((data) => {
    if (!validTitles.has(data.title.toLowerCase())) {
      missingTitles.push(data.title);
    }
  });

  if (missingTitles.length > 0) {
    console.log(`Titles missing in ${datasetFilePath}:`, missingTitles);
  } else {
    console.log(
      `All titles in ${datasetFilePath} are present in the Episodes dataset.`
    );
  }
}

// Check titles for Subjects and Colors datasets
checkTitles("../data_list/The_Joy_Of_Painting_Subjects.json");
checkTitles("../data_list/The_Joy_Of_Painting_Colors.json");
