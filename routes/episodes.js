const express = require("express");
const router = express.Router();
const knex = require("../database"); // Import the database connection

// Endpoint to filter episodes by month
router.get("/by-month", async (req, res) => {
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

// Endpoint to filter episodes by color
router.get("/by-color", async (req, res) => {
  try {
    // Ensure that colorNames is an array. If it's a string, convert it to an array.
    const colorNames = Array.isArray(req.query.colors)
      ? req.query.colors
      : [req.query.colors];

    console.log("Color Names:", colorNames); // Log the color names to debug
    console.log(
      knex("unique_colors").whereIn("color", colorNames).select("id").toString()
    );

    // Find the IDs of the colors
    const colorIds = await knex("unique_colors")
      .whereIn(
        knex.raw("LOWER(color)"),
        colorNames.map((name) => name.toLowerCase())
      )
      .select("id");

    // If no color IDs are found, return an empty array
    if (!colorIds.length) {
      return res.status(404).json({ message: "No matching colors found." });
    }

    // Map the color IDs to a list
    const colorIdList = colorIds.map((color) => color.id);

    console.log("Color ID List:", colorIdList); // Log the color ID list to debug

    // Find episodes that have these color IDs
    const episodes = await knex("episodes")
      .join("episode_color", "episodes.id", "episode_color.episode_id")
      .whereIn("episode_color.color_id", colorIdList)
      .select("episodes.*");

    res.json(episodes);
  } catch (error) {
    console.error("Error getting episodes by color:", error.message);
    res.status(500).send("Error getting episodes by color.");
  }
});


// Endpoint to filter episodes by subject
router.get("/by-subject", async (req, res) => {
  try {
    // Ensure that subjectNames is always an array
    const subjectNames = Array.isArray(req.query.subjects)
      ? req.query.subjects
      : [req.query.subjects];

    // Find the IDs of the subjects
    const subjectIds = await knex("unique_subjects")
      .whereIn(
        knex.raw("LOWER(subject)"),
        subjectNames.map((name) => name.toLowerCase())
      )
      .select("id");

    // If no subject IDs are found, return an empty array
    if (!subjectIds.length) {
      return res.status(404).json({ message: "No matching subjects found." });
    }

    // Map the subject IDs to a list
    const subjectIdList = subjectIds.map((subject) => subject.id);

    console.log("Subject ID List:", subjectIdList); // Log the subject ID list to debug

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

module.exports = router;
