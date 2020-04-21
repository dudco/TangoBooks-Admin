import { UserModel } from "./User";

export interface PaymentModel {
  _id: string;
  user: UserModel; // 입금유저
  name: string; // 입금자명
  bank: string; // 거래은행
  check: Boolean; // 확인
  usage: string; // 용도
  tool: string; // 수단
  done: boolean;

  createdAt: Date;
  updatedAt: Date;
}
