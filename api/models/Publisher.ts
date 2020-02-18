import { BookModel } from "./Book";

export interface PublisherModel {
  _id: string;
  author: string;
  address: string;
  page: string;
  name: string;
  rank: string;
  phone: string;
  email: string;
  book: BookModel[];
  publisher_id: string;
}
