import * as weather from "../src/weather";

test("天気に対応した数値を入力したとき、天気アイコンを返すこと", () => {
  expect(weather.get("100")).toBe(":sunny:");
  expect(weather.get("200")).toBe(":cloud:");
  expect(weather.get("300")).toBe(":umbrella:");
  expect(weather.get("000")).toBe(":innocent:");
});
