import { Dialog, DialogActions, Button, DialogContent, Table, TableCell, TableRow, TableHead, Paper, DialogTitle } from "@material-ui/core";

const BooksDialog = (props: { handleClose: () => void; open: boolean }) => {
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
