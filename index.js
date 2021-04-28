const zutool = require("zutool");
const location = require("location");
const lambda = require("lambda");
const slack = require("slack");
const temperature = require("temperature");
const help = require("help");

exports.handler = async (event, context, callback) => {
  const parsedBody = parseBody(lambda.getBody(event));
  if (parsedBody.isHelp) {
    return slack.buildResponse(help.message);
  }

  const fetchLocationIdByName = () => {
    const fetchLocation = await location.fetchLocationId(
      parsedBody.locationName
    );

    if (fetchLocation.errorMessage != null) {
      return slack.buildResponse(fetchLocation.errorMessage);
    }

    return fetchLocation.locationId;
  };

  const locationId = parsedBody.gotLocationId
    ? parsedBody.locationId
    : fetchLocationIdByName();

  return await zutool.fetch(locationId).then((response) => {
    // notice: zutoolのtomorrowの綴りが間違っているのでそちらに合わせています
    const day = parsedBody.isTomorrow ? response.tommorow : response.today;
    const dayStr = parsedBody.isTomorrow ? "明日" : "今日";
    const responseBody = `${dayStr} の天気
${zutool.formatter(day).join("\n")}
${temperatureDiffMessage(response, parsedBody.isTomorrow)}`;
    return slack.buildResponse(responseBody);
  });
};

function temperatureDiffMessage(json, isTomorrow) {
  const daysMaxTemp = temperature.daysMax(json);
  const tempDiffLevel = isTomorrow
    ? temperature.inspectDifference(daysMaxTemp.today, daysMaxTemp.tomorrow)
    : temperature.inspectDifference(daysMaxTemp.yesterday, daysMaxTemp.today);
  return temperature.format(tempDiffLevel);
}

function parseBody(body) {
  const args = body.text.split(" ");
  // 引数がないもしくは'--'が入ってるときはhelp
  const isHelp = args[0] === "" || args[0].includes("--");
  // locationIdは数値5桁(prefecturesId2桁 + placeId3桁)のみ指定されている場合
  const gotLocationId = /^\d{5}$/.test(args[0]);
  const locationId = gotLocationId ? args[0] : null;
  // locationIdがない場合はlocationNameとして扱う
  const locationName = !gotLocationId ? args[0] : "";
  const isTomorrow = args[1] ? args[1].includes("--tomorrow") : false;

  return { isHelp, gotLocationId, locationId, locationName, isTomorrow };
}
