let games = require("../routes/games");
const { Game } = require("../db/models");
const slugify = require("slugify");

//FetchGames
exports.fetchGame = async (gameId, next) => {
  try {
    const game = await Game.findByPk(gameId);
    return game;
  } catch (error) {
    next(error);
  }
};

//GamesList
exports.gamesList = async (req, res) => {
  try {
    const games = await Game.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(games);
  } catch (err) {
    next(err);
  }
};

//Delete
exports.gameDelete = async (req, res) => {
  const { gameId } = req.params;
  try {
    const foundGame = await Game.findByPk(gameId);
    if (foundGame) {
      await foundGame.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Game not found" });
    }
  } catch (err) {
    next(err);
  }
};

//Create
exports.gameCreate = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }
    const newGame = await Game.create(req.body);
    res.status(201).json(newGame);
  } catch (err) {
    next(err);
  }
};

//Update
exports.gameUpdate = async (req, res, next) => {
  const { gameId } = req.params;

  try {
    const foundGame = await fetchGame(gameId, next);
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }
    if (foundGame) {
      await foundGame.update(req.body);
      // for (const key in req.body) foundGame[key] = req.body[key];
      res.status(204).end();
    } else {
      const err = new Error("Game Not Found");
      err.status = 404;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};
