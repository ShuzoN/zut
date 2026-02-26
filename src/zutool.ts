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

const UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36";

export const fetch = async (
  locationId: string
): Promise<LocationWeatherResponse> => {
  const url = encodeURI("https://zutool.jp/api/getweatherstatus/" + locationId);
  console.info("url: " + url);

  return new Promise(function (resolve, reject) {
    https
      .get(url, { headers: { "User-Agent": UA } }, (res) => {
        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => {
          if (res.statusCode !== 200) {
            reject(Error(`API returned status ${res.statusCode}: ${body}`));
            return;
          }
          resolve(JSON.parse(body));
        });
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
      .get(url, { headers: { "User-Agent": UA } }, (res) => {
        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => {
          if (res.statusCode !== 200) {
            reject(Error(`API returned status ${res.statusCode}: ${body}`));
            return;
          }
          resolve(JSON.parse(body));
        });
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
