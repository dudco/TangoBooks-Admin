import axios, { AxiosInstance } from "axios";
import cookies from "js-cookie";
const singleton = Symbol();

class Api {
  protected api: AxiosInstance;
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.API_URL}/v1`,
      withCredentials: true
    });
  }

  static get instance() {
    // Try to get an efficient singleton
    if (!this[singleton]) {
      this[singleton] = new this();
    }
    return this[singleton];
  }
}
export default Api;
