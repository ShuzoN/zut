import { ActionInterface } from "../Types/action";
import * as help from "../help";

export class HelpAction implements ActionInterface {
  exec = () => {
    return help.message;
  };
}
