const https = require("https");
const weather = require("./weather");
const pressureLevel = require("./pressure-level");
const { maxHeaderSize } = require("http");

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

exports.formatter = function (day) {
  return day
    .filter((h) => h.time > 5 && h.time < 24)
    .map((h) => {
      return `${h.time}時 ${weather.get(h.weather)} ${h.temp}℃ ${
        h.pressure
      }hPa ${pressureLevel.get(h.pressure_level)}`;
    });
};

exports.daysMaxTemperature = function (json) {
  return {
    yesterday: maxTemperature(getTemperatureInADay(json.yesterday)),
    today: maxTemperature(getTemperatureInADay(json.today)),
    tomorrow: maxTemperature(getTemperatureInADay(json.tommorow)),
  };
};

function getTemperatureInADay(day) {
  return day.map((d) => {
    return d.temp;
  });
}

function maxTemperature(dayTemp) {
  return dayTemp.reduce(function (a, b) {
    return Math.max(a, b);
  });
}
