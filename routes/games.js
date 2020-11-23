const express = require("express");
const router = express.Router();
const {
  gamesList,
  gameDelete,
  gameCreate,
  gameUpdate,
} = require("../controllers/gameController");

router.get("/", gamesList);

router.delete("/:gameId", gameDelete);

router.post("/", gameCreate);

router.put("/:gameId", gameUpdate);

module.exports = router;
