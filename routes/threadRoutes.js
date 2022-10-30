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

  console.log(tweets);

  tweets.forEach((e) => {
    arrayOBJ.push(mainTraitement(e));
  });

  arrayOBJ.forEach(async (e) => {
    const newTweet = new ThreadModel({
      author_id: e.author_id,
      created_at: e.created_at,
      public_metrics: e.public_metrics,
      url: e.url,
      tag: e.tag,
      text: e.text,
      date: Date.now(),
    });

    newTweet.save((err, docs) => {
      if (!err) console.log("ok!");
      else {
        console.log(err);
        console.log("Error : create new tweet fail");
      }
    });
  });
  res.send(arrayOBJ);
  try {
  } catch (err) {
    console.log(err);
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
