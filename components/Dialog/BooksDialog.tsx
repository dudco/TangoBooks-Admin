import { Dialog, DialogActions, Button, DialogContent, Table, TableCell, TableRow, TableHead, Paper, DialogTitle, TableBody } from "@material-ui/core";
import { BookModel } from "../../api/models/Book";
import moment from "moment";

const BooksDialog = (props: { handleClose: () => void; open: boolean; books: BookModel[] }) => {
  const { handleClose } = props;
  return (
    <Dialog onClose={handleClose} open={props.open}>
      <DialogContent dividers style={{ padding: 0 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>책이름</TableCell>
              <TableCell>구독자 수</TableCell>
              <TableCell>시작일</TableCell>
              <TableCell>상태</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.books.map((book, idx) => (
              <TableRow key={book._id}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{book.name}</TableCell>
                <TableCell>{book.user.length}</TableCell>
                <TableCell>{moment(book.createdAt).format("YYYY-MM-DD")}</TableCell>
                <TableCell>{book.active ? "활성화" : "정지"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BooksDialog;
