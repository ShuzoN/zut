const zutool = require("./zutool");

exports.byLocationName = async function (locationName) {
  if (locationName === "") {
    throw Error("検索文字列が指定されていません");
  }
  const locationResponse = await zutool.search(locationName);
  const unescaped = this.unescape(locationResponse.result);
  return JSON.parse(unescaped);
};

exports.unescape = (json) => {
  const excludeDoubleQuote = json.replace('\\"', '"');
  return excludeDoubleQuote.replace(/\\\\/g, "\\");
};
