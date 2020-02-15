import Api from "..";

class AdminService extends Api {
  private base = "attendanse";

  public put = (token: string, body: any) => this.api.put(`/${this.base}`, body, { headers: { Authorization: `Bearer ${token}` } });
}

export default AdminService.instance as AdminService;
