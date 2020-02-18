import { withLayout } from "../components/Layout";
import Title from "../components/Title";
import { Table, Row, Cell } from "../components/Table";
import { useRouter } from "next/router";
import styled from "styled-components";
import { NextPageContext } from "next";
import { Divider } from "@material-ui/core";
import AuthService from "../api/services/AuthService";
import { useState, useEffect } from "react";
import { UserModel } from "../api/models/User";
import moment from "moment";

const Wrapper = styled.div``;

const Index = (props: { users: UserModel[] }) => {
  const router = useRouter();

  const [data, setData] = useState(
    [...new Array(31)].reduce(
      (prevDay, _, day) => {
        const d = [...new Array(13)].reduce(
          (prevMonth, _, month) => {
            if (month !== 12) {
              const date = `2020${month + 1 < 10 ? `0${month + 1}` : month + 1}${day + 1 < 10 ? `0${day + 1}` : day + 1}`;
              const users = props.users.filter(u => (router.query.q === "t" ? u.temp : !u.temp)).filter(u => moment(u.createdAt).format("YYYYMMDD") === date);
              prevMonth.push(users.length);
            } else {
              prevMonth.push(
                prevMonth.reduce((p, v, idx, arr) => {
                  if (idx !== 0 && idx !== 12) return p + arr[idx];
                  return p;
                }, 0)
              );
            }
            return prevMonth;
          },
          [day + 1]
        );
        prevDay.push(d);
        return prevDay;
      },
      [["", ...[...new Array(12)].map((_, idx) => idx + 1)]]
    )
  );

  useEffect(() => {
    console.log(router.query.q);
    setData(
      [...new Array(31)].reduce(
        (prevDay, _, day) => {
          const d = [...new Array(12)].reduce(
            (prevMonth, _, month) => {
              if (month !== 12) {
                const date = `2020${month + 1 < 10 ? `0${month + 1}` : month + 1}${day + 1 < 10 ? `0${day + 1}` : day + 1}`;
                const users = props.users.filter(u => (router.query.q === "t" ? u.temp : !u.temp)).filter(u => moment(u.createdAt).format("YYYYMMDD") === date);
                prevMonth.push(users.length);
              }
              // else {
              //   prevMonth.push(prevMonth.reduce((p, v, idx) => idx !== 0 && idx !== 12 && p + v, 0));
              // }
              return prevMonth;
            },
            [day + 1]
          );
          prevDay.push(d);
          return prevDay;
        },
        [["", ...[...new Array(12)].map((_, idx) => idx + 1)]]
      )
    );
  }, [router.query.q]);

  return (
    <Wrapper>
      <Title>{router.query.q === "t" ? "임시회원" : "정회원"}</Title>
      <Divider style={{ margin: "10px 0" }} />
      <Table>
        <Row>
          <Cell>2020</Cell>
        </Row>

        {data.map((row, cIdx) => (
          <Row key={cIdx}>
            {row.map((v, rIdx) => (
              <Cell key={`${rIdx}-${cIdx}`}>{v}</Cell>
            ))}
          </Row>
        ))}
        {/* <Row>
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
        </Row> */}
      </Table>
    </Wrapper>
  );
};

Index.getInitialProps = async (ctx: NextPageContext) => {
  const res = await AuthService.getUsers();
  if (res.status === 200) {
    console.log(res.data.data);
    return { users: res.data.data };
  }
  return {};
};

export default withLayout(Index);
