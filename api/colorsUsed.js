const fs = require("fs");

const colorsFilePath =
  "/home/hayes/holbertonschool-the-joy-of-painting-api/data_list/The_Joy_Of_Painting_Colors.json";

function parseColors(colorArray) {
  return colorArray.map((color) =>
    color
      .replace(/[\[\]'\\]/g, "") // Remove brackets, quotes, and backslashes
      .trim()
      .toLowerCase()
  );
}

// Read the colors data from the updated JSON file
let colorsData = JSON.parse(fs.readFileSync(colorsFilePath, "utf8"));

// Process each entry to fix the colors formatting
colorsData.forEach((entry) => {
  entry.colors = parseColors(entry.colors);
});

// Write the updated data back to the JSON file
fs.writeFileSync(colorsFilePath, JSON.stringify(colorsData, null, 2), "utf8");
console.log("Updated colors data saved.");
