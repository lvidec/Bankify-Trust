import {User} from "./user.model";

export class Payment{

  _id?: any;
  date?: Date;
  userIdFrom?: any;
  userIdTo?: any;
  amount?: number;
  userFrom?: User;
  userTo?: User;
  username?: string;
}
