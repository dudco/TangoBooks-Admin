import UserModel from "./User";

export default interface AdminModel extends UserModel {
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
  paid_holydays: string[];

  createAt: Date;
  updateAt: Date;
}
