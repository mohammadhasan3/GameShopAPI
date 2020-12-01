const express = require("express");
const upload = require("../middleware/multer");
const router = express.Router();
const {
  shopsList,
  shopDelete,
  shopCreate,
  shopUpdate,
  fetchShop,
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

//Read
router.get("/", shopsList);

//Delete
router.delete("/:shopId", shopDelete);

//Create
router.post("/", upload.single("image"), shopCreate);

//Update
router.put("/:shopId", upload.single("image"), shopUpdate);

module.exports = router;
