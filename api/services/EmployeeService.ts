import Api from "..";
import EmployeeModel from "../models/Employee";

class EmployeeService extends Api {
  private base = "employee";

  public get = (token: string, id?: string) => this.api.get(`/${this.base}/${id || ""}`, { headers: { Authorization: `Bearer ${token}` } });
  public post = (token: string, body: Partial<EmployeeModel>) => this.api.post(`/${this.base}`, body, { headers: { Authorization: `Bearer ${token}` } });
  public put = (token: string, id: string, body: Partial<EmployeeModel>) => this.api.put(`/${this.base}/${id}`, body, { headers: { Authorization: `Bearer ${token}` } });
  public delete = (token: string, id: string) => this.api.delete(`/${this.base}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
}

export default EmployeeService.instance as EmployeeService;
