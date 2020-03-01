import { UserModel } from "./User";
import { BookModel } from "./Book";
import { ReportModel } from "./Report";

export interface HistoryModel {
  user: UserModel;
  book: BookModel;
  code: string;
  coin?: number;
  report: ReportModel;

  createdAt: Date;
  updatedAt: Date;
}
