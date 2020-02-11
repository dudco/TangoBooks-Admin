import Link from "next/link";
import { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import styled from "styled-components";
import css from "styled-jsx/css";
interface Props {
  children?: React.ReactElement | React.ReactElement[];
  title: string;
  className?: string;
  onClick?: (e) => void;
  link?: string;
}

const Wrapper = styled.div`
  width: 100%;
  /* &.show > div:nth-child(2) {
    max-height: 1000px;
  } */
  & > div:nth-child(2) {
    display: block;

    max-height: ${(props: { isOver: boolean }) => (props.isOver ? "1000px" : "0")};
    overflow: hidden;
    transition: 0.5s;

    & > * {
      display: block;
      padding: 10px 0 10px 50px;
      font-size: 1rem;
    }
  }
`;

const MyLink = styled.a`
  font-size: 1.2rem;
  font-weight: normal;
  width: 100%;
  padding: 10px 0 10px 30px;
  text-align: left;
  background-color: ${(props: { isOver: boolean }) => (props.isOver ? "#eeeeee" : "#fafafa")};
`;

const ChildrenTitle = MyLink.withComponent("div");

export default (props: Props) => {
  const [isOver, setIsOver] = useState(false);

  if (props.children) {
    return (
      <Wrapper onMouseOver={() => setIsOver(true)} onMouseOut={() => setIsOver(false)} isOver={isOver}>
        <ChildrenTitle isOver={isOver}>{props.title}</ChildrenTitle>
        <div>{props.children}</div>
      </Wrapper>
    );
  } else {
    return (
      <Link href={props.link}>
        <MyLink onMouseOver={() => setIsOver(true)} onMouseOut={() => setIsOver(false)} isOver={isOver}>
          {props.title}
        </MyLink>
      </Link>
    );
  }
};
