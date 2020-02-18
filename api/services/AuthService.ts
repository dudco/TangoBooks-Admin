import Api from "..";

class AuthService extends Api {
  private base = "auth";

  public getUsers = () => this.api.get(`/${this.base}/users`);
}

export default AuthService.instance as AuthService;
