import { LambdaBody } from "./Types/lambda";
import { TODO } from "./Types/utils";
import { URLSearchParams } from "url";

export const getBody = (event: TODO): LambdaBody => {
  const paramString = event["body-json"]["body"];
  const body = [...new URLSearchParams(paramString).entries()].reduce(
    (obj, e) => ({ ...obj, [e[0]]: e[1] }),
    {}
  );

  return body;
};
