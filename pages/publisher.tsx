import { withLayout } from "../components/Layout";
import { NextPageContext } from "next";
import styled from "styled-components";
import Title from "../components/Title";
import { Divider, Table, Paper, TableHead, TableRow, TableCell, TextField, TableBody } from "@material-ui/core";
import { useState, useEffect } from "react";
import BooksDialog from "../components/Dialog/BooksDialog";
import PublisherService from "../api/services/PublisherService";
import { PublisherModel } from "../api/models/Publisher";
import { BookModel } from "../api/models/Book";

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
const Publisher = (props: { publishers: PublisherModel[] }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [books, setBooks] = useState<BookModel[]>([]);
  const [search, setSearch] = useState("");
  const [publishers, setPublishers] = useState(props.publishers);

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  useEffect(() => {
    if (search === "") {
      setPublishers(props.publishers);
    } else {
      setPublishers(props.publishers.filter(p => p.author.includes(search)));
    }
  }, [search]);
  return (
    <>
      <Wrapper>
        <div>
          <Title>출판사</Title>
          <TextField label="검색" value={search} onChange={e => setSearch(e.target.value)} />
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
            <TableBody>
              {publishers.map((p, idx) => (
                <TableRow key={p._id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{p.author}</TableCell>
                  <TableCell>{p.address}</TableCell>
                  <TableCell>{p.page}</TableCell>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{p.rank}</TableCell>
                  <TableCell>{p.phone}</TableCell>
                  <TableCell>{p.email}</TableCell>
                  <TableCell
                    onClick={() => {
                      setBooks(p.book);
                      setShowDialog(true);
                    }}
                  >
                    {p.book.length}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Wrapper>
      <BooksDialog books={books} open={showDialog} handleClose={handleCloseDialog} />
    </>
  );
};

Publisher.getInitialProps = async (ctx: NextPageContext) => {
  const res = await PublisherService.get();
  if (res.status === 200) {
    console.log(res);
    return { publishers: res.data.data };
  }
  return {};
};

export default withLayout(Publisher);
