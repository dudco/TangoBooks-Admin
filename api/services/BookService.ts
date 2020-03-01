import Api from "..";

class AuthService extends Api {
  private base = "book";

  public put = (id, body) => this.api.put(`/${this.base}/${id}`, body);
}

export default AuthService.instance as AuthService;
