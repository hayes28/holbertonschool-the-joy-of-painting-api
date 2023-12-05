const express = require("express");
const app = express();
const cors = require("cors");
const episodesRouter = require("./routes/episodes");

// Middleware
app.use(express.json());
app.use(cors());

// Add an endpoint to get all episodes, colors, and subjects
app.use("/episodes", episodesRouter);

// Starting server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
