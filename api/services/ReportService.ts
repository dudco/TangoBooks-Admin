import Api from "..";

class ReportService extends Api {
  private base = "report";

  public get = () => this.api.get(`/${this.base}`);
}

export default ReportService.instance as ReportService;
