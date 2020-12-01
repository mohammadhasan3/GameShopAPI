let shops = require("../routes/shops");
const { Shop } = require("../db/models");
const slugify = require("slugify");

//FetchShops
exports.fetchShop = async (shopId, next) => {
  try {
    const shop = await Shop.findByPk(shopId);
    return shop;
  } catch (error) {
    next(error);
  }
};

//ShopsList
exports.shopsList = async (req, res) => {
  try {
    const shops = await Shop.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(shops);
  } catch (err) {
    next(err);
  }
};

//Delete
exports.shopDelete = async (req, res) => {
  const { shopId } = req.params;
  try {
    const foundShop = await Shop.findByPk(shopId);
    if (foundShop) {
      await foundShop.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Shop not found" });
    }
  } catch (err) {
    next(err);
  }
};

//Create
exports.shopCreate = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }
    const newShop = await Shop.create(req.body);
    res.status(201).json(newShop);
  } catch (err) {
    next(err);
  }
};

//Update
exports.shopUpdate = async (req, res, next) => {
  const { shopId } = req.params;

  try {
    const foundShop = await fetchShop(shopId, next);
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }
    if (foundShop) {
      await foundShop.update(req.body);
      // for (const key in req.body) foundShop[key] = req.body[key];
      res.status(204).end();
    } else {
      const err = new Error("Shop Not Found");
      err.status = 404;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};
