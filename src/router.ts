import { HelpAction } from "./Actions/helpAction";
import { ActionInterface } from "./Types/action";

interface RouterInterface {
  judge: () => ActionInterface;
}

export class Router implements RouterInterface {
  constructor() {}

  judge = () => {
    return new HelpAction();
  };
}
