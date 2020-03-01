import { Dialog, DialogActions, Button, DialogContent, Table, TableCell, TableRow, TableHead, Paper, DialogTitle, TableBody, Switch } from "@material-ui/core";
import { BookModel } from "../../api/models/Book";
import moment from "moment";
import BookService from "../../api/services/BookService";
import { useState, useEffect } from "react";

const BooksDialog = (props: { handleClose: () => void; open: boolean; books: BookModel[] }) => {
  const { handleClose } = props;

  const [books, setBooks] = useState([]);

  const handleChange = id => async e => {
    const value = e.target.checked;

    const res = await BookService.put(id, { active: value });
    if (res.status === 200) {
      alert("변경되었습니다.");

      setBooks(
        books.map(book => {
          if (book._id === res.data.data._id) return res.data.data;
          else return book;
        })
      );
    }
  };

  useEffect(() => {
    setBooks(props.books);
    console.log(books);
  }, [props.books]);

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
              <TableCell>상태 변경</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book, idx) => (
              <TableRow key={book._id}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{book.name}</TableCell>
                <TableCell>{book.user.length}</TableCell>
                <TableCell>{moment(book.createdAt).format("YYYY-MM-DD")}</TableCell>
                <TableCell>{book.active ? "활성화" : "정지"}</TableCell>
                <TableCell>
                  <Switch checked={book.active} onChange={handleChange(book._id)} color="primary" />
                </TableCell>
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
