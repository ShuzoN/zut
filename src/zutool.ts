import * as https from "https";
import * as weather from "./weather";
import * as pressureLevel from "./pressure-level";
import { TODO } from "./Types/utils";
import { LocationWeatherResponse } from "./Types/zutool";

export const fetch = async (
  locationId: number
): Promise<LocationWeatherResponse> => {
  const url = encodeURI(
    "https://zutool.jp/api/getweatherstatus/" + locationId.toString()
  );
  console.info("url: " + url);

  return new Promise(function (resolve, reject) {
    https
      .get(url, (res) => {
        res.on("data", (body) => resolve(JSON.parse(body)));
      })
      .on("error", (e: TODO) => {
        reject(Error(e));
      });
  });
};

export const search = (searchQuery) => {
  const url = encodeURI("https://zutool.jp/api/getweatherpoint/" + searchQuery);

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

export const formatter = (day) => {
  return day
    .filter((h) => h.time > 5 && h.time < 24)
    .map((h) => {
      return `${h.time}時 ${weather.get(h.weather)} ${h.temp}℃ ${
        h.pressure
      }hPa ${pressureLevel.get(h.pressure_level)}`;
    });
};
