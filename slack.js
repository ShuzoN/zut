exports.buildResponse = function (body) {
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
