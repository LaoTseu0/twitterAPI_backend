const { API_Key, API_Key_Secret, BEARER_TOKEN } = process.env;

const BASE_URL = "https://api.twitter.com/2/";

const METHOD1 = "users/by/username/";

const METHOD2 = "tweets/search/recent?";

const QUERY_H_SELECTOR = new URLSearchParams({
  query: ["-is:retweet", "-is:reply", "#defi", "#aptos"].join(" "),
});
const MEDIA_H_SELECTOR = new URLSearchParams({
  "media.fields": ["url"].join(","),
});
const TWEET_H_SELECTOR = new URLSearchParams({
  "tweet.fields": ["author_id", "created_at", "public_metrics", "entities"].join(",").toString(),
});
const USER_H_SELECTOR = new URLSearchParams({
  "user.fields": ["profile_image_url"].join(","),
});
const EXECPT_H_SELECTOR = ["-is:retweet"];

const LIMIT = "&max_results=10";

module.exports = { API_Key, API_Key_Secret, QUERY_H_SELECTOR, TWEET_H_SELECTOR, BEARER_TOKEN, MEDIA_H_SELECTOR, USER_H_SELECTOR, BASE_URL, EXECPT_H_SELECTOR, METHOD1, METHOD2, LIMIT };
