const express = require("express");
const app = express();
const { extractTransformLoad } = require("./etl");

// Middleware
app.use(express.json()); // Parse JSON bodies (as sent by API clients)

// Database connection
// Add an endpoint to trigger the ETL process
app.get("/run-etl", async (req, res) => {
  try {
    await extractTransformLoad(); // Call the ETL function
    res.status(200).send("ETL process completed successfully.");
  } catch (error) {
    console.error("ETL process failed:", error);
    res.status(500).send("ETL process failed.");
  }
});

// Add an endpoint to get all episodes by broadcast date
app.get("/episodes/by-month", async (req, res) => {
  try {
    // Initialize an empty array for the query conditions
    const conditions = [];

    // Add month condition if provided
    if (req.query.month) {
      conditions.push(
        knex.raw("EXTRACT(MONTH FROM broadcast_date) = ?", [req.query.month])
      );
    }

    // Add year condition if provided
    if (req.query.year) {
      conditions.push(
        knex.raw("EXTRACT(YEAR FROM broadcast_date) = ?", [req.query.year])
      );
    }

    // Build the query with all conditions
    let query = knex("episodes");
    conditions.forEach((condition) => {
      query = query.where(condition);
    });

    // Execute the query and get the result
    const episodes = await query;

    // Send the result back to the client as JSON
    res.json(episodes);
  } catch (error) {
    // Log the error and send a 500 Internal Server Error response
    console.error("Error getting episodes:", error);
    res.status(500).send("Error getting episodes.");
  }
});


// Add an endpoint to get all episodes by color
app.get("/episodes/by-color", async (req, res) => {
  try {
    // Assume that req.query.colors is an array of color names
    const colorNames = req.query.colors;

    // Find the IDs of the colors
    const colorIds = await knex("unique_colors")
      .whereIn("color", colorNames)
      .select("id");

    // Map the color IDs to a list
    const colorIdList = colorIds.map((color) => color.id);

    // Find episodes that have these color IDs
    const episodes = await knex("episodes")
      .join("episode_color", "episodes.id", "episode_color.episode_id")
      .whereIn("episode_color.color_id", colorIdList)
      .select("episodes.*");

    res.json(episodes);
  } catch (error) {
    console.error("Error getting episodes by color:", error);
    res.status(500).send("Error getting episodes by color.");
  }
});


// Add an endpoint to get all episodes by subject
app.get("/episodes/by-subject", async (req, res) => {
  try {
    // Assume that req.query.subjects is an array of subject names
    const subjectNames = req.query.subjects;

    // Find the IDs of the subjects
    const subjectIds = await knex("unique_subjects")
      .whereIn("subject", subjectNames)
      .select("id");

    // Map the subject IDs to a list
    const subjectIdList = subjectIds.map((subject) => subject.id);

    // Find episodes that have these subject IDs
    const episodes = await knex("episodes")
      .join("episode_subject", "episodes.id", "episode_subject.episode_id")
      .whereIn("episode_subject.subject_id", subjectIdList)
      .select("episodes.*");

    res.json(episodes);
  } catch (error) {
    console.error("Error getting episodes by subject:", error);
    res.status(500).send("Error getting episodes by subject.");
  }
});


// Starting server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
