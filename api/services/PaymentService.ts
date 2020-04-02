import Api from "..";

class PaymentService extends Api {
  private base = "payment";

  public get = () => this.api.get(`/${this.base}/`);
  public getByDate = date => this.api.get(`/${this.base}`, { params: { date } });
  public put = (id, data) => this.api.put(`/${this.base}/${id}`, data);
}

export default PaymentService.instance as PaymentService;
