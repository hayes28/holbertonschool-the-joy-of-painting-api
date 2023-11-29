const fs = require("fs");
const csv = require("csv-parser");

const colorsUsedFilePath =
  "/home/hayes/holbertonschool-the-joy-of-painting-api/data_list/The Joy Of Painiting - Colors Used";
const outputFilePath =
  "/home/hayes/holbertonschool-the-joy-of-painting-api/data_list/Unique_Colors.json";

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
        uniqueColors.set(color.toLowerCase(), hexCodes[index].toLowerCase());
      }
    });
  })
  .on("end", () => {
    // Convert the map to an array of objects
    const colorsData = Array.from(uniqueColors, ([color_name, hex_code]) => ({
      color_name,
      hex_code,
    }));

    // Write the array to a JSON file
    fs.writeFile(
      outputFilePath,
      JSON.stringify(colorsData, null, 2),
      "utf8",
      (err) => {
        if (err) {
          console.error("Error writing file:", err);
          return;
        }
        console.log("Unique colors JSON file has been saved");
      }
    );
  });
