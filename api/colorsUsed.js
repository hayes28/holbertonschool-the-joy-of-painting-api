const fs = require("fs");
const csv = require("csv-parser");

const colorsUsedFilePath =
  "/home/hayes/holbertonschool-the-joy-of-painting-api/data_list/The Joy Of Painiting - Colors Used";

const getColorsUsed = () => {
  try {
    fs.createReadStream(colorsUsedFilePath)
      .pipe(csv())
      .on("data", (row) => {
        console.log(row);
      })
      .on("end", () => {
        console.log("CSV file successfully processed");
      });
  } catch (error) {
    console.error("Error reading file:", error);
  }
};

getColorsUsed();
