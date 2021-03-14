const locations = require("locations");
const zutool = require("zutool");
const lambda = require("lambda");
const slack = require("slack");

exports.handler = async (event, context, callback) => {
  const body = lambda.getBody(event);
  const args = body.text.split(" ");
  const locationName = args[0];
  const isTommorow = args[1].includes("--tommorow");
  if (
    locationName.includes("--") ||
    locations.getIdByName(locationName) === undefined
  ) {
    const responseBody = `/zut 場所　(--tommorow)
地域を指定してください: ${locations.getArrayList().join(",")}`;
    return slack.buildResponse(responseBody);
  }

  const locationId = locations.getIdByName(locationName);

  return await zutool.fetch(locationId).then((response) => {
    const day = isTommorow ? response.tommorow : response.today;
    const responseBody = zutool.formatter(day).join("\n");
    return slack.buildResponse(responseBody);
  });
};
