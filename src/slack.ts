export const buildResponse = (body: string) => {
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
};
