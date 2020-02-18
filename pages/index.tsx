import { withLayout } from "../components/Layout";
import Title from "../components/Title";
import { Table, Row, Cell } from "../components/Table";
import { useRouter } from "next/router";
import styled from "styled-components";
import { NextPageContext } from "next";
import { Divider } from "@material-ui/core";

const Wrapper = styled.div``;

const Index = props => {
  const router = useRouter();

  return (
    <Wrapper>
      <Title>{router.query.q === "t" ? "임시회원" : "정회원"}</Title>
      <Divider style={{ margin: "10px 0" }} />
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
    </Wrapper>
  );
};

Index.getInitialProps = async (ctx: NextPageContext) => {
  return {};
};

export default withLayout(Index);
