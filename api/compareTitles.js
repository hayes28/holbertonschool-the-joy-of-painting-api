const fs = require("fs");
const stringSimilarity = require("string-similarity");

// Load the titles from The_Joy_Of_Painting_Episode_Dates.json
const episodesData = JSON.parse(
  fs.readFileSync("../data_list/The_Joy_Of_Painting_Episode_Dates.json", "utf8")
);
const episodeTitles = episodesData.map((ep) => ep.title);

function alignTitles(datasetFilePath) {
  let dataset = JSON.parse(fs.readFileSync(datasetFilePath, "utf8"));

  dataset = dataset.map((data) => {
    let bestMatch = stringSimilarity.findBestMatch(
      data.title,
      episodeTitles
    ).bestMatch;

    // Log changes for manual review
    if (bestMatch.rating > 0.8 && bestMatch.target !== data.title) {
      console.log(`Updating title: ${data.title} to ${bestMatch.target}`);
      data.title = bestMatch.target;
    }

    return data;
  });

  // Write the updated dataset back to the file
  fs.writeFileSync(datasetFilePath, JSON.stringify(dataset, null, 2), "utf8");
}

// Align titles for Subjects and Colors datasets
alignTitles("../data_list/The_Joy_Of_Painting_Subjects.json");
alignTitles("../data_list/The_Joy_Of_Painting_Colors.json");
