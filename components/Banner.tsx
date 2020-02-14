import styled from "styled-components";

interface Props {
  title?: string;
  subTitle?: string;
}

const Wrapper = styled.div`
  display: inline-table;
  width: 100%;
  height: 300px;
  position: relative;

  & > .cover {
    content: "";
    width: 100%;
    height: 100%;

    background-color: #000;
    opacity: 0.3;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
  }

  & > .bg {
    background-image: url("/static/Login.jpg");
    color: #fff;
    width: 100%;
    height: 100%;

    background-position: center;
    background-position-y: -400px;
    background-size: cover;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }

  & > .banner {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;

    & > div:nth-child(1) {
      display: flex;
      justify-content: center;
      align-items: center;
      border: 2px solid #fff;
      width: 30%;
      height: 30%;
      font-size: 2rem;
      font-weight: bold;
    }

    & > div:nth-child(2) {
      font-size: 1rem;
      margin-top: 20px;
    }
  }
`;

export default ({ title = "메인", subTitle = "어서오세요 선인고등학교 입니다." }: Props) => {
  return (
    <Wrapper>
      <div className="banner">
        <div>{title}</div>
        <div>{subTitle}</div>
      </div>

      <div className="cover"></div>
      <div className="bg"></div>
    </Wrapper>
  );
};
