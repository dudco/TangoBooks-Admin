import { UserModel } from "./User";

export interface BookModel {
  _id: string;
  name: string;
  hash: string;
  active: boolean;
  codes: [
    {
      code: string;
      url: string;
      active: boolean;
      price: number;
    }
  ];
  user: UserModel[];
  createdAt: Date;
}
