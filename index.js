const locations = require("locations");
const search = require("search");
const lambda = require("lambda");
const slack = require("slack");
const temperature = require("temperature");

exports.handler = async (event, context, callback) => {
  const body = lambda.getBody(event);
  const args = body.text.split(" ");
  const locationName = args[0];
  const isTomorrow = args[1] ? args[1].includes("--tomorrow") : false;
  if (locationName === undefined || locationName.includes("--")) {
    const responseBody = `/zut 場所　(--tomorrow)
地域を指定してください: ${locations.getArrayList().join(",")}`;
    return slack.buildResponse(responseBody);
  }

  const result = search.byLocationName(locationName);

  if (result.length > 1) {
    const names = result.map((r) => r.name).join("\n");
    return slack.buildResponse(`対象住所は複数該当します。
    ${names}`);
  }

  if (result.length < 1) {
    const responseBody = `検索に失敗しているのでやり直してください.`;
    return slack.buildResponse(responseBody);
  }

  const locationId = result[0].city_code;

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
