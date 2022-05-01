import * as pressureLevel from "../src/pressure-level";

test("警戒度に対応した数値を入力したとき、警戒度アイコンを返すこと", () => {
  expect(pressureLevel.get("0")).toBe(":ok:");
  expect(pressureLevel.get("1")).toBe(":ok:");
  expect(pressureLevel.get("2")).toBe(":arrow_heading_down:");
  expect(pressureLevel.get("3")).toBe(":warning:");
  expect(pressureLevel.get("4")).toBe(":bomb:");
  expect(pressureLevel.get("10")).toBe(":innocent:");
});
