const express = require('express');
const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies (as sent by API clients)

// Routes
// define these later

// Starting server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`
)});
