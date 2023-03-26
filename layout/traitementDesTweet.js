const { getAuthorProfile } = require("../provider/APIprovider");

const mainTraitement = async (dataApi) => {
  const { public_metrics, created_at, author_id, text, id } = dataApi;

  const hashtagMatchRegex = text.match(/#\w+/g);
  textFiltered = text.replace(hashtagMatchRegex, "");

  const urls = dataApi.entities?.urls?.map((e) => e.url?.toString() ?? "");

  const tags = [];

  const tweet_id = id;

  /**
   * fonction à exporter
   * @param {any} _api
   */
  function AddTag(_api) {
    _api.entities.hashtags?.forEach((_tag) => {
      tags.push(_tag.tag);
    });
  }

  AddTag(dataApi);

  // const author = getAuthorProfile(author_id);
  const author = await getAuthorProfile(author_id);
  // const author = getAuthorProfile(author_id);
  // const author_name = "arthur";

  return { author, created_at, tweet_id, public_metrics, urls, textFiltered, tags };
};

module.exports = { mainTraitement };
