const fs = require("fs");
const csv = require("csv-parser");

const subjectsFilePath =
  "/home/hayes/holbertonschool-the-joy-of-painting-api/data_list/The Joy Of Painiting - Subject Matter";

const getSubjects = () => {
  try {
    fs.createReadStream(subjectsFilePath)
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

getSubjects();
