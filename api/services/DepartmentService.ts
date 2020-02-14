import Api from "..";
import DepartmentModel from "../models/Department";

class DepartmentService extends Api {
  private base = "department";

  public get = (token: string, id?: string) => this.api.get(`/${this.base}/${id || ""}`, { headers: { Authorization: `Bearer ${token}` } });
  public post = (token: string, body: Partial<DepartmentModel>) => this.api.post(`/${this.base}`, body, { headers: { Authorization: `Bearer ${token}` } });
  public put = (token: string, id: string, body: Partial<DepartmentModel>) => this.api.put(`/${this.base}/${id}`, body, { headers: { Authorization: `Bearer ${token}` } });
  public delete = (token: string, id: string) => this.api.delete(`/${this.base}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
}

export default DepartmentService.instance as DepartmentService;
