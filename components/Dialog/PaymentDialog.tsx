import { Dialog, DialogActions, Button, DialogContent, Table, TableCell, TableRow, TableHead, Paper, DialogTitle, TableBody } from "@material-ui/core";
import { UserModel } from "../../api/models/User";
import styled from "styled-components";
import moment from "moment";
import { useState, useEffect } from "react";
import { PaymentModel } from "../../api/models/Payment";
import PaymentService from "../../api/services/PaymentService";

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

const PaymenttDialog = (props: { handleClose: () => void; open: boolean; date?: string }) => {
  const { handleClose } = props;
  const [data, setData] = useState<PaymentModel[]>([]);

  useEffect(() => {
    if (!open) {
      setData([]);
    } else {
      console.log(props.date);
      PaymentService.getByDate(props.date)
        .then(res => {
          console.log(res.data.data);
          setData(res.data.data);
        })
        .catch(err => {
          console.log(err);
          setData([]);
        });
    }
  }, [props.open, props.date]);

  const onClickConfirm = idx => async () => {
    if (data[idx].check) {
      alert("이미 확인되었습니다.");
    } else {
      await PaymentService.put(data[idx]._id, { check: true });
      alert("업데이트 되었습니다.");

      const newData = data.map((d, tIdx) => {
        if (idx === tIdx) {
          return {
            ...d,
            check: true
          };
        } else {
          return d;
        }
      });

      setData(newData);
    }
  };
  return (
    <Dialog onClose={handleClose} open={props.open} fullWidth={true} maxWidth="md">
      <DialogTitle>정보 결과</DialogTitle>
      <DialogContent dividers>
        {data.length > 0 ? (
          <Wrapper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>순번</TableCell>
                  <TableCell>회원번호</TableCell>
                  <TableCell>입금자</TableCell>
                  <TableCell>거래은행</TableCell>
                  <TableCell></TableCell>
                  <TableCell>용도</TableCell>
                  <TableCell>수단</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((d, idx) => (
                  <TableRow>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{d.user.hash}</TableCell>
                    <TableCell>{d.name}</TableCell>
                    <TableCell>{d.bank}</TableCell>
                    <TableCell onClick={onClickConfirm(idx)} style={{ color: d.check ? "black" : "blue", cursor: d.check ? "" : "pointer" }}>
                      {d.check ? "완료" : "확인"}
                    </TableCell>
                    <TableCell>{d.tool}</TableCell>
                    <TableCell>{d.usage}</TableCell>
                    <TableCell style={{ color: d.check ? "black" : "blue" }}>{d.check ? "완료" : "확인"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Wrapper>
        ) : (
          <div>결과 없음</div>
        )}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymenttDialog;
