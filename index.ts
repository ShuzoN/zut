import * as zutool from "./zutool";
import * as location from "./location";
import * as lambda from "./lambda";
import * as slack from "./slack";
import * as temperature from "./temperature";
import * as help from "./help";
import { ParseBody, TODO } from "./Types/utils";
import { LambdaBody } from "./Types/lambda";
import { LocationIdResult } from "./Types/locations";
import { DaysWeather, LocationWeatherResponse } from "./Types/zutool";

exports.handler = async (event: TODO, context: TODO, callback: TODO) => {
  try {
    const parsedBody: ParseBody = parseBody(lambda.getBody(event));

    if (parsedBody.isHelp) {
      return slack.buildResponse(help.message);
    }

    const fetchLocation: LocationIdResult = parsedBody.locationId
      ? { locationId: parsedBody.locationId, errorMessage: null }
      : await location.fetchLocationId(parsedBody.locationName);

    if (fetchLocation.errorMessage) {
      return slack.buildResponse(fetchLocation.errorMessage);
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

        // notice: zutoolのtomorrowの綴りが間違っているのでそちらに合わせています
        const day = parsedBody.isTomorrow
          ? daysWeather.tomorrow
          : daysWeather.today;
        const dayStr = parsedBody.isTomorrow ? "明日" : "今日";

        const responseBody: string = `${dayStr} の天気
${zutool.formatter(day).join("\n")}
${temperature.diffMessage(daysWeather, parsedBody.isTomorrow)}`;

        return slack.buildResponse(responseBody);
      });
  } catch (e) {
    return slack.buildResponse(e);
  }
};

function parseBody(body: LambdaBody): ParseBody {
  const args = body.text?.split(" ");
  if (args === undefined) {
    throw new Error(
      "引数が正しく渡されていません。もう一度helpを見てください。"
    );
  }

  // 引数がないもしくは'--'が入ってるときはhelp
  const isHelp = args[0] === "" || args[0].includes("--");
  // locationIdは数値5桁(prefecturesId2桁 + placeId3桁)のみ指定されている場合
  const gotLocationId = /^\d{5}$/.test(args[0]);
  const locationId = gotLocationId ? Number(args[0]) : null;
  // locationIdがない場合はlocationNameとして扱う
  const locationName = !gotLocationId ? args[0] : "";
  const isTomorrow = args[1] ? args[1].includes("--tomorrow") : false;

  return { isHelp, gotLocationId, locationId, locationName, isTomorrow };
}
