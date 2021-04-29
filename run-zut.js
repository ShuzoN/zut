const { handler } = require("./index");

(async () => {
  const response = await handler({
    "body-json": {
      body: new URLSearchParams({
        token: "token",
        command: "/zut",
        text: "港区",
      }).toString(),
    },
  });

  console.log(JSON.stringify(response))
})()