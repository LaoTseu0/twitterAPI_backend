const mongoose = require("mongoose");

const ThreadModel = mongoose.model(
  "tweets",
  {
    author_id: {
      type: String,
      required: true,
    },
    created_at: {
      type: String,
      required: true,
    },
    public_metrics: {
      retweet_count: { type: Number },
      reply_count: { type: Number },
      like_count: { type: Number },
      quote_count: { type: Number },
    },
    url: {
      type: String,
      // required: true,
    },
    tag: {
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
