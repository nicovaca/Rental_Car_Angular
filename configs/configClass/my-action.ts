import { MyButtonConfig } from "../my-button-config/my-button-config";
import { MyTableActionEnum } from "./my-table-action-enum";

export class MyAction {
  type! : MyTableActionEnum ;
  buttonConfig! : MyButtonConfig;
  newRowButton!:boolean;
}
