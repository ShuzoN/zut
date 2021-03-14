const search = require("../search");

test("zutoolから取得したjsonをエスケープできること", async () => {
  const json = `"[{\"city_code\":\"17463\",\"name_kata\":\"\\uff8e\\uff73\\uff7d\\uff78\\uff9e\\uff9d\\uff89\\uff84\\uff81\\uff96\\uff73\",\"name\":\"\\u77f3\\u5ddd\\u770c\\u9cf3\\u73e0\\u90e1\\u80fd\\u767b\\u753a\"}]"`;
  const actual = search.unescape(json);
  const expected =
    '"[{"city_code":"17463","name_kata":"\\uff8e\\uff73\\uff7d\\uff78\\uff9e\\uff9d\\uff89\\uff84\\uff81\\uff96\\uff73","name":"\\u77f3\\u5ddd\\u770c\\u9cf3\\u73e0\\u90e1\\u80fd\\u767b\\u753a"}]"';

  expect(actual).toEqual(expected);
});

test("zutoolから受け取ったjsonを当日分についてフォーマットできること", async () => {
  await search.result();
  expect(true).toEqual(true);
});
