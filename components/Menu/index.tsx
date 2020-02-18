import MenuItem from "./MenuItem";
import styled from "styled-components";
import Router from "next/router";
import { useState } from "react";

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 300px;
  box-shadow: 6px 5px 5px 0px rgba(209, 209, 209, 1);
  align-items: center;
  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;

    & > h1 {
      margin-bottom: 3px;
    }

    & > div {
      font-size: 0.9rem;
    }
  }
`;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: absolute;
  top: 20%;
`;

const Top = () => {
  return (
    <div
      onClick={() => {
        Router.push("/?q=r");
      }}
    >
      <h1>Tango Books</h1>
    </div>
  );
};

export const AdminMenu = () => {
  const [show, setShow] = useState("none");
  const onClick = n => e => {
    if (show === n) setShow("none");
    else setShow(n);
  };

  return (
    <Wrapper>
      <Top />
      <MenuWrapper>
        <MenuItem title="구독자">
          <MenuItem link="/?q=t" title="임시회원" />
          <MenuItem link="/?q=r" title="정회원" />
        </MenuItem>
        <MenuItem link="/publisher" title="출판사" />
        <MenuItem link="/status" title="현황">
          <MenuItem link="/status?q=t" title="시간별" />
          <MenuItem link="/status?q=p" title="출판사별" />
        </MenuItem>
        <MenuItem link="/report" title="신고" />
      </MenuWrapper>
    </Wrapper>
  );
};
