const https = require("https");
const locations = require("locations");
const zutool = require("zutool");
const lambda = require("lambda");

exports.handler = async (event, context, callback) => {
  const body = lambda.getBody(event);

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