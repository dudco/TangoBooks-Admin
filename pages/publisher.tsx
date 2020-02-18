import { withLayout } from "../components/Layout";
import { NextPageContext } from "next";
import styled from "styled-components";
import Title from "../components/Title";
import { Divider, Table, Paper, TableHead, TableRow, TableCell, TextField } from "@material-ui/core";
import { useState } from "react";
import BooksDialog from "../components/Dialog/BooksDialog";

const Wrapper = styled.div`
  & > div:first-child {
    display: flex;
    align-items: baseline;

    & > div:nth-child(2) {
      flex: 1;
      margin-left: 40px;
      font-size: 20px;
    }
  }
`;
const Publisher = () => {
  const [showDialog, setShowDialog] = useState(false);

  const handleCloseDialog = () => {
    setShowDialog(false);
  };
  return (
    <>
      <Wrapper>
        <div>
          <Title>출판사</Title>
          <TextField label="검색" />
        </div>
        <Divider style={{ margin: "10px 0" }} />
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>출판사(작가)</TableCell>
                <TableCell>주소</TableCell>
                <TableCell>홈페이지</TableCell>
                <TableCell>관리자</TableCell>
                <TableCell>직위</TableCell>
                <TableCell>연락처</TableCell>
                <TableCell>이메일</TableCell>
                <TableCell onClick={() => setShowDialog(true)}>식별코드</TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </Paper>
      </Wrapper>
      <BooksDialog open={showDialog} handleClose={handleCloseDialog} />
    </>
  );
};

Publisher.getInitialProps = async (ctx: NextPageContext) => {
  return {};
};

export default withLayout(Publisher);
