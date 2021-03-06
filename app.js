const express = require("express");
const db = require("./db/models");
const bodyParser = require("body-parser");
const gameRoutes = require("./routes/games");
const shopRoutes = require("./routes/shops");
const userRoutes = require("./routes/users");
const cors = require("cors");
const path = require("path");
const app = express();

//Middleware
app.use(cors());
app.use(bodyParser.json());

//Routes
app.use("/games", gameRoutes);
app.use("/shops", shopRoutes);
app.use("/media", express.static(path.join(__dirname, "media")));
app.use(userRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Path not found" });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message || "Internal Server Error",
  });
});

const run = async () => {
  try {
    await db.sequelize.sync({ alter: true });
    // await db.sequelize.sync({ force: true });
    console.log("Connection to the database successful!");
    await app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};

run();
