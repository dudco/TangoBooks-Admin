import UserModel from "./User";

export interface AdminModel extends UserModel {
  _id: string;
  charge_per_day: number;
  lunch: number;
  pension: number;
  health_insurance: number;
  employment_insurance: number;
  income_tax: number;
  resident_tax: number;
  join_date: Date;
  leave_date: Date;

  createAt: Date;
  updateAt: Date;
}