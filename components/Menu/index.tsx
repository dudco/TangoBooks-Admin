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

const Top = () => (
  <div
    onClick={() => {
      Router.push("/");
    }}
  >
    <h1>한강사업본부</h1>
  </div>
);

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
        <MenuItem link="/admin/department" title="부서 관리" />
        <MenuItem link="/admin/employee" title="근로자 관리" />
        <MenuItem link="/admin/resigner" title="퇴사자 관리" />
      </MenuWrapper>
    </Wrapper>
  );
};

export const DepartmentMenu = () => {
  const [show, setShow] = useState("none");
  const onClick = n => e => {
    if (show === n) setShow("none");
    else setShow(n);
  };

  return (
    <Wrapper>
      <Top />
      <MenuWrapper>
        <MenuItem link="/department/employee" title="부서 관리" />
        <MenuItem link="/department/attendance" title="출근부" />
        <MenuItem link="/department/pay" title="급여명세서" />
        <MenuItem link="/department/resigner" title="급여명세서" />
      </MenuWrapper>
    </Wrapper>
  );
};
