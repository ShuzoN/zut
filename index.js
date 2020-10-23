const https = require("https");

exports.handler = async (event, context, callback) => {
  const paramString = event["body-json"]["body"];
  const body = [...new URLSearchParams(paramString).entries()].reduce(
    (obj, e) => ({ ...obj, [e[0]]: e[1] }),
    {}
  );

  if (getLocationIdByName(body.text) === undefined) {
    console.info("error: 利用できない地域です");
    return {
      response_type: "in_channel",
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "地域を指定してください: 千代田,中央,港,新宿,文京,台東,墨田,江東,品川,目黒,大田,世田谷,渋谷,中野,杉並,豊島,北,荒川,板橋,練馬,足立,葛飾,江戸川,沖縄",
          },
        },
      ],
    };
    
    
  }

  const url =
    "https://zutool.jp/api/getweatherstatus/" + getLocationIdByName(body.text);
  console.info("url: " + url);

  return await fetchZutool(url).then((res) => {
    return {
      response_type: "in_channel",
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: weatherFormatter(res).join("\n"),
          },
        },
      ],
    };
  });
};

function fetchZutool(url) {
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

function weatherFormatter(zutoolJson) {
  return zutoolJson.today
    .filter((h) => h.time > 7 && h.time < 21)
    .map((h) => {
      return `${h.time}時 ${getWeatherIcon(h.weather)} ${h.temp}℃ ${
        h.pressure
      }hPa ${getPressureLevelIcon(h.pressure_level)}`;
    });
}

function getWeatherIcon(weatherType) {
  if (weatherType === "100") {
    return ":sunny:";
  }
  if (weatherType === "200") {
    return ":cloud:";
  }
  if (weatherType === "300") {
    return ":umbrella:";
  }

  return ":innocent:";
}

function getPressureLevelIcon(pressureLevelType) {
  if (pressureLevelType === "0") {
    return ":ok:";
  }
  if (pressureLevelType === "1") {
    return ":ok:";
  }
  if (pressureLevelType === "2") {
    return ":arrow_heading_down: ";
  }
  if (pressureLevelType === "3") {
    return ":warning: ";
  }
  if (pressureLevelType === "4") {
    return ":bomb:";
  }

  return ":innocent:";
}

var locationMap = new Map();
locationMap.set("千代田", 13101);
locationMap.set("中央", 13102);
locationMap.set("港", 13103);
locationMap.set("新宿", 13104);
locationMap.set("文京", 13105);
locationMap.set("台東", 13106);
locationMap.set("墨田", 13107);
locationMap.set("江東", 13108);
locationMap.set("品川", 13109);
locationMap.set("目黒", 13110);
locationMap.set("大田", 13111);
locationMap.set("世田谷", 13112);
locationMap.set("渋谷", 13113);
locationMap.set("中野", 13114);
locationMap.set("杉並", 13115);
locationMap.set("豊島", 13116);
locationMap.set("北", 13117);
locationMap.set("荒川", 13118);
locationMap.set("板橋", 13119);
locationMap.set("練馬", 13120);
locationMap.set("足立", 13121);
locationMap.set("葛飾", 13122);
locationMap.set("江戸川", 13123);
locationMap.set("沖縄", 47211);

function getLocationIdByName(locationName) {
  return locationMap.get(locationName);
}
