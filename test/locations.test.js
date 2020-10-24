const locations = require('../locations');

test("地名を入力したとき、地名に対応したlocationIdを返すこと", () => {
    expect(locations.getIdByName("渋谷")).toBe(13113);
    expect(locations.getIdByName("沖縄")).toBe(47211);
});