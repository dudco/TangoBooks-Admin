import EmployeeModel from "./Employee";
import UserModel from "./User";

export default interface DepartmentModel extends UserModel {
  _id: string;
  employees: EmployeeModel[];

  name: string;
  phone: string;

  createAt: Date;
  updateAt: Date;
}
