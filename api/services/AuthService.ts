import Api from "..";

class AuthService extends Api {
  private base = "auth";

  public getUsers = () => this.api.get(`/${this.base}/users`);
  public refundUser = (id: string) => this.api.put(`/${this.base}/refund/${id}`);
}

export default AuthService.instance as AuthService;
