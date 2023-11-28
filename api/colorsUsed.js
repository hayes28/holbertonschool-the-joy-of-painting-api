const fs = require("fs");
const csv = require("csv-parser");

const colorsUsedFilePath =
  "/home/hayes/holbertonschool-the-joy-of-painting-api/data_list/The Joy Of Painiting - Colors Used";
const outputFilePath =
  "/home/hayes/holbertonschool-the-joy-of-painting-api/data_list/The_Joy_Of_Painting_Colors.json";

const colorsData = [];

fs.createReadStream(colorsUsedFilePath)
  .pipe(csv())
  .on("data", (row) => {
    const season = row.season.padStart(2, "0");
    const episode = row.episode.padStart(2, "0");
    const episodeId = `S${season}E${episode}`;

    const episodeData = {
      painting_index: row.painting_index.toLowerCase(),
      img_src: row.img_src.toLowerCase(),
      title: row.painting_title.toLowerCase(),
      episode: episodeId,
      num_colors: row.num_colors.toLowerCase(),
      youtube_src: row.youtube_src.toLowerCase(),
      colors: parseColors(row.colors), // Function to parse color names
    };

    colorsData.push(episodeData);
  })
  .on("end", () => {
    fs.writeFile(
      outputFilePath,
      JSON.stringify(colorsData, null, 2),
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

function parseColors(colorString) {

  try {
    return colorString
      .match(/\[([^\]]+)\]/)[1]
      .split(",")
      .map((color) => color.trim().replace(/\r\n/g, "").toLowerCase());
  } catch (e) {
    console.error("Error parsing colors:", e);
    return [];
  }
}
