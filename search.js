const zutool = require("./zutool");

exports.result = async function () {
  // const locationId = locations.getIdByName(locationName);
  try {
    const locationName = "石川";
    const locationResponse = await zutool.search(locationName);
    const unescaped = this.unescape(locationResponse.result);
    const searchResult = JSON.parse(unescaped);
  } catch (e) {
    console.log(e);
  }
};

exports.unescape = (json) => {
  const excludeDoubleQuote = json.replace('\\"', '"');
  return excludeDoubleQuote.replace(/\\\\/g, "\\");
};
