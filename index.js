const https = require("https");
const locations = require("locations");
const zutool = require("zutool");

exports.handler = async (event, context, callback) => {
  const body = getLambdaBody(event);

  if (locations.getIdByName(body.text) === undefined) {
    const responseBody = "地域を指定してください: " + locations.getArrayList().join(",");
    return buildSlackResponse(responseBody);
  }

  const locationName = locations.getIdByName(body.text);

  return await zutool.fetch(locationName).then((response) => {
    const responseBody = zutool.formatter(response).join("\n");
    return buildSlackResponse(responseBody);
  });
};

function getLambdaBody(event) {
  const paramString = event["body-json"]["body"];
  const body = [...new URLSearchParams(paramString).entries()].reduce(
    (obj, e) => ({ ...obj, [e[0]]: e[1] }),
    {}
  );

  return body;
}

function buildSlackResponse(body) {
  return {
    response_type: "in_channel",
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: body,
        },
      },
    ],
  };
}