const express = require("express");
const app = express();
const games = require("./games");
const cors = require("cors");
app.use(cors());
app.get("/", (req, res) => {
  console.log("HELLO");
  res.json({ message: "Hello World" });
});

app.get("/games", (req, res) => {
  res.json(games);
});

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
