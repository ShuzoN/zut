import * as search from "./search";
import { LocationIdResult } from "./Types/locations";

export const fetchLocationId = async (
  locationName
): Promise<LocationIdResult> => {
  const searchResult = await search.byLocationName(locationName);

  if (searchResult.length > 1) {
    const result = searchResult
      .map((r) => `${r.name}: ${r.city_code}`)
      .join("\n");
    return {
      errorMessage: `対象住所は複数該当します。天気表示は「市町村区名」のみ、または「city_code」で検索してください。
${result}`,
      locationId: null,
    };
  }

  if (searchResult.length < 1) {
    return {
      errorMessage: `検索に失敗しているのでやり直してください.`,
      locationId: null,
    };
  }

  return {
    errorMessage: null,
    locationId: searchResult[0].city_code,
  };
};
