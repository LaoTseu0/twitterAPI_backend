const express = require("express");
require("dotenv").config({ path: "./config/.env" });
require("./models/dbconfig.js");
const app = express();
const tweetsRoutes = require("./routes/threadRoutes.js");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const port = process.env.PORT || 5500;

app.use(bodyParser.json());
// origin: process.env.ENV_LOCATION === "DEV" ? process.env.ENV_DEV : process.env.ENV_HEROKU,
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 200,
  })
);
app.use("/tweets", tweetsRoutes);

app.listen(port, () => console.log(`Server started: ${port}`));
