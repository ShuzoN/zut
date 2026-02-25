import { LambdaBody } from "./Types/lambda";
import { ParseBody, TODO } from "./Types/utils";
import { URLSearchParams } from "url";

export const getBody = (event: TODO): LambdaBody => {
  const rawBody: string = event.body;
  const paramString = event.isBase64Encoded
    ? Buffer.from(rawBody, "base64").toString("utf-8")
    : rawBody;
  const body = [...new URLSearchParams(paramString).entries()].reduce(
    (obj, e) => ({ ...obj, [e[0]]: e[1] }),
    {}
  );
  return body;
};
