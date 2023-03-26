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
  const { query } = req;
  const tweets = await twitterAPI();
  const arrayOBJ = [];

  await tweets.forEach(async (_e) => {
    const e = await mainTraitement(_e);

    const newTweet = new ThreadModel({
      author_name: await e.author.name,
      profile_image_url: await e.author.profile_image_url,
      created_at: await e.created_at,
      tweet_id: await e.tweet_id,
      public_metrics: await e.public_metrics,
      urls: await e.urls,
      tags: await e.tags,
      text: await e.text,
      date: Date.now(),
    });
    // console.log(await e);
    // console.log(await newTweet);

    newTweet.save((err, docs) => {
      console.log(docs);
      if (!err) console.log("Documents save in the DB !");
      else {
        console.log(err);
        console.log("Error : create new tweet fail");
      }
    });

    arrayOBJ.push(e);
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
