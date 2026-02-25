/**
 * ```shell
 * $ ts-node run-zut.ts 港区 --tomorrow
 * $ yarn run zut 港区 --tomorrow
 * ```
 */
import * as src from "./src/index";

(async () => {
  const [, , ...textArray] = process.argv;

  const response = await src.handler({
    body: new URLSearchParams({
      token: "token",
      command: "/zut",
      text: textArray.join(" "),
    }).toString(),
    isBase64Encoded: false,
  });

  console.dir(response, { depth: null });
})();
