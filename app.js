const express = require("express");
const path = require("path");
const store = require("./store/datastore");
const initialStoreData = require("./store/data");
const Musician = require("./models/musician");
const musicianRoutes = require("./routes/musician");

const app = express();
const port = process.env.PORT || 80;

// include routess
app.use("/musician", musicianRoutes);

app.use(express.static("public"));

// Health check route
app.get("/", (req, res) => {
  res.send("Node.js app is running successfully on Elastic Beanstalk!");
});

// Catch-all route for React or static files
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.js"));
});

// initialize store
const musician = new Musician(store);
musician.initStore(initialStoreData);
app.locals.musician = musician;

// start serverhhh3
const server = app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = server;
