const https = require("https");
const locations = require("locations");
const zutool = require("zutool");

exports.handler = async (event, context, callback) => {
  const paramString = event["body-json"]["body"];
  const body = [...new URLSearchParams(paramString).entries()].reduce(
    (obj, e) => ({ ...obj, [e[0]]: e[1] }),
    {}
  );

  if (locations.getIdByName(body.text) === undefined) {
    console.info("error: 利用できない地域です");
    return {
      response_type: "in_channel",
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "地域を指定してください: " + locations.getArrayList().join(","),
          },
        },
      ],
    };
  }

  const locationName = locations.getIdByName(body.text);

  return await zutool.fetch(locationName).then((response) => {
    return {
      response_type: "in_channel",
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: zutool.formatter(response).join("\n"),
          },
        },
      ],
    };
  });
};
