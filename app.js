const express = require("express");
const db = require("./db/models");
const bodyParser = require("body-parser");
const gameRoutes = require("./routes/games");
const app = express();

app.use(bodyParser.json());
const cors = require("cors");
app.use(cors());
app.use("/games", gameRoutes);

const run = async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Connection to the database successful!");
    await app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};

run();
