import * as React from "react";
import styled from "styled-components";
import { useAuth } from "../utils/user-context";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
`;

const BG = styled.img`
  width: 100%;
  height: 100%;
`;

const Form = styled.form`
  position: absolute;

  display: flex;
  flex-direction: column;
  align-items: center;

  & > *:not(:last-child) {
    margin-bottom: 20px;
  }

  & > input {
    border: none;
    border-radius: 20px;
    width: 240px;
    height: 38px;
    padding: 0 20px 0 20px;
  }

  & > button {
    width: 170px;
    height: 30px;

    border: 1px solid #2a72ff;
    border-radius: 20px;
    background-color: blue;
    width: 180px;
    height: 38px;
    color: #fff;
    cursor: pointer;
    font-weight: 500;
  }
`;

const Title = styled.div`
  position: absolute;
  top: 50px;
  left: 60px;
  padding-top: 20px;
  color: #fff;
  font-size: 30pt;
  font-weight: 100;

  & > div.line {
    width: 120px;
    height: 3px;
    margin-bottom: 15px;
    background-color: #c1272d;
  }

  & span {
    font-weight: bold;
  }
`;

const Login = () => {
  const [id, setId] = React.useState("");
  const [pw, setPw] = React.useState("");
  const auth = useAuth();

  const onConfirm = async (e: React.FormEvent) => {
    e.preventDefault();

    auth.login(id, pw);
  };

  return (
    <Wrapper>
      <BG src={"/static/Login.jpg"} />
      <Title>
        <div className="line" />
        서울특별시 한강사업본수
        <br />
        공공근로자 급여관리 프로그램
      </Title>
      <Form>
        <input name="id" type="text" value={id} onChange={e => setId(e.target.value)} placeholder="ID" />
        <input name="pw" type="text" value={pw} onChange={e => setPw(e.target.value)} placeholder="PW" />
        <button type="submit" onClick={onConfirm}>
          로그인
        </button>
      </Form>
    </Wrapper>
  );
};

export default Login;
