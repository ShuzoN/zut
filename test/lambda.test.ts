import * as lambda from "../src/lambda";

test("isBase64Encoded=true のとき、base64デコードしてbodyをobjectとして取り出せること", () => {
  const rawBody = "token=token&command=/zut&text=杉並";
  const event = {
    body: Buffer.from(rawBody).toString("base64"),
    isBase64Encoded: true,
  };
  expect(lambda.getBody(event)).toEqual(
    expect.objectContaining({ token: "token", command: "/zut", text: "杉並" })
  );
});

test("isBase64Encoded=false のとき、そのままbodyをobjectとして取り出せること", () => {
  const event = {
    body: "token=token&command=/zut&text=杉並",
    isBase64Encoded: false,
  };
  expect(lambda.getBody(event)).toEqual(
    expect.objectContaining({ token: "token", command: "/zut", text: "杉並" })
  );
});
