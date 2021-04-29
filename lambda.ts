import { LambdaBody } from "./Types/lambda";

export const getBody = (event): LambdaBody => {
  const paramString = event["body-json"]["body"];
  const body = [...new URLSearchParams(paramString).entries()].reduce(
    (obj, e) => ({ ...obj, [e[0]]: e[1] }),
    {}
  );

  return body;
};
