import { handler } from "./src/index";

(async () => {
  const [, , ...textArray] = process.argv;

  const response = await handler();

  console.dir(response, { depth: null });
})();
