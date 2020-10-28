let map = new Map();

map.set("千代田", 13101);
map.set("中央", 13102);
map.set("港", 13103);
map.set("新宿", 13104);
map.set("文京", 13105);
map.set("台東", 13106);
map.set("墨田", 13107);
map.set("江東", 13108);
map.set("品川", 13109);
map.set("目黒", 13110);
map.set("大田", 13111);
map.set("世田谷", 13112);
map.set("渋谷", 13113);
map.set("中野", 13114);
map.set("杉並", 13115);
map.set("豊島", 13116);
map.set("北", 13117);
map.set("荒川", 13118);
map.set("板橋", 13119);
map.set("練馬", 13120);
map.set("足立", 13121);
map.set("葛飾", 13122);
map.set("江戸川", 13123);
map.set("沖縄", 47211);

exports.getIdByName = function (locationName) {
  return map.get(locationName);
};

exports.getArrayList = function () {
  return Array.from(map.keys());
};