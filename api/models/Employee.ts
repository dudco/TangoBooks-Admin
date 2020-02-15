import DepartmentModel from "./Department";

export default interface EmployeeModel {
  _id: string;
  name: string;
  identity_number: string;
  address: string; // 주소
  phone: string;
  telephone: string; // 자택
  bank: string;
  account: string;
  department: DepartmentModel | string;

  isLeave: boolean;
  join: Date;

  attendances: { date: string; attend: number }[];

  createAt: Date;
  updateAt: Date;
}
