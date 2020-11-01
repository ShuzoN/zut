const https = require("https");
const locations = require("locations");
const zutool = require("zutool");
const lambda = require("lambda");
const slack = require("slack");

exports.handler = async (event, context, callback) => {
  const body = lambda.getBody(event);

  if (locations.getIdByName(body.text) === undefined) {
    const responseBody = "地域を指定してください: " + locations.getArrayList().join(",");
    return slack.buildResponse(responseBody);
  }

  const locationName = locations.getIdByName(body.text);

  return await zutool.fetch(locationName).then((response) => {
    const responseBody = zutool.formatter(response).join("\n");
    return slack.buildResponse(responseBody);
  });
};