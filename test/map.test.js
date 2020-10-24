const map = require('../map');

test("地名を入力したとき、地名に対応したlocationIdを返すこと", () => {
    expect(map.getLocationIdByName("渋谷")).toBe(13113);
    expect(map.getLocationIdByName("沖縄")).toBe(47211);
});