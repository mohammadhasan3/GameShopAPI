const express = require("express");
const upload = require("../middleware/multer");
const router = express.Router();
const {
  shopsList,
  shopDelete,
  shopCreate,
  shopUpdate,
  fetchShop,
  gameCreate,
} = require("../controllers/shopController");

router.param("shopId", async (req, res, next, shopId) => {
  const shop = await fetchShop(shopId, next);
  if (shop) {
    req.shop = shop;
    next();
  } else {
    const err = new Error("Shop Not Found");
  }
});

//Create Game
router.post("/:shopId/games", upload.single("image"), gameCreate);

//Read Shop
router.get("/", shopsList);

//Delete Shop
router.delete("/:shopId", shopDelete);

//Create Shop
router.post("/", upload.single("image"), shopCreate);

//Update Shop
router.put("/:shopId", upload.single("image"), shopUpdate);

module.exports = router;
