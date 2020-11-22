const express = require("express");
const app = express();
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

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
