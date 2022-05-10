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
