const zutool = require("zutool");
const search = require("search");
const lambda = require("lambda");
const slack = require("slack");
const temperature = require("temperature");
const help = require("help");

exports.handler = async (event, context, callback) => {
  const body = lambda.getBody(event);
  const parsedArgs = parseArgs(body);
  if (parsedArgs.isHelp) {
    return slack.buildResponse(help.message);
  }

  // 地域名の指定の場合は、一度検索してlocationIdを取得する
  const locationId = parsedArgs.gotLocationId ? parsedArgs.locationId : fetchLocationId(parsedArgs.locationName);

  return await zutool.fetch(locationId).then((response) => {
    //notice: zutoolのtomorrowの綴りが間違っているのでそちらに合わせています
    const day = parsedArgs.isTomorrow ? response.tommorow : response.today;
    const dayStr = parsedArgs.isTomorrow ? "明日" : "今日";
    const responseBody = `${dayStr} の天気
${zutool.formatter(day).join("\n")}
${temperatureDiffMessage(response, parsedArgs.isTomorrow)}`;
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

function parseArgs(body) {
  const args = body.text.split(" ");
  const isHelp = args[0] === "" || locationName.includes("--");
  // locationIdは数値5桁(prefecturesId2桁 + placeId3桁)のみ指定されている場合
  const gotLocationId = /^\d{5}$/.test(args[0]);
  // locationIdがない場合はlocationNameとして扱う
  const locationName = !gotLocationId ? args[0] : '';
  const isTomorrow = args[1] ? args[1].includes("--tomorrow") : false;

  return { isHelp, gotLocationId, locationName, isTomorrow }
}

function fetchLocationId(locationName) {
  const result = await search.byLocationName(locationName);

  if (result.length > 1) {
    const names = result.map((r) => `${r.name}: ${r.city_code}`).join("\n");
    return slack.buildResponse(`対象住所は複数該当します。天気表示は「市町村区名」のみ、または「city_code」で検索してください。
${names}`);
  }

  if (result.length < 1) {
    const responseBody = `検索に失敗しているのでやり直してください.`;
    return slack.buildResponse(responseBody);
  }

  return result[0].city_code;
}
