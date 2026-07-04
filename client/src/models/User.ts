import { AbstractModel } from "./AbstractModel";

export interface User extends AbstractModel {
  email: string;
  name: string;
}
