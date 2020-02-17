import { withLayout } from "../../components/Layout";
import styled from "styled-components";
import { useState } from "react";
import moment from "moment";

const ToolsWrapper = styled.div`
  width: 100%;
  font-size: 20px;

  & > span {
    margin-left: 5px;

    &:not(:nth-child(2)) {
      cursor: pointer;
    }
  }
  margin-bottom: 15px;
  margin-right: 15px;
`;

const Holidays = () => {
  const [month, setMonth] = useState(moment().get("month") + 1);
  const onClickPrev = () => {
    setMonth(month - 1);
  };

  const onClickNext = () => {
    setMonth(month + 1);
  };

  return (
    <div>
      <ToolsWrapper>
        <span onClick={onClickPrev}>◀︎</span>
        <span>{month}월</span>
        <span onClick={onClickNext}>▶︎</span>
      </ToolsWrapper>
      <div className="calena">
        <div>
          <div>""</div>
          <div>일</div>
          <div>월</div>
          <div>화</div>
          <div>수</div>
          <div>목</div>
          <div>금</div>
          <div>토</div>
        </div>
      </div>
    </div>
  );
};

export default withLayout(Holidays, { title: "유급 휴일 관리" });
