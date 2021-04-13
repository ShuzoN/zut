const zutool = require("zutool");
const search = require("search");
const lambda = require("lambda");
const slack = require("slack");
const temperature = require("temperature");

exports.handler = async (event, context, callback) => {
  const body = lambda.getBody(event);
  const args = body.text.split(" ");
  const locationName = args[0];
  const isTomorrow = args[1] ? args[1].includes("--tomorrow") : false;
  if (args[0] === "" || locationName.includes("--")) {
    const responseBody = `/zut 場所　(--tomorrow)
対応する地名が複数ある場合は地名表示します。
天気表示は「市町村区名」のみ入力するのがコツです。
フルネームで入れると動きません。

e.g. /zut 仙台
宮城県仙台市青葉区
宮城県仙台市宮城野区
宮城県仙台市泉区
...


e.g. /zut 仙台市青葉区
今日の天気表示

e.g. /zut 仙台市青葉区 --tomorrow
明日の天気表示
`;
    return slack.buildResponse(responseBody);
  }

  const result = await search.byLocationName(locationName);

  if (result.length > 1) {
    const [names, city_code] = result.map((r) => [r.name, r.city_code]).join("\n");
    return slack.buildResponse(`対象住所は複数該当します。天気表示は「市町村区名」のみ入力してください。東京都の場合はcodeで検索してください。
${names}: ${city_code}`);
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
