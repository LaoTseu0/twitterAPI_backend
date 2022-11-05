const express = require("express");
const router = express.Router();
const axios = require("axios");
const ObjectID = require("mongoose").Types.ObjectId;
const fs = require("fs");
const { twitterAPI } = require("../provider/APIprovider");
const { mainTraitement } = require("../layout/traitementDesTweet");

const { ThreadModel } = require("../models/threadModel");

const dataA = require("../data/data.json");

router.get("/save", async (req, res) => {
  const tweets = await twitterAPI();
  const arrayOBJ = [];

  tweets.forEach((e) => {
    arrayOBJ.push(mainTraitement(e));
  });

  // console.log(e);
  arrayOBJ.forEach(async (e) => {
    // console.log(await e);
    // const newTweet = new ThreadModel({
    //   author_id: await e.author_name,
    //   created_at: await e.created_at,
    //   public_metrics: await e.public_metrics,
    //   url: await e.url,
    //   tag: await e.tag,
    //   text: await e.text,
    //   date: Date.now(),
    // });
    // newTweet.save((err, docs) => {
    //   if (!err) console.log("Documents save in the DB !");
    //   else {
    //     console.log(err);
    //     console.log("Error : create new tweet fail");
    //   }
    // });
  });
  res.send(arrayOBJ);
  try {
  } catch (err) {
    // console.log(err);
    res.status(400).json("error système");
  }
});

router.get("/read", async (req, res) => {
  try {
    const data = await ThreadModel.find();
    console.log("database fetched !");
    res.status(201).json({ data });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
