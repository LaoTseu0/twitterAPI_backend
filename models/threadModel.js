const mongoose = require("mongoose");

const ThreadModel = mongoose.model(
  "tweets",
  {
    author_name: {
      type: String,
    },
    profile_image_url: {
      type: String,
    },
    created_at: {
      type: String,
    },
    tweet_id: {
      type: String,
    },
    public_metrics: {
      retweet_count: { type: Number },
      reply_count: { type: Number },
      like_count: { type: Number },
      quote_count: { type: Number },
    },
    urls: {
      type: [String],
      // required: true,
    },
    tags: {
      type: [String],
      // required: true,
    },
    text: {
      type: String,
      // required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  "tweet"
);

// const PostsModel = mongoose.model("posts", postsShema);

module.exports = { ThreadModel };
