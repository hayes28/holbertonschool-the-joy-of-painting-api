const express = require("express");
const router = express.Router();
const knex = require("../../database");

// Lookup object for month names to month numbers
const monthLookup = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
};

// Endpoint to get all episodes
router.get("/", async (req, res) => {
  try {
    // Get all episodes from database
    const episodes = await knex("episodes");

    // Send the episodes back to the client as JSON
    res.json(episodes);
  } catch (error) {
    // Log error and send error response
    console.error("Error getting episodes:", error);
    res.status(500).send("Error getting episodes.");
  }
});

// Endpoint to get all colors
router.get("/colors", async (req, res) => {
  try {
    // Get all colors from database
    const colors = await knex("unique_colors");

    // Send the colors back to the client as JSON
    res.json(colors);
  } catch (error) {
    // Log error and send error response
    console.error("Error getting colors:", error);
    res.status(500).send("Error getting colors.");
  }
});

// Endpoint to get all subjects
router.get("/subjects", async (req, res) => {
  try {
    // Get all subjects from database
    const subjects = await knex("unique_subjects");

    // Send the subjects back to the client as JSON
    res.json(subjects);
  } catch (error) {
    // Log error and send error response
    console.error("Error getting subjects:", error);
    res.status(500).send("Error getting subjects.");
  }
});

// Endpoint to filter episodes but with colors and subjects
router.get("/filter", async (req, res) => {
  try {
    console.log("Query:", req.query);
    console.log("Month:", req.query.month);

    let query = knex("episodes");

    // Add filtering by month and year if provided in query params
    if (req.query.month) {
      query.whereRaw("EXTRACT(MONTH FROM broadcast_date) = ?", [
        req.query.month,
      ]);
    }
    if (req.query.year) {
      query.whereRaw("EXTRACT(YEAR FROM broadcast_date) = ?", [req.query.year]);
    }

    // Filter by Colors
    if (req.query.colors) {
      let colorNames = Array.isArray(req.query.colors)
        ? req.query.colors
        : [req.query.colors];
      let colorIds = await knex("unique_colors")
        .whereIn("color", colorNames)
        .select("id");
      query
        .join("episode_color", "episodes.id", "episode_color.episode_id")
        .whereIn(
          "episode_color.color_id",
          colorIds.map((c) => c.id)
        );
    }

    // Filter by Subjects
    if (req.query.subjects) {
      let subjectNames = Array.isArray(req.query.subjects)
        ? req.query.subjects
        : [req.query.subjects];
      let subjectIds = await knex("unique_subjects")
        .whereIn("subject", subjectNames)
        .select("id");
      query
        .join("episode_subject", "episodes.id", "episode_subject.episode_id")
        .whereIn(
          "episode_subject.subject_id",
          subjectIds.map((s) => s.id)
        );
    }

    // After adding all filters, execute the query
    const episodes = await query.distinct().select("episodes.*");
    res.json(episodes); // Send the result back as JSON
  } catch (error) {
    console.error("Error filtering episodes:", error);
    res.status(500).send("Error filtering episodes.");
  }
});

// Endpoint to filter episodes by month
router.get("/by-month", async (req, res) => {
  try {
    // Initialize an empty array for the query conditions
    const conditions = [];

    // Add month condition if provided
    if (req.query.month) {
      // Convert the month name to its numeric equivalent
      const monthNumber = monthLookup[req.query.month];
      if (monthNumber === undefined) {
        // If monthNumber is undefined, an invalid month name was provided
        return res.status(400).send("Invalid month name provided.");
      }
      conditions.push(
        knex.raw("EXTRACT(MONTH FROM broadcast_date) = ?", [monthNumber])
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
    console.error("Error getting episodes by month:", error);
    res.status(500).send("Error getting episodes by month.");
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

// ADDITIONAL ENDPOINTS
// Endpoint to get subject suggestions based on a search term
router.get("/suggestions", async (req, res) => {
  // Get the subject search term from the query parameter
  const searchTerm = req.query.subject;

  try {
    if (!searchTerm) {
      // If no search term provided, return an empty array
      return res.json([]);
    }

    // Query the unique_subjects table for subjects that start with the search term
    // Use '%' as a wildcard in the SQL 'LIKE' operator
    const suggestions = await knex("unique_subjects")
      .where("subject", "ilike", `%${searchTerm}%`)
      .select("subject");

    // Send the suggestions back to the client as JSON
    res.json(suggestions.map((s) => s.subject)); // Assuming you just want to send the subject strings
  } catch (error) {
    // Log error and send error response
    console.error("Error getting suggestions:", error);
    res.status(500).send("Error getting suggestions.");
  }
});

// Endpoint to filter episodes by subject
router.get("/by-subject", async (req, res) => {
  try {
    // Ensure that subjectNames is always an array
    const subjectNames = Array.isArray(req.query.subjects)
      ? req.query.subjects
      : [req.query.subjects];

    console.log("Subject Names:", subjectNames); // Log the subject names to debug
    console.log(
      knex("unique_subjects")
        .whereIn("subject", subjectNames)
        .select("id")
        .toString()
    );

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
