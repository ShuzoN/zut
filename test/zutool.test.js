const zutool = require("../zutool");

test("zutoolから受け取ったjsonを当日分についてフォーマットできること", () => {
  const formatted = [
    "8時 :sunny: 11.1℃ 1028.7hPa :ok:",
    "9時 :sunny: 13.6℃ 1028.1hPa :warning:",
    "10時 :sunny: 14.6℃ 1027.6hPa :warning:",
    "11時 :sunny: 16.9℃ 1026.8hPa :warning:",
    "12時 :sunny: 18.9℃ 1025.6hPa :warning:",
    "13時 :cloud: 20.3℃ 1024.7hPa :warning:",
    "14時 :sunny: 20.9℃ 1024.1hPa :warning:",
    "15時 :sunny: 20.5℃ 1024.5hPa :ok:",
    "16時 :cloud: 19.7℃ 1024.6hPa :ok:",
    "17時 :cloud: 18.6℃ 1023.9hPa :ok:",
    "18時 :cloud: 17.2℃ 1024.4hPa :ok:",
    "19時 :cloud: 15.9℃ 1025hPa :ok:",
    "20時 :sunny: 14.7℃ 1024.9hPa :ok:",
    "21時 :sunny: 13.8℃ 1024.6hPa :bomb:",
    "22時 :sunny: 13.2℃ 1023.9hPa :bomb:",
    "23時 :sunny: 12.8℃ 1023.6hPa :arrow_heading_down:",
  ];

  expect(zutool.formatter(zutoolJson.today)).toEqual(
    expect.arrayContaining(formatted)
  );
});

test("zutoolから受け取ったjsonを明日分についてフォーマットできること", () => {
  const formatted = [
    "6時 :sunny: 8.7℃ 1012.2hPa :ok:",
    "7時 :sunny: 9.6℃ 1012.8hPa :ok:",
    "8時 :sunny: 10.9℃ 1013.4hPa :ok:",
    "9時 :sunny: 12.4℃ 1013.9hPa :ok:",
    "10時 :sunny: 14℃ 1014.1hPa :ok:",
    "11時 :sunny: 15.6℃ 1013.9hPa :ok:",
    "12時 :sunny: 17.1℃ 1013.6hPa :ok:",
    "13時 :sunny: 18.3℃ 1013hPa :ok:",
    "14時 :sunny: 19.1℃ 1013.2hPa :ok:",
    "15時 :sunny: 19.5℃ 1013.5hPa :ok:",
    "16時 :sunny: 19℃ 1013.7hPa :ok:",
    "17時 :sunny: 18℃ 1013.9hPa :ok:",
    "18時 :sunny: 16.5℃ 1014.1hPa :ok:",
    "19時 :sunny: 14.8℃ 1014.4hPa :ok:",
    "20時 :sunny: 13℃ 1014.6hPa :ok:",
    "21時 :sunny: 11.5℃ 1014.8hPa :bomb:",
    "22時 :sunny: 10.4℃ 1014.4hPa :bomb:",
    "23時 :sunny: 9.7℃ 1013.9hPa :bomb:",
  ];

  //notice: zutoolのtomorrowの綴りが間違っているのでそちらに合わせています
  expect(zutool.formatter(zutoolJson.tommorow)).toEqual(
    expect.arrayContaining(formatted)
  );
});

test("zutoolから取得したjsonをエスケープできること", async () => {
  const json = `"[{\"city_code\":\"17463\",\"name_kata\":\"\\uff8e\\uff73\\uff7d\\uff78\\uff9e\\uff9d\\uff89\\uff84\\uff81\\uff96\\uff73\",\"name\":\"\\u77f3\\u5ddd\\u770c\\u9cf3\\u73e0\\u90e1\\u80fd\\u767b\\u753a\"}]"`;
  const actual = zutool.unescape(json);
  const expected =
    '"[{"city_code":"17463","name_kata":"\\uff8e\\uff73\\uff7d\\uff78\\uff9e\\uff9d\\uff89\\uff84\\uff81\\uff96\\uff73","name":"\\u77f3\\u5ddd\\u770c\\u9cf3\\u73e0\\u90e1\\u80fd\\u767b\\u753a"}]"';

  expect(actual).toEqual(expected);
});

const zutoolJson = {
  place_name: "東京都杉並区",
  place_id: "115",
  prefectures_id: "13",
  dateTime: "2020-11-01 10",
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
      temp: "9.9",
      pressure: "1027.8",
      pressure_level: "1",
    },
    {
      time: "2",
      weather: "100",
      temp: "9.2",
      pressure: "1027.4",
      pressure_level: "1",
    },
    {
      time: "3",
      weather: "100",
      temp: "9.0",
      pressure: "1027.5",
      pressure_level: "0",
    },
    {
      time: "4",
      weather: "100",
      temp: "8.1",
      pressure: "1027.4",
      pressure_level: "0",
    },
    {
      time: "5",
      weather: "100",
      temp: "7.6",
      pressure: "1027.6",
      pressure_level: "0",
    },
    {
      time: "6",
      weather: "100",
      temp: "7.3",
      pressure: "1027.7",
      pressure_level: "0",
    },
    {
      time: "7",
      weather: "100",
      temp: "9.3",
      pressure: "1027.9",
      pressure_level: "0",
    },
    {
      time: "8",
      weather: "100",
      temp: "11.1",
      pressure: "1028.7",
      pressure_level: "0",
    },
    {
      time: "9",
      weather: "100",
      temp: "13.6",
      pressure: "1028.1",
      pressure_level: "3",
    },
    {
      time: "10",
      weather: "100",
      temp: "14.6",
      pressure: "1027.6",
      pressure_level: "3",
    },
    {
      time: "11",
      weather: "100",
      temp: "16.9",
      pressure: "1026.8",
      pressure_level: "3",
    },
    {
      time: "12",
      weather: "100",
      temp: "18.9",
      pressure: "1025.6",
      pressure_level: "3",
    },
    {
      time: "13",
      weather: "200",
      temp: "20.3",
      pressure: "1024.7",
      pressure_level: "3",
    },
    {
      time: "14",
      weather: "100",
      temp: "20.9",
      pressure: "1024.1",
      pressure_level: "3",
    },
    {
      time: "15",
      weather: "100",
      temp: "20.5",
      pressure: "1024.5",
      pressure_level: "0",
    },
    {
      time: "16",
      weather: "200",
      temp: "19.7",
      pressure: "1024.6",
      pressure_level: "0",
    },
    {
      time: "17",
      weather: "200",
      temp: "18.6",
      pressure: "1023.9",
      pressure_level: "0",
    },
    {
      time: "18",
      weather: "200",
      temp: "17.2",
      pressure: "1024.4",
      pressure_level: "0",
    },
    {
      time: "19",
      weather: "200",
      temp: "15.9",
      pressure: "1025",
      pressure_level: "0",
    },
    {
      time: "20",
      weather: "100",
      temp: "14.7",
      pressure: "1024.9",
      pressure_level: "0",
    },
    {
      time: "21",
      weather: "100",
      temp: "13.8",
      pressure: "1024.6",
      pressure_level: "4",
    },
    {
      time: "22",
      weather: "100",
      temp: "13.2",
      pressure: "1023.9",
      pressure_level: "4",
    },
    {
      time: "23",
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
      temp: "8",
      pressure: "1011.5",
      pressure_level: "1",
    },
    {
      time: "2",
      weather: "100",
      temp: "8.1",
      pressure: "1011.4",
      pressure_level: "1",
    },
    {
      time: "3",
      weather: "100",
      temp: "8.2",
      pressure: "1011.3",
      pressure_level: "0",
    },
    {
      time: "4",
      weather: "100",
      temp: "8.3",
      pressure: "1011.4",
      pressure_level: "0",
    },
    {
      time: "5",
      weather: "100",
      temp: "8.4",
      pressure: "1011.7",
      pressure_level: "0",
    },
    {
      time: "6",
      weather: "100",
      temp: "8.7",
      pressure: "1012.2",
      pressure_level: "0",
    },
    {
      time: "7",
      weather: "100",
      temp: "9.6",
      pressure: "1012.8",
      pressure_level: "0",
    },
    {
      time: "8",
      weather: "100",
      temp: "10.9",
      pressure: "1013.4",
      pressure_level: "0",
    },
    {
      time: "9",
      weather: "100",
      temp: "12.4",
      pressure: "1013.9",
      pressure_level: "1",
    },
    {
      time: "10",
      weather: "100",
      temp: "14",
      pressure: "1014.1",
      pressure_level: "1",
    },
    {
      time: "11",
      weather: "100",
      temp: "15.6",
      pressure: "1013.9",
      pressure_level: "1",
    },
    {
      time: "12",
      weather: "100",
      temp: "17.1",
      pressure: "1013.6",
      pressure_level: "1",
    },
    {
      time: "13",
      weather: "100",
      temp: "18.3",
      pressure: "1013",
      pressure_level: "1",
    },
    {
      time: "14",
      weather: "100",
      temp: "19.1",
      pressure: "1013.2",
      pressure_level: "1",
    },
    {
      time: "15",
      weather: "100",
      temp: "19.5",
      pressure: "1013.5",
      pressure_level: "0",
    },
    {
      time: "16",
      weather: "100",
      temp: "19",
      pressure: "1013.7",
      pressure_level: "0",
    },
    {
      time: "17",
      weather: "100",
      temp: "18",
      pressure: "1013.9",
      pressure_level: "0",
    },
    {
      time: "18",
      weather: "100",
      temp: "16.5",
      pressure: "1014.1",
      pressure_level: "0",
    },
    {
      time: "19",
      weather: "100",
      temp: "14.8",
      pressure: "1014.4",
      pressure_level: "0",
    },
    {
      time: "20",
      weather: "100",
      temp: "13",
      pressure: "1014.6",
      pressure_level: "0",
    },
    {
      time: "21",
      weather: "100",
      temp: "11.5",
      pressure: "1014.8",
      pressure_level: "4",
    },
    {
      time: "22",
      weather: "100",
      temp: "10.4",
      pressure: "1014.4",
      pressure_level: "4",
    },
    {
      time: "23",
      weather: "100",
      temp: "9.7",
      pressure: "1013.9",
      pressure_level: "4",
    },
  ],
};
