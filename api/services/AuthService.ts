import Api from "..";

class AuthService extends Api {
  private base = "auth";

  public login = (body: { user_id: string; user_pw: string }) => this.api.post(`/${this.base}/login`, body);
}

export default AuthService.instance as AuthService;
