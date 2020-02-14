import Api from "..";
import AdminModel from "../models/Admin";

class AdminService extends Api {
  private base = "admin";

  public get = (token: string, id?: string) => this.api.get(`/${this.base}/${id || ""}`, { headers: { Authorization: `Bearer ${token}` } });
  public put = (token: string, body: Partial<AdminModel>) => this.api.put(`/${this.base}`, body, { headers: { Authorization: `Bearer ${token}` } });
}

export default AdminService.instance as AdminService;
