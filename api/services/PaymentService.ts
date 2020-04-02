import Api from "..";

class PaymentService extends Api {
  private base = "payment";

  public get = () => this.api.get(`/${this.base}/`);
  public getById = id => this.api.get(`/${this.base}/${id}`);
}

export default PaymentService.instance as PaymentService;
