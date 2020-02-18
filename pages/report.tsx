import { withLayout } from "../components/Layout";
import styled from "styled-components";
import Title from "../components/Title";
import { Divider, Paper, Table, TableHead, TableRow, TableCell } from "@material-ui/core";

const Wrapper = styled.div``;
const Report = () => {
  return (
    <Wrapper>
      <Title>신고</Title>
      <Divider style={{ margin: "10px 0" }} />
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>날짜</TableCell>
              <TableCell>출판사</TableCell>
              <TableCell>구독자 번호</TableCell>
              <TableCell>책이름</TableCell>
              <TableCell>접속코드</TableCell>
              <TableCell>사유</TableCell>
              <TableCell>답장</TableCell>
              <TableCell>환불</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </Paper>
    </Wrapper>
  );
};

export default withLayout(Report);
