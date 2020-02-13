import EmployeeModel from "./Employee";

export default interface DepartmentModel {
  _id: string;
  employees: EmployeeModel[];

  name: string;
  phone: string;

  createAt: Date;
  updateAt: Date;
}
