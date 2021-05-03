import * as zutool from "./zutool";

export const byLocationName = async (locationName) => {
  if (locationName === "") {
    throw Error("検索文字列が指定されていません");
  }
  const locationResponse = await zutool.search(locationName);
  const unescaped = unescape(locationResponse.result);
  return JSON.parse(unescaped);
};

const unescape = (json) => {
  const excludeDoubleQuote = json.replace('\\"', '"');
  return excludeDoubleQuote.replace(/\\\\/g, "\\");
};
