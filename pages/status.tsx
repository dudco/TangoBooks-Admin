import { withLayout } from "../components/Layout";
import styled from "styled-components";
import Title from "../components/Title";
import { useRouter } from "next/router";
import { Divider, Paper, TableHead, TableRow, TableCell } from "@material-ui/core";
import { Table, Row, Cell } from "../components/Table";
import { Table as MuiTable } from "@material-ui/core";

const Wrapper = styled.div``;
const Status = () => {
  const router = useRouter();

  return (
    <Wrapper>
      <Title>{router.query.q === "t" ? "시간별 현황" : "출판사별 현황"}</Title>
      <Divider style={{ margin: "10px 0" }} />

      {router.query.q === "t" ? (
        <Table>
          <Row>
            <Cell>2020</Cell>
          </Row>
          <Row>
            <Cell></Cell>
            {[...new Array(12)].map((_, idx) => (
              <Cell key={`header_sum_${idx}`}>{idx + 1}</Cell>
            ))}
            <Cell>계</Cell>
          </Row>

          {[...new Array(31)].map((_, daysIdx) => (
            <Row key={`days_${daysIdx}`}>
              <Cell>{daysIdx + 1}</Cell>
              {[...new Array(12)].map((_, monthIdx2) => (
                <Cell key={`month_${monthIdx2}_days_${daysIdx}`}></Cell>
              ))}
              <Cell></Cell>
            </Row>
          ))}
          <Row>
            <Cell>계</Cell>
            {[...new Array(12)].map((_, monthIdx2) => (
              <Cell key={`month_sum_${monthIdx2}`}></Cell>
            ))}
            <Cell></Cell>
          </Row>
        </Table>
      ) : (
        <Paper>
          <MuiTable>
            <TableHead>
              <TableRow>
                <TableCell>번호</TableCell>
                <TableCell>출판사(작가)</TableCell>
                <TableCell>가상인쇄</TableCell>
                <TableCell>번호</TableCell>
                <TableCell>출판사(작가)</TableCell>
                <TableCell>가상인쇄</TableCell>
                <TableCell>번호</TableCell>
                <TableCell>출판사(작가)</TableCell>
                <TableCell>가상인쇄</TableCell>
              </TableRow>
            </TableHead>
          </MuiTable>
        </Paper>
      )}
    </Wrapper>
  );
};

export default withLayout(Status);
