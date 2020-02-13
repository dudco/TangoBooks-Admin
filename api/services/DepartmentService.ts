import Api from "..";
import DepartmentModel from "../models/Department";

class DepartmentService extends Api {
  private base = "department";

  public get = (id?: string) => this.api.get(`/${this.base}/${id || ""}`);
  public post = (body: Partial<DepartmentModel>) => this.api.post(`/${this.base}`, body);
  public put = (id: string, body: Partial<DepartmentModel>) => this.api.put(`/${this.base}/${id}`, body);
  public delete = (id: string) => this.api.delete(`/${this.base}/${id}`);
}

export default DepartmentService.instance as DepartmentService;
