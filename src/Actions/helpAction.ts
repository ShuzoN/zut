import * as help from "../help";
import { ActionInterface } from "../Types/action";

export class HelpAction implements ActionInterface {
  exec() {
    return new Promise<string>((resolve: (string: string) => void) => {
      resolve(help.message);
    });
  }
}
