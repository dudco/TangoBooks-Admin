import styled from "styled-components";
import { useAuth } from "../utils/user-context";

const Wrapper = styled.div`
  height: 100%;
  height: 60px;
  width: 100%;

  display: flex;
  padding: 5px 15px 5px 15px;
  box-sizing: border-box;

  & > div.space {
    flex: 1;
  }

  & * {
    display: flex;
    align-items: center;
  }

  & > div {
    display: flex;

    & > div > b {
      margin-left: 5px;
    }

    & > button {
      width: 80px;
      height: 30px;
      border: 1px solid #000;
      border-radius: 20px;
      margin-left: 10px;

      cursor: pointer;

      display: flex;
      justify-content: center;
    }
  }
`;

const Header = props => {
  const auth = useAuth();

  return (
    <Wrapper>
      <div className="space" />
      <div>
        <div>{auth.user?.name}님 </div>
        <button onClick={auth.logout}>로그아웃</button>
      </div>
    </Wrapper>
  );
};

export default Header;
