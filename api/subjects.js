const fs = require("fs");
const csv = require("csv-parser");

const subjectsFilePath =
  "/home/hayes/holbertonschool-the-joy-of-painting-api/data_list/The Joy Of Painiting - Subject Matter";
const outputFilePath =
  "/home/hayes/holbertonschool-the-joy-of-painting-api/data_list/The_Joy_Of_Painting_Subjects.json";

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
        episode.subjects.push(subject.toLowerCase()); // Convert subject to lowercase
      }
    }

    subjectsData.push(episode);
  })
  .on("end", () => {
    // Write the subjects data array to the output file as JSON
    fs.writeFile(
      outputFilePath,
      JSON.stringify(subjectsData, null, 2),
      "utf8",
      (err) => {
        if (err) {
          console.error("Error writing file:", err);
          return;
        }
        console.log("JSON file has been saved");
      }
    );
  });
