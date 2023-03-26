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
// app.use(
//   cors({
//     origin: "*",
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     credentials: true,
//     preflightContinue: false,
//     optionsSuccessStatus: 204,
//   })
// );
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next()
});

app.use("/tweets", tweetsRoutes);
app.use((req,res) => {
  res.json({ message: "API live !"})
})

app.listen(port, () => console.log(`Server started: ${port}`));
