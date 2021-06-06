import { WeatherAction } from "./Actions/weatherAction";
import { ParseBody } from "./Types/utils";
import { HelpAction } from "./Actions/helpAction";
import { ActionInterface } from "./Types/action";

interface RouterInterface {
  judge: () => ActionInterface;
}

type ActionsType = "help" | "weather";

export class Router implements RouterInterface {
  readonly body: ParseBody;
  constructor(body: ParseBody) {
    this.body = body;
  }

  judge = () => {
    const actions = this.actions();

    switch (actions) {
      case "help":
        return new HelpAction();
      case "weather":
        return new WeatherAction(this.body);
      default:
        return new HelpAction();
    }
  };

  private actions: () => ActionsType = () => {
    if (this.body.isHelp) {
      return "help";
    }

    return "weather";
  };
}
