// Logic from colorsUsed.js, episodes.js, subjects.js
// Each function reads the respective raw data file and outputs structured JSON
const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");
const util = require("util");
const writeFile = util.promisify(fs.writeFile);

const colorsUsedFilePath = path.join(
  __dirname,
  "../data_list/The Joy Of Painiting - Colors Used"
);
const episodesFilePath = path.join(
  __dirname,
  "../data_list/The Joy Of Painting - Episode Dates"
);
const subjectsFilePath = path.join(
  __dirname,
  "../data_list/The Joy Of Painiting - Subject Matter"
);

const outputColorsFilePath = path.join(
  __dirname,
  "../data_list/Unique_Colors.json"
);
const outputEpisodesFilePath = path.join(
  __dirname,
  "../data_list/The_Joy_Of_Painting_Episode_Dates.json"
);
const outputSubjectsFilePath = path.join(
  __dirname,
  "../data_list/The_Joy_Of_Painting_Subjects.json"
);

// Normalize episode titles
function normalizeTitle(title) {
  // Implement any specific title normalization logic
  return title.replace(/\bMount\b/gi, "Mt.").toLowerCase();
}

function extractColors() {
  return new Promise((resolve, reject) => {
    const uniqueColors = new Map();
    fs.createReadStream(colorsUsedFilePath)
      .pipe(csv())
      .on("data", (row) => {
        // Extract color names and hex codes
        const colorNames = row.colors
          .match(/'([^']+)'/g)
          .map((str) => str.replace(/'/g, ""));
        const hexCodes = row.color_hex
          .match(/'([^']+)'/g)
          .map((str) => str.replace(/'/g, ""));
        // Add unique colors to the map
        colorNames.forEach((color, index) => {
          if (!uniqueColors.has(color.toLowerCase())) {
            uniqueColors.set(
              color.toLowerCase(),
              hexCodes[index].toLowerCase()
            );
          }
        });
      })
      .on("end", () => {
        const colorsData = Array.from(
          uniqueColors,
          ([color_name, hex_code]) => ({ color_name, hex_code })
        );
        writeFile(
          outputColorsFilePath,
          JSON.stringify(colorsData, null, 2),
          "utf8"
        )
          .then(() => {
            console.log("Unique colors JSON file has been saved");
            resolve();
          })
          .catch((err) => reject(err));
      });
  });
}

// Extract episode and guest data
function extractEpisodes() {
  return new Promise((resolve, reject) => {
    fs.readFile(episodesFilePath, "utf8", (err, data) => {
      if (err) {
        reject(err);
        return;
      }
    const lines = data.split("\n");
    // regex to handle various guest formats
    const guestRegex =
      /(?:Special guest|Guest Artist:|featuring|Guest:)\s*([^,\n]+)|\((?:Special guest|Guest Artist:|featuring|Guest:)\s*([^)]+)\)/i;

    const episodes = lines.map((line) => {
      const titleMatch = line.match(/"([^"]+)" \(([^)]+)\)/);
      let title = titleMatch ? normalizeTitle(titleMatch[1].trim()) : null;
      let date = titleMatch ? new Date(titleMatch[2].trim()) : null;
      date = date ? date.toISOString().split("T")[0] : null;

      let guest = null;
      if (title && date) {
        const guestMatch = line.match(guestRegex);
        if (guestMatch) {
          guest = guestMatch[1]
            ? guestMatch[1].trim()
            : guestMatch[2]
            ? guestMatch[2].trim()
            : null;
        }
      }

      return {
        title,
        date,
        guest,
      };
    });

    // Write the episodes array to the output file as JSON
    writeFile(outputEpisodesFilePath, JSON.stringify(episodes, null, 2), "utf8")
        .then(() => {
          console.log("JSON file has been saved");
          resolve();
        })
        .catch(err => reject(err));
    });
  });
}

// Extract subject data
function extractSubjects() {
  return new Promise((resolve, reject) => {
    const subjectsData = [];
    fs.createReadStream(subjectsFilePath)
      .pipe(csv())
      .on("data", (row) => {
      // Transform row data
      const episode = {
        episode: row.EPISODE,
        title: row.TITLE.replace(/"/g, "").toLowerCase(),
        subjects: [],
      };
      // Add subjects present in the episode
      for (let subject in row) {
        if (
          row[subject] === "1" &&
          subject !== "EPISODE" &&
          subject !== "TITLE"
        ) {
          episode.subjects.push(subject.toLowerCase());
        }
      }

      subjectsData.push(episode);
    })
      .on("end", () => {
        writeFile(outputSubjectsFilePath, JSON.stringify(subjectsData, null, 2), "utf8")
          .then(() => {
            console.log("JSON file has been saved");
            resolve();
          })
          .catch(err => reject(err));
      });
  });
}

module.exports = {
  extractColors,
  extractEpisodes,
  extractSubjects,
};
