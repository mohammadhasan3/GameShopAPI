let games = require("../games");
const slugify = require("slugify");

//GamesList
exports.gamesList = (req, res) => {
  res.json(games);
};

//Delete
exports.gameDelete = (req, res) => {
  const { gameId } = req.params;
  const foundGame = games.find((game) => game.id === +gameId);
  if (foundGame) {
    games = games.filter((game) => game.id !== +gameId);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Game not found" });
  }
};

//Create
exports.gameCreate = (req, res) => {
  const id = games[games.length - 1].id + 1;
  const slug = slugify(req.body.name, { lower: true });
  const newGame = { id, slug, ...req.body };
  games.push(newGame);
  res.status(201).json(newGame);
};

//Update
exports.gameUpdate = (req, res) => {
  const { gameId } = req.params;
  const foundGame = games.find((game) => game.id === +gameId);
  if (foundGame) {
    for (const key in req.body) foundGame[key] = req.body[key];

    res.status(204).end();
  } else {
    res.status(404).json({ message: "Game not found" });
  }
};
