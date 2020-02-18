import { withLayout } from "../components/Layout";
import styled from "styled-components";
import Title from "../components/Title";
import { Divider, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import { NextPageContext } from "next";
import ReportService from "../api/services/ReportService";
import { ReportModel } from "../api/models/Report";
import moment from "moment";

const Wrapper = styled.div``;
const Report = (props: { reports: ReportModel[] }) => {
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
          <TableBody>
            {props.reports.map((r, idx) => (
              <TableRow key={r._id}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{moment(r.createdAt).format("YYYY-MM-DD")}</TableCell>
                <TableCell>{r.publisher.author}</TableCell>
                <TableCell>{r.user.hash}</TableCell>
                <TableCell>{r.book.name}</TableCell>
                <TableCell>{r.code}</TableCell>
                <TableCell>
                  {(() => {
                    switch (r.reason) {
                      case "wrong":
                        return "잘못된 자료";
                      case "link":
                        return "링크가 잘못됨";
                      case "other":
                        return "기타";
                    }
                  })()}
                </TableCell>
                <TableCell>{r.answer}</TableCell>
                <TableCell>{r.refund ? "O" : "X"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Wrapper>
  );
};

Report.getInitialProps = async (ctx: NextPageContext) => {
  const res = await ReportService.get();
  if (res.status === 200) {
    console.log(res.data.data);
    return { reports: res.data.data };
  }
  return {};
};

export default withLayout(Report);
