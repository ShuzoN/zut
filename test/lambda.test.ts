import * as lambda from "../lambda";

test("lambdaに送信されるeventからbodyをobjectとして取り出せること", () => {
  const event = {
    "body-json": {
      body: "token=token&command=/zut&text=杉並",
    },
  };

  expect({
    token: "token",
    command: "/zut",
    text: "杉並",
  }).toEqual(expect.objectContaining(lambda.getBody(event)));
});
