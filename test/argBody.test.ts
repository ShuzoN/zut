import * as argBody from "../src/argBody";
import { LambdaBody } from "../src/Types/lambda";

test("bodyがundefinedの場合は例外を吐く", async () => {
  const body: LambdaBody = {
    text: undefined,
  };

  const expectError = new Error(
    "引数が正しく渡されていません。もう一度helpを見てください。"
  );

  expect(() => argBody.parse(body)).toThrowError(expectError);
});

test("bodyに全角スペースが含まれる場合は例外を吐く", async () => {
  const body: LambdaBody = {
    text: "　01101",
  };

  const expectError = new Error(
    "全角スペースが含まれています。引数から削除してください。"
  );

  expect(() => argBody.parse(body)).toThrowError(expectError);
});
