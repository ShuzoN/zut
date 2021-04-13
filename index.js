const zutool = require("zutool");
const search = require("search");
const lambda = require("lambda");
const slack = require("slack");
const temperature = require("temperature");

exports.handler = async (event, context, callback) => {
  const body = lambda.getBody(event);
  const args = body.text.split(" ");
  if (args[0] === "" || locationName.includes("--")) {
    const responseBody = `/zut 場所　(--tomorrow)
対応する地名が複数ある場合は地名とcity_codeを表示します。
天気表示は「市町村区名」のみ入力するのがコツです。
フルネームで入れると動きません。

e.g. /zut 仙台
宮城県仙台市青葉区: 04101
宮城県仙台市宮城野区: 04102
宮城県仙台市泉区: 04103
...


e.g. /zut 仙台市青葉区
今日の天気表示

e.g. /zut 仙台市青葉区 --tomorrow
明日の天気表示

---
また、複数選択肢があり天気が表示されない場合はcity_codeでの検索を試してみてください。

e.g. /zut 北区
北海道札幌市北区: 01102
埼玉県さいたま市北区: 11102
東京都北区: 13117
・・・


e.g. /zut 13117
今日の天気表示
`;
    return slack.buildResponse(responseBody);
  }

  let locationId;
  // locationIdは数値5桁(prefecturesId2桁 + placeId3桁)のみ指定されている場合
  const gotLocationId = /^\d{5}$/.test(args[0]);
  if (gotLocationId) {
    locationId = args[0];
  } else {
    // locationId指定じゃない＝地域名の指定の場合は、一度検索してlocationIdを取得する
    const locationName = args[0];
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

    locationId = result[0].city_code;
  }

  const isTomorrow = args[1] ? args[1].includes("--tomorrow") : false;
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
