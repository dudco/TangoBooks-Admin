import { withLayout } from "../components/Layout";
import styled from "styled-components";
import Title from "../components/Title";
import { useRouter } from "next/router";
import { Divider, Paper, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import { Table, Row, Cell } from "../components/Table";
import { Table as MuiTable } from "@material-ui/core";
import { NextPageContext } from "next";
import moment from "moment";
import PublisherService from "../api/services/PublisherService";
import { PublisherModel } from "../api/models/Publisher";
import { useEffect, useState } from "react";

const Wrapper = styled.div`
  .date-year {
    font-size: 18px;
  }
  .date-month-pick {
    display: flex;

    & > span {
      margin-right: 8px;
      margin-top: 16px;
      cursor: pointer;
      color: black;

      &.select {
        color: #2979ff;
        font-weight: bold;
      }
    }
  }
`;
const Status = (props: { publishers: PublisherModel[] }) => {
  const router = useRouter();
  const [select, setSelect] = useState(moment().format("MM"));
  const [year, setYear] = useState(moment().format("YYYY"));
  const [rowData, setRowData] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const historys = props.publishers.reduce((prev, publisher) => {
      const data = publisher.book.reduce((p, b) => {
        const inner = b.historys.map((history) => ({
          date: history.createdAt,
          coin: history.coin,
          publisher: publisher.author,
        }));
        return p.concat(inner);
      }, []);
      return prev.concat(data);
    }, []);

    setRowData(historys);
  }, []);

  useEffect(() => {
    updateData();
  }, [rowData, year]);

  const updateData = () => {
    let data;
    if (router.query.q === "t") {
      // data = [];

      data = [...new Array(32)].reduce(
        (prevDay, _, day) => {
          if (day === 31) {
            const d = ["계"];
            let sum = 0;
            for (let j = 1; j <= 13; j++) {
              sum = 0;
              for (let i = 1; i <= 31; i++) {
                sum += prevDay[i][j];
              }
              d.push(sum + "");
            }
            prevDay.push(d);
          } else {
            const d = [...new Array(13)].reduce(
              (prevMonth, _, month) => {
                if (month !== 12) {
                  const date = `${year}${month + 1 < 10 ? `0${month + 1}` : month + 1}${day + 1 < 10 ? `0${day + 1}` : day + 1}`;
                  // const users = props.users.filter(u => (router.query.q === "t" ? u.temp : !u.temp)).filter(u => moment(u.createdAt).format("YYYYMMDD") === date);
                  // prevMonth.push(users.length);
                  prevMonth.push(rowData.filter((r) => moment(r.date).format("YYYYMMDD") === date).reduce((p, r) => p + r.coin, 0));
                } else {
                  const sum = prevMonth.reduce((p, v, idx) => {
                    if (idx !== 0 && idx !== 12) return p + v;
                    return p;
                  }, 0);
                  prevMonth.push(sum);
                }
                return prevMonth;
              },
              [day + 1]
            );
            prevDay.push(d);
          }
          return prevDay;
        },
        [["", ...[...new Array(12)].map((_, idx) => idx + 1), "계"]]
      );
    } else {
      console.log("row", rowData);
      data = rowData
        .filter((d) => moment(d.date).format("MM") === select && moment(d.date).format("YYYY") === year)
        .reduce((p, d) => {
          const idx = p.findIndex((a) => a.publisher === d.publisher);

          if (idx > -1) {
            p[idx].coin += d.coin;
          } else {
            p.push(d);
          }

          return p;
        }, []);
      console.log("aa", data);
    }
    setData(data);
  };

  function onClickNextYear() {
    setYear(moment(year).add(1, "year").format("YYYY"));
  }
  function onClickPrevYear() {
    setYear(moment(year).add(-1, "year").format("YYYY"));
  }

  useEffect(() => {
    updateData();
  }, [router.query.q]);

  useEffect(() => {
    updateData();
  }, [select]);

  const onClickMonth = (num) => () => {
    setSelect(num);
  };

  return (
    <Wrapper>
      <Title>{router.query.q === "t" ? "시간별 현황" : "출판사별 현황"}</Title>

      {router.query.q === "t" && data[0] instanceof Array ? (
        <>
          <Divider style={{ margin: "10px 0" }} />
          <div className="date-year">
            <span onClick={onClickPrevYear} style={{ cursor: "pointer" }}>
              ◀︎
            </span>
            <span>{year}년</span>
            <span onClick={onClickNextYear} style={{ cursor: "pointer" }}>
              ▶︎
            </span>
          </div>
          <Table>
            {data.map((row, cIdx) => (
              <Row key={cIdx}>
                {row.map((v, rIdx) => (
                  <Cell key={`${rIdx}-${cIdx}`}>{v}</Cell>
                ))}
              </Row>
            ))}
          </Table>
        </>
      ) : (
        <>
          <div className="date-year">
            <span onClick={onClickPrevYear} style={{ cursor: "pointer" }}>
              ◀︎
            </span>
            <span>{year}년</span>
            <span onClick={onClickNextYear} style={{ cursor: "pointer" }}>
              ▶︎
            </span>
          </div>
          <div className="date-month-pick">
            <span className={select === "01" ? "select" : ""} onClick={onClickMonth("01")}>
              1
            </span>
            <span className={select === "02" ? "select" : ""} onClick={onClickMonth("02")}>
              2
            </span>
            <span className={select === "03" ? "select" : ""} onClick={onClickMonth("03")}>
              3
            </span>
            <span className={select === "04" ? "select" : ""} onClick={onClickMonth("04")}>
              4
            </span>
            <span className={select === "05" ? "select" : ""} onClick={onClickMonth("05")}>
              5
            </span>
            <span className={select === "06" ? "select" : ""} onClick={onClickMonth("06")}>
              6
            </span>
            <span className={select === "07" ? "select" : ""} onClick={onClickMonth("07")}>
              7
            </span>
            <span className={select === "08" ? "select" : ""} onClick={onClickMonth("08")}>
              8
            </span>
            <span className={select === "09" ? "select" : ""} onClick={onClickMonth("09")}>
              9
            </span>
            <span className={select === "10" ? "select" : ""} onClick={onClickMonth("10")}>
              10
            </span>
            <span className={select === "11" ? "select" : ""} onClick={onClickMonth("11")}>
              11
            </span>
            <span className={select === "12" ? "select" : ""} onClick={onClickMonth("12")}>
              12
            </span>
          </div>
          <Divider style={{ margin: "10px 0" }} />
          <Paper>
            <MuiTable>
              <TableHead>
                <TableRow>
                  <TableCell>번호</TableCell>
                  <TableCell>출판사(작가)</TableCell>
                  <TableCell>가상인세</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((d, idx) => (
                  <TableRow key={d.publisher}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{d.publisher}</TableCell>
                    <TableCell>{d.coin}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </MuiTable>
          </Paper>
        </>
      )}
    </Wrapper>
  );
};

Status.getInitialProps = async (ctx: NextPageContext) => {
  const res = await PublisherService.get();

  if (res.status === 200) {
    return { publishers: res.data.data };
  } else {
    return { publishers: [] };
  }
};

export default withLayout(Status);
