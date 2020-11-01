const weather = require("./weather");
const pressureLevel = require("./pressure-level");

exports.fetch = function (locationId) {
  const url =
    "https://zutool.jp/api/getweatherstatus/" + locationId;
  console.info("url: " + url);

  return new Promise(function (resolve, reject) {
    https
      .get(url, (res) => {
        res.on("data", (body) => resolve(JSON.parse(body)));
      })
      .on("error", (e) => {
        reject(Error(e));
      });
  });
}

exports.formatter = function (json) {
    return json.today
      .filter((h) => h.time > 7 && h.time < 21)
      .map((h) => {
        return `${h.time}時 ${weather.get(h.weather)} ${h.temp}℃ ${
          h.pressure
      }hPa ${pressureLevel.get(h.pressure_level)}`;
    });
}