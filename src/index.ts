import * as lambda from "./lambda";
import * as slack from "./slack";
import { ParseBody, TODO } from "./Types/utils";
import { LambdaBody } from "./Types/lambda";
import { Router } from "./router";

export const handler = async (event: TODO) => {
  try {
    const parsedBody: ParseBody = parseBody(lambda.getBody(event));
    const router = new Router(parsedBody);
    const action = router.judge();
    const responseBody = await action.exec();
    return slack.buildResponse(responseBody);
  } catch (e) {
    return slack.buildResponse(e);
  }
};

function parseBody(body: LambdaBody): ParseBody {
  const args = body.text?.split(" ");
  if (args === undefined) {
    throw new Error(
      "引数が正しく渡されていません。もう一度helpを見てください。"
    );
  }

  // 引数がないもしくは'--'が入ってるときはhelp
  const isHelp = args[0] === "" || args[0].includes("--");
  // locationIdは数値5桁(prefecturesId2桁 + placeId3桁)のみ指定されている場合
  const gotLocationId = /^\d{5}$/.test(args[0]);
  const locationId = gotLocationId ? Number(args[0]) : null;
  // locationIdがない場合はlocationNameとして扱う
  const locationName = !gotLocationId ? args[0] : "";
  const isTomorrow = args[1] ? args[1].includes("--tomorrow") : false;

  return { isHelp, locationId, locationName, isTomorrow };
}
