const axios = require("axios");
const fs = require("fs");

const { API_Key, API_Key_Secret, BEARER_TOKEN, TWEET_H_SELECTOR, QUERY_H_SELECTOR, MEDIA_H_SELECTOR, USER_H_SELECTOR, BASE_URL, EXECPT_H_SELECTOR, METHOD1, METHOD2, LIMIT } = require("../config/params");

const OPT_TWEET_URL = `${QUERY_H_SELECTOR.toString()}&${TWEET_H_SELECTOR.toString()}&${MEDIA_H_SELECTOR.toString()}&${USER_H_SELECTOR.toString()}`;

async function twitterAPI() {
  let modif = await OPT_TWEET_URL.replace(/\+/g, encodeURI(" ")).replace(/%2C/g, ",");

  const data = await axios.get(`${BASE_URL}${METHOD2}${modif}${LIMIT}`, {
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
  });

  // fs.writeFileSync("./data/data.json", JSON.stringify(data.data.data), (err) => {
  //   if (err) console.log(err);
  // });

  return data.data.data;
}

async function getAuthorProfile(author_id) {
  const author = await axios
    .get(`${BASE_URL}users?ids=${author_id}&${USER_H_SELECTOR}`, {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    })
    .then((res) => {
      // console.log(res.data.data[0]);
      return res.data.data[0];
      //  res.data.data[0].profile_image_url;
    });

  // const image = axios
  //   .get(`${BASE_URL}users?ids=${author_id}&${USER_H_SELECTOR}`, {
  //     headers: {
  //       Authorization: `Bearer ${BEARER_TOKEN}`,
  //     },
  //   })
  //   .then((res) => {
  //     // console.log(res.data.data[0]);
  //     return res.data.data[0].name;
  //     //  res.data.data[0].profile_image_url;
  //   });
  return author;
}

module.exports = { twitterAPI, getAuthorProfile };
