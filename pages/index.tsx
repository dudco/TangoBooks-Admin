import { withLayout } from "../components/Layout";
import Title from "../components/Title";
import { Table, Row, Cell } from "../components/Table";
import { useRouter } from "next/router";
import styled from "styled-components";
import { NextPageContext } from "next";
import { Divider, TextField, Button } from "@material-ui/core";
import AuthService from "../api/services/AuthService";
import { useState, useEffect } from "react";
import { UserModel } from "../api/models/User";
import moment from "moment";
import SearchResultDialog from "../components/Dialog/SearchResultDialog";
import PaymentService from "../api/services/PaymentService";
import { PaymentModel } from "../api/models/Payment";

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

const Index = (props: { tempList; paymentList; users }) => {
  const router = useRouter();

  const [data, setData] = useState(router.query.q === "t" ? props.tempList : props.paymentList);

  useEffect(() => {
    setData(router.query.q === "t" ? props.tempList : props.paymentList);
  }, [router.query.q]);

  const [open, setOpen] = useState(false);
  const [targetUser, setTargetUser] = useState(undefined);
  const [search, setSearch] = useState("");

  return (
    <>
      <Wrapper>
        <div>
          <Title>{router.query.q === "t" ? "임시회원" : "정회원"}</Title>
          {router.query.q !== "t" && (
            <>
              <TextField label="검색" value={search} onChange={e => setSearch(e.target.value)} />
              <Button
                variant="contained"
                style={{ marginLeft: 16 }}
                onClick={() => {
                  const user = props.users.find(u => u.hash === search);
                  setTargetUser(user);
                  setOpen(true);
                }}
              >
                검색
              </Button>
            </>
          )}
        </div>

        <Divider style={{ margin: "10px 0" }} />
        <Table>
          <Row>
            <Cell>{moment().format("YYYY")}</Cell>
          </Row>

          {data.map((row, cIdx) => (
            <Row key={cIdx}>
              {row.map((v, rIdx) => (
                <Cell key={`${rIdx}-${cIdx}`}>{v}</Cell>
              ))}
            </Row>
          ))}
        </Table>
      </Wrapper>
      <SearchResultDialog open={open} handleClose={() => setOpen(false)} user={targetUser} />
    </>
  );
};

const genTempCalendar = datas => {
  const tempCalendarReducer = (prevDay, _, day) => {
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
            const date = `2020${month + 1 < 10 ? `0${month + 1}` : month + 1}${day + 1 < 10 ? `0${day + 1}` : day + 1}`;
            const users = datas.filter(u => u.temp).filter(u => moment(u.createdAt).format("YYYYMMDD") === date);
            prevMonth.push(users.length);
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
  };

  return [...new Array(32)].reduce(tempCalendarReducer, [["", ...[...new Array(12)].map((_, idx) => idx + 1), "계"]]);
};

const genPaymentCalendar = (datas: PaymentModel[]) => {
  const paymentCalendarReducer = (prevDay, _, day) => {
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
            const date = `2020${month + 1 < 10 ? `0${month + 1}` : month + 1}${day + 1 < 10 ? `0${day + 1}` : day + 1}`;
            const payments = datas.filter(p => moment(p.createdAt).format("YYYYMMDD") === date);
            prevMonth.push(payments.length);
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
  };
  return [...new Array(32)].reduce(paymentCalendarReducer, [["", ...[...new Array(12)].map((_, idx) => idx + 1), "계"]]);
};

Index.getInitialProps = async (ctx: NextPageContext) => {
  try {
    const res = await AuthService.getUsers();
    const users = res.data.data;
    const tempList = genTempCalendar(users);

    const payments = (await PaymentService.get()).data.data;
    console.log(payments);
    const paymentList = genPaymentCalendar(payments);
    return { tempList, paymentList, users };
  } catch (err) {
    console.log(err);
  }
};

export default withLayout(Index);
