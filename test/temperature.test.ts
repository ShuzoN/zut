import * as temperature from "../temperature";

test("昨日、今日、明日の最高気温を取得する", () => {
  const expected = {
    yesterday: 13.8,
    today: 20.9,
    tomorrow: 19.5,
  };

  expect(
    temperature.daysMax({
      yesterday: zutoolJson.yesterday,
      today: zutoolJson.today,
      tomorrow: zutoolJson.tommorow,
      dayAfterTomorrow: zutoolJson.dayaftertomorrow,
    })
  ).toEqual(expected);
});

test("昨日、今日の気温差が5度以下の場合は0が返ること", () => {
  const yesterday = 15.1;
  const today = 20.0;

  expect(temperature.inspectDifference(yesterday, today)).toEqual(0);
});

test("マイナスの場合でも昨日、今日の気温差が5度以下の場合は0が返ること", () => {
  const yesterday = 0;
  const today = -4.9;

  expect(temperature.inspectDifference(yesterday, today)).toEqual(0);
});

test("昨日、今日の気温差が5度以上8度未満の場合は1が返ること", () => {
  const yesterday = 15.0;
  const today = 20.0;

  expect(temperature.inspectDifference(yesterday, today)).toEqual(1);

  const yesterday2 = 12.1;
  const today2 = 20.0;

  expect(temperature.inspectDifference(yesterday2, today2)).toEqual(1);
});

test("マイナスの場合でも昨日、今日の気温差が5度以上8度未満の場合は1が返ること", () => {
  const yesterday = 0;
  const today = -5;

  expect(temperature.inspectDifference(yesterday, today)).toEqual(1);

  const yesterday2 = 5.0;
  const today2 = -2.9;

  expect(temperature.inspectDifference(yesterday2, today2)).toEqual(1);
});

test("昨日、今日の気温差が8度以上10度未満の場合は2が返ること", () => {
  const yesterday = 12.0;
  const today = 20.0;

  expect(temperature.inspectDifference(yesterday, today)).toEqual(2);

  const yesterday2 = 10.1;
  const today2 = 20.0;

  expect(temperature.inspectDifference(yesterday2, today2)).toEqual(2);
});

test("マイナスの場合でも昨日、今日の気温差が8度以上10度未満の場合は2が返ること", () => {
  const yesterday = 3;
  const today = -5;

  expect(temperature.inspectDifference(yesterday, today)).toEqual(2);

  const yesterday2 = 5.0;
  const today2 = -4.9;

  expect(temperature.inspectDifference(yesterday2, today2)).toEqual(2);
});

test("昨日、今日の気温差が10度以上の場合は3が返ること", () => {
  const yesterday = 9.9;
  const today = 20.0;

  expect(temperature.inspectDifference(yesterday, today)).toEqual(3);
});

test("マイナスの場合でも昨日、今日の気温差が10度以上の場合は3が返ること", () => {
  const yesterday = 5.0;
  const today = -6.0;

  expect(temperature.inspectDifference(yesterday, today)).toEqual(3);
});

const zutoolJson = {
  place_name: "東京都杉並区",
  place_id: "115",
  prefectures_id: "13",
  dateTime: "2020-11-01 10",
  yesterday: [
    {
      time: "0",
      weather: "300",
      temp: "12.0",
      pressure: "1018",
      pressure_level: "4",
    },
    {
      time: "1",
      weather: "300",
      temp: "13.8",
      pressure: "1004.6",
      pressure_level: "4",
    },
    {
      time: "2",
      weather: "100",
      temp: "9.6",
      pressure: "1002.5",
      pressure_level: "1",
    },
  ],
  today: [
    {
      time: "0",
      weather: "100",
      temp: "10.6",
      pressure: "1027.7",
      pressure_level: "1",
    },
    {
      time: "1",
      weather: "100",
      temp: "20.9",
      pressure: "1024.1",
      pressure_level: "3",
    },
    {
      time: "2",
      weather: "100",
      temp: "12.8",
      pressure: "1023.6",
      pressure_level: "2",
    },
  ],
  tommorow: [
    {
      time: "0",
      weather: "100",
      temp: "8",
      pressure: "1011.7",
      pressure_level: "1",
    },
    {
      time: "1",
      weather: "100",
      temp: "19.5",
      pressure: "1013.5",
      pressure_level: "0",
    },
    {
      time: "2",
      weather: "100",
      temp: "9.7",
      pressure: "1013.9",
      pressure_level: "4",
    },
  ],
  dayaftertomorrow: [
    {
      time: "0",
      weather: "100",
      temp: "8",
      pressure: "1011.7",
      pressure_level: "1",
    },
    {
      time: "1",
      weather: "100",
      temp: "19.5",
      pressure: "1013.5",
      pressure_level: "0",
    },
    {
      time: "2",
      weather: "100",
      temp: "9.7",
      pressure: "1013.9",
      pressure_level: "4",
    },
  ],
};
