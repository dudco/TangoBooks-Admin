import { BookModel } from "./Book";

export interface UserModel {
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
  createdAt: Date;
}
