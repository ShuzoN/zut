const https = require("https");
const locations = require("locations");

exports.handler = async (event, context, callback) => {
  const paramString = event["body-json"]["body"];
  const body = [...new URLSearchParams(paramString).entries()].reduce(
    (obj, e) => ({ ...obj, [e[0]]: e[1] }),
    {}
  );

  if (locations.getIdByName(body.text) === undefined) {
    console.info("error: 利用できない地域です");
    return {
      response_type: "in_channel",
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "地域を指定してください: " + locations.getArrayList().join(","),
          },
        },
      ],
    };
    
    
  }

  const url =
    "https://zutool.jp/api/getweatherstatus/" + locations.getIdByName(body.text);
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
