const express = require("express");
const path = require("path");
const app = express();

// Serve static files (if any)
app.use(express.static("public"));

// Health check route for Elastic Beanstalk
app.get("/", (req, res) => {
  res.send("Node.js app is running successfully on Elastic Beanstalk!");
});

// Catch-all route for React or static files (optional)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

const PORT = process.env.PORT || 80;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
