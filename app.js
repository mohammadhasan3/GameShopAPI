const express = require("express");
const bodyParser = require("body-parser");
const slugify = require("slugify");

const app = express();
app.use(bodyParser.json());
let games = require("./games");
const cors = require("cors");
app.use(cors());

app.get("/", (req, res) => {
  console.log("HELLO");
  res.json({ message: "Hello World" });
});

app.get("/games", (req, res) => {
  res.json(games);
});

app.delete("/games/:gameId", (req, res) => {
  const { gameId } = req.params;
  const foundGame = games.find((game) => game.id === +gameId);
  if (foundGame) {
    games = games.filter((game) => game.id !== +gameId);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Game not found" });
  }
});

app.post("/games", (req, res) => {
  const id = games[games.length - 1].id + 1;
  const slug = slugify(req.body.name, { lower: true });
  const newGame = { id, slug, ...req.body };
  games.push(newGame);
  res.status(201).json(newGame);
});

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
