import { LambdaBody } from "./Types/lambda";
import { ParseBody } from "./Types/utils";

export const parse = (body: LambdaBody): ParseBody => {
  const args = body.text?.split(" ");
  if (args === undefined) {
    throw new Error(
      "引数が正しく渡されていません。もう一度helpを見てください。"
    );
  }

  // 引数がないもしくは'--'が入ってるときはhelp
  const isHelp = args[0] === "" || args[0].includes("--");
  // 空白の除去
  const trimed = args[0].trim();
  // locationIdは数値5桁(prefecturesId2桁 + placeId3桁)のみ指定されている場合
  const gotLocationId = /^\d{5}$/.test(trimed);
  const locationId = gotLocationId ? trimed : null;
  // locationIdがない場合はlocationNameとして扱う
  const locationName = !gotLocationId ? trimed : "";
  const isTomorrow = args[1] ? args[1].includes("--tomorrow") : false;

  return { isHelp, locationId, locationName, isTomorrow };
};
