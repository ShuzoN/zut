import { handler } from "../src/index";

test("hello typescript", async () => {
  expect(await handler()).toEqual("hello");
});
