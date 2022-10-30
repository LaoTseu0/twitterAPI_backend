const e = require("express");

const mainTraitement = (_dataApi) => {
  const { public_metrics, created_at, author_id, text } = _dataApi;

  const urls = _dataApi.entities?.urls;

  const tags = [];

  async function AddTag(_api) {
    await _api.entities.hashtags?.forEach((_tag) => {
      tags.push(_tag.tag);
    });
  }

  AddTag(_dataApi);

  return { author_id, created_at, public_metrics, urls, text, tags };
};

module.exports = { mainTraitement };
