const icons = require('../icons');

test("天気に対応した数値を入力したとき、天気アイコンを返すこと", () => {
    expect(icons.getByWeatherType("100")).toBe(":sunny:");
    expect(icons.getByWeatherType("200")).toBe(":cloud:");
    expect(icons.getByWeatherType("300")).toBe(":umbrella:");
    expect(icons.getByWeatherType("000")).toBe(":innocent:");
});

test("警戒度に対応した数値を入力したとき、警戒度アイコンを返すこと", () => {
    expect(icons.getByPressureLevel("0")).toBe(":ok:");
    expect(icons.getByPressureLevel("1")).toBe(":ok:");
    expect(icons.getByPressureLevel("2")).toBe(":arrow_heading_down:");
    expect(icons.getByPressureLevel("3")).toBe(":warning:");
    expect(icons.getByPressureLevel("4")).toBe(":bomb:");
    expect(icons.getByPressureLevel("10")).toBe(":innocent:");
});