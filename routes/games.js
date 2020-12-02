const express = require("express");
const upload = require("../middleware/multer");
const router = express.Router();
const {
  gamesList,
  gameDelete,
  gameCreate,
  gameUpdate,
  fetchGame,
} = require("../controllers/gameController");

router.param("gameId", async (req, res, next, gameId) => {
  const game = await fetchGame(gameId, next);
  if (game) {
    req.game = game;
    next();
  } else {
    const err = new Error("Game Not Found");
  }
});

//Read Game
router.get("/", gamesList);

//Delete Game
router.delete("/:gameId", gameDelete);

//Update Game
router.put("/:gameId", upload.single("image"), gameUpdate);

module.exports = router;
