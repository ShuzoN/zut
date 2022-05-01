import { SearchLocation } from "./Types/zutool";
import * as zutool from "./zutool";

export const byLocationName = async (
  locationName: string
): Promise<SearchLocation[]> => {
  if (locationName === "") {
    throw Error("検索文字列が指定されていません");
  }
  const locationResponse = await zutool.search(locationName.trim());
  const unescaped = unescape(locationResponse.result);
  return JSON.parse(unescaped);
};

export const unescape = (json: string) => {
  const excludeDoubleQuote = json.replace('\\"', '"');
  return excludeDoubleQuote.replace(/\\\\/g, "\\");
};
