import { Dialog, DialogActions, Button, DialogContent, Table, TableCell, TableRow, TableHead, Paper, DialogTitle, TableBody } from "@material-ui/core";
import { UserModel } from "../../api/models/User";
import styled from "styled-components";
import moment from "moment";
import { useState, useEffect } from "react";
import AuthService from "../../api/services/AuthService";

const Wrapper = styled.div`
  & > div {
    display: flex;

    & > span {
      &:first-child {
        width: 200px;
      }

      &:nth-child(2) {
        flex: 1;
      }
    }
  }
`;

const SearchResultDialog = (props: { handleClose: () => void; onClickRefund: (id) => (e) => void; open: boolean; user?: UserModel }) => {
  const { handleClose, user, onClickRefund } = props;
  // const [user, setUser] = useState(props.user);
  // const onClickRefund = async () => {
  // };

  return (
    <Dialog onClose={handleClose} open={props.open}>
      <DialogTitle>검색결과</DialogTitle>
      <DialogContent dividers>
        {user ? (
          <Wrapper>
            <div>
              <span>회원</span>
              <span>{user.hash}</span>
            </div>
            <div>
              <span>가입일</span>
              <span>{moment(user.createdAt).format("YYYY.MM.DD")}</span>
            </div>
            <div>
              <span>잔여코인</span>
              <span>{user.coin}</span>
            </div>
            {user.refund && (
              <div>
                <span>환불날짜</span>
                <span>{moment(user.updatedAt).format("YYYY.MM.DD")}</span>
              </div>
            )}
          </Wrapper>
        ) : (
          <div>검색결과 없음</div>
        )}
      </DialogContent>
      <DialogActions>
        {user && (
          <Button color="secondary" onClick={onClickRefund(user._id)} disabled={user.refund}>
            {user.refund ? "완료" : "환불"}
          </Button>
        )}
        <Button autoFocus onClick={handleClose} color="primary">
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SearchResultDialog;
