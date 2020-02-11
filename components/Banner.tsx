import styled from "styled-components";

interface Props {
  title?: string;
  subTitle?: string;
}

const Wrapper = styled.div`
  display: inline-table;
  width: 100%;
  height: 300px;
  background-image: url("/static/Banner.png");
  color: #fff;

  & > div {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

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
      <div>
        <div>{title}</div>
        <div>{subTitle}</div>
      </div>
    </Wrapper>
  );
};
