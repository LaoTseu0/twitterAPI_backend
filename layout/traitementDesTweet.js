const e = require("express");
const { getAuthorName } = require("../provider/APIprovider");

const mainTraitement = async (dataApi) => {
  const { public_metrics, created_at, author_id, text } = dataApi;

  const urls = dataApi.entities?.urls;

  const tags = [];

  /**
   * fonction à exporter
   * @param {any} _api
   */
  async function AddTag(_api) {
    await _api.entities.hashtags?.forEach((_tag) => {
      tags.push(_tag.tag);
    });
  }

  AddTag(dataApi);

  const author_name = await getAuthorName(author_id);
  console.log(author_name);

  return { author_name, created_at, public_metrics, urls, text, tags };
};

module.exports = { mainTraitement };
