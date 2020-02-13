import Api from "..";
import EmployeeModel from "../models/Employee";

class EmployeeService extends Api {
  private base = "employee";

  public get = (id?: string) => this.api.get(`/${this.base}/${id || ""}`);
  public post = (body: Partial<EmployeeModel>) => this.api.post(`/${this.base}`, body);
  public put = (id: string, body: Partial<EmployeeModel>) => this.api.put(`/${this.base}/${id}`, body);
  public delete = (id: string) => this.api.get(`/${this.base}/${id}`);
}

export default EmployeeService.instance as EmployeeService;
