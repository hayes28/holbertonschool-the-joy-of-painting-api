const {
  extractColors,
  extractEpisodes,
  extractSubjects,
} = require("./extract");
const {
  transformColors,
  transformEpisodes,
  transformSubjects,
} = require("./transform");
const { loadColors, loadEpisodes, loadSubjects } = require("./load");

(async () => {
  // Extraction
  console.log("Starting data extraction...");
  await extractColors();
  await extractEpisodes();
  await extractSubjects();
  console.log("Data extraction complete.");

  // Transformation
  console.log("Starting data transformation...");
  await transformColors();
  await transformEpisodes();
  await transformSubjects();
  console.log("Data transformation complete.");

  // Loading
  console.log("Starting data loading...");
  await loadColors();
  await loadEpisodes();
  await loadSubjects();
  console.log("Data loading complete.");

  console.log("ETL process completed successfully.");
})().catch((err) => {
  console.error("ETL process failed:", err);
});
