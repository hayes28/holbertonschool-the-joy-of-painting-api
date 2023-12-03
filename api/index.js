const express = require("express");
const app = express();
const episodesRouter = require("/home/hayes/holbertonschool-the-joy-of-painting-api/routes/episodes.js");

// Middleware
app.use(express.json());

// Add an endpoint to get all episodes, colors, and subjects
app.use("/episodes", episodesRouter);

// Starting server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
