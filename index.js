const locations = require("locations");
const zutool = require("zutool");
const lambda = require("lambda");
const slack = require("slack");
const temperature = require("temperature");

exports.handler = async (event, context, callback) => {
  const body = lambda.getBody(event);
  const args = body.text.split(" ");
  const locationName = args[0];
  const isTomorrow = args[1] ? args[1].includes("--tomorrow") : false;
  if (
    locationName.includes("--") ||
    locations.getIdByName(locationName) === undefined
  ) {
    const responseBody = `/zut 場所　(--tomorrow)
地域を指定してください: ${locations.getArrayList().join(",")}`;
    return slack.buildResponse(responseBody);
  }

  const locationId = locations.getIdByName(locationName);

  return await zutool.fetch(locationId).then((response) => {
    //notice: zutoolのtomorrowの綴りが間違っているのでそちらに合わせています
    const day = isTomorrow ? response.tommorow : response.today;
    const dayStr = isTomorrow ? "明日" : "今日";
    const responseBody = `${dayStr} の天気
${zutool.formatter(day).join("\n")}
${temperatureDiffMessage(response, isTomorrow)}`;
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
