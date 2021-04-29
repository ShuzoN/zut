import * as search from "../search";

test("zutoolから取得したjsonをエスケープできること", async () => {
  const json = `"[{\"city_code\":\"17463\",\"name_kata\":\"\\uff8e\\uff73\\uff7d\\uff78\\uff9e\\uff9d\\uff89\\uff84\\uff81\\uff96\\uff73\",\"name\":\"\\u77f3\\u5ddd\\u770c\\u9cf3\\u73e0\\u90e1\\u80fd\\u767b\\u753a\"}]"`;
  const actual = search.unescape(json);
  const expected =
    '"[{"city_code":"17463","name_kata":"\\uff8e\\uff73\\uff7d\\uff78\\uff9e\\uff9d\\uff89\\uff84\\uff81\\uff96\\uff73","name":"\\u77f3\\u5ddd\\u770c\\u9cf3\\u73e0\\u90e1\\u80fd\\u767b\\u753a"}]"';

  expect(actual).toEqual(expected);
});

test("zutoolに対して場所検索を行えること", async () => {
  const actual = await search.byLocationName("杉並");
  const expected = [
    { city_code: "13115", name_kata: "ｽｷﾞﾅﾐｸ", name: "東京都杉並区" },
  ];
  expect(actual).toEqual(expected);
});

test("zutoolに対して空文字で検索した場合, 例外が返ること", () => {
  const promise = search.byLocationName("");
  expect(promise).rejects.toThrowError(
    new Error("検索文字列が指定されていません")
  );
});
