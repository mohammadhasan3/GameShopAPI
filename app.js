const express = require("express");
const bodyParser = require("body-parser");
const gameRoutes = require("./routes/games");
const app = express();

app.use(bodyParser.json());
const cors = require("cors");
app.use(cors());
app.use("/games", gameRoutes);

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
