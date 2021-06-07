import * as argBody from "./argBody";
import * as lambda from "./lambda";
import * as slack from "./slack";
import { ParseBody, TODO } from "./Types/utils";
import { Router } from "./router";

export const handler = async (event: TODO) => {
  try {
    const parsedBody: ParseBody = argBody.parse(lambda.getBody(event));
    const router = new Router(parsedBody);
    const action = router.judge();
    const responseBody = await action.exec();
    return slack.buildResponse(responseBody);
  } catch (e) {
    return slack.buildResponse(e);
  }
};
