const express = require("express");
const connectDB = require("./src/configs/connectDB");
const initRoutes = require("./src/routes/main.route");
const cors = require("cors");
require("dotenv").config();
const app = express();

//config env FE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;

//connectDB
connectDB();
initRoutes(app);
//run server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
