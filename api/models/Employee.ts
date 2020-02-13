import DepartmentModel from "./Department";

export default interface EmployeeModel {
  _id: string;
  name: number;
  identity_number: string;
  address: string; // 주소
  phone: string;
  telephone: string; // 자택
  bank: string;
  account: string;
  department: DepartmentModel;

  isLeave: boolean;

  createAt: Date;
  updateAt: Date;
}
