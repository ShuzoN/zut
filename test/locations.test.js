const locations = require('../locations');

test("地名を入力したとき、地名に対応したlocationIdを返すこと", () => {
  expect(locations.getIdByName("渋谷")).toBe(13113);
  expect(locations.getIdByName("沖縄")).toBe(47211);
});

test("対応している地名を全て取得できること", () => {
  const list = locations.getArrayList();
  expect(list.join(",")).toBe("千代田,中央,港,新宿,文京,台東,墨田,江東,品川,目黒,大田,世田谷,渋谷,中野,杉並,豊島,北,荒川,板橋,練馬,足立,葛飾,江戸川,沖縄");
});