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

exports.inspectTemperatureDifference = function (before, after) {
  const difference = (a, b) => {
    return Math.abs(a - b);
  };

  const diff = difference(before, after);

  if (diff >= 5 && diff < 8) {
    return 1;
  }

  if (diff >= 8 && diff < 10) {
    return 2;
  }

  if (diff >= 10) {
    return 3;
  }

  return 0;
};

exports.formatTemperatureDifference = function (diff) {
  switch (diff) {
    case 0:
      return "";
    case 1:
      return "前日比の気温差が5度以上。体調を崩しやすい日 :waning:";
    case 2:
      return "前日比の気温差が8度以上。体調を崩していてもおかしくありません :bomb:";
    case 3:
      return "前日比の気温差が10度以上。体調を崩しているなら休みましょう :boom:";
    default:
      return "";
  }
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
