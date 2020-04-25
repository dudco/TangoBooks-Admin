import { BookModel } from "./Book";

export interface UserModel {
  _id: string;
  user_id: string;
  user_pw?: string;
  library?: BookModel[];
  coin?: number;
  experience: number;
  username: string;
  temp: boolean;
  hash: string;
  generateHash: (user_pw: string) => string;
  validatePassword: (user_pw: string) => boolean;
  admin: boolean;
  done: false;
  refund: boolean;
  createdAt: Date;
  updatedAt: Date;
}
