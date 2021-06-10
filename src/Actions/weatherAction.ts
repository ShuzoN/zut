import * as zutool from "../zutool";
import * as location from "../location";
import * as temperature from "../temperature";
import { ParseBody } from "./../Types/utils";
import { ActionInterface } from "../Types/action";
import { DaysWeather, LocationWeatherResponse } from "../Types/zutool";
import { LocationIdResult } from "../Types/locations";

export class WeatherAction implements ActionInterface {
  readonly locationId: number | null;
  readonly locationName: string;
  readonly isTomorrow: boolean;

  constructor(body: ParseBody) {
    this.locationId = body.locationId;
    this.locationName = body.locationName;
    this.isTomorrow = body.isTomorrow;
  }

  async exec() {
    const fetchLocation: LocationIdResult = this.locationId
      ? { locationId: this.locationId, errorMessage: null }
      : await location.fetchLocationId(this.locationName);

    if (fetchLocation.errorMessage) {
      return fetchLocation.errorMessage;
    }

    if (fetchLocation.locationId === null) {
      return "天気の場所を取得できませんでした。はじめからやり直してください。";
    }

    return await zutool
      .fetch(fetchLocation.locationId)
      .then((response: LocationWeatherResponse) => {
        const daysWeather: DaysWeather = {
          yesterday: response.yesterday,
          today: response.today,
          tomorrow: response.tommorow,
          dayAfterTomorrow: response.dayaftertomorrow,
        };

        const day = this.isTomorrow ? daysWeather.tomorrow : daysWeather.today;
        const dayStr = this.isTomorrow ? "明日" : "今日";

        const responseBody: string = `${dayStr} の天気
${zutool.formatter(day).join("\n")}
${temperature.diffMessage(daysWeather, this.isTomorrow)}`;

        return responseBody;
      });
  }
}
