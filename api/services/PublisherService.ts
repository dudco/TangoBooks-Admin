import Api from "..";

class PublisherService extends Api {
  private base = "publisher";

  public get = () => this.api.get(`/${this.base}`);
}

export default PublisherService.instance as PublisherService;
