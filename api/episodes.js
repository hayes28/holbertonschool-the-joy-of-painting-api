const fs = require("fs");

const inputFile =
  "/home/hayes/holbertonschool-the-joy-of-painting-api/data_list/The Joy Of Painting - Episode Dates";
const outputFile =
  "/home/hayes/holbertonschool-the-joy-of-painting-api/data_list/The_Joy_Of_Painting_Episode_Dates.json";

fs.readFile(inputFile, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const lines = data.split("\n");
  // regex to handle various guest formats
  const guestRegex =
    /(?:Special guest|Guest Artist:|featuring|Guest:)\s*([^,\n]+)|\((?:Special guest|Guest Artist:|featuring|Guest:)\s*([^)]+)\)/i;

  const episodes = lines.map((line) => {
    const titleMatch = line.match(/"([^"]+)" \(([^)]+)\)/);
    const title = titleMatch ? titleMatch[1].trim() : null;
    const date = titleMatch ? titleMatch[2].trim() : null;

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
  fs.writeFile(outputFile, JSON.stringify(episodes, null, 2), "utf8", (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("JSON file has been saved");
  });
});
