const https = require("https");
const weather = require("./weather");
const pressureLevel = require("./pressure-level");
const encoding = require("encoding-japanese");

exports.fetch = function (locationId) {
  const url = "https://zutool.jp/api/getweatherstatus/" + locationId;
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
};

exports.search = function (searchQuery) {
  const url = "https://zutool.jp/api/getweatherpoint/" + searchQuery;

  return new Promise(function (resolve, reject) {
    https
      .get(url, (res) => {
        res.on("data", (body) => resolve(JSON.parse(body)));
      })
      .on("error", (e) => {
        reject(Error(e));
      });
  });
};

exports.formatter = function (day) {
  return day
    .filter((h) => h.time > 5 && h.time < 24)
    .map((h) => {
      return `${h.time}時 ${weather.get(h.weather)} ${h.temp}℃ ${
        h.pressure
      }hPa ${pressureLevel.get(h.pressure_level)}`;
    });
};
