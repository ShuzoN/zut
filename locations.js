exports.getIdByName = function (locationName) {
  var map = new Map();

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
  map.set("八王子",13201);
  map.set("立川",13202);
  map.set("武蔵野",13203);
  map.set("三鷹",13204);
  map.set("青梅",13205);
  map.set("府中",13206);
  map.set("昭島",13207);
  map.set("調布",13208);
  map.set("町田",13209);
  map.set("小金井",13210);
  map.set("小平",13211);
  map.set("日野",13212);
  map.set("東村山",13213);
  map.set("国分寺",13214);
  map.set("国立",13215);
  map.set("福生",13218);
  map.set("狛江",13219);
  map.set("東大和",13220);
  map.set("清瀬",13221);
  map.set("東久留米",13222);
  map.set("武蔵村山",13223);
  map.set("多摩",13224);
  map.set("稲城",13225);
  map.set("羽村",13227);
  map.set("あきる野",13228);
  map.set("西東京",13229);
  map.set("沖縄", 47211);

exports.getIdByName = function (locationName) {
  return map.get(locationName);
};

exports.getArrayList = function () {
  return Array.from(map.keys());
}; 