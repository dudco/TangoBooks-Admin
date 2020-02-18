import { UserModel } from "./User";
import { BookModel } from "./Book";
import { PublisherModel } from "./Publisher";

export interface ReportModel {
  _id: string;
  publisher: PublisherModel;
  user: UserModel;
  book: BookModel;
  code: string;
  reason: string;
  answer: string;
  refund: boolean;

  createdAt: Date;
}
