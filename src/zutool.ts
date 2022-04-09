import * as https from "https";
import * as weather from "./weather";
import * as pressureLevel from "./pressure-level";
import { TODO } from "./Types/utils";
import {
  DayWeather,
  HourWeather,
  LocationSearchResponse,
  LocationWeatherResponse,
} from "./Types/zutool";

export const fetch = async (
  locationId: string
): Promise<LocationWeatherResponse> => {
  const url = encodeURI("https://zutool.jp/api/getweatherstatus/" + locationId);
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

export const search = (
  searchQuery: string
): Promise<LocationSearchResponse> => {
  const url = encodeURI("https://zutool.jp/api/getweatherpoint/" + searchQuery);

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

export const formatter = (day: DayWeather) => {
  return day
    .filter((h: HourWeather) => Number(h.time) > 5 && Number(h.time) < 24)
    .map((h) => {
      return `${h.time}時 ${weather.get(h.weather)} ${h.temp}℃ ${
        h.pressure
      }hPa ${pressureLevel.get(h.pressure_level)}`;
    });
};
