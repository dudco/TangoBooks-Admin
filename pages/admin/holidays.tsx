import { withLayout } from "../../components/Layout";
import styled from "styled-components";
import { useState } from "react";
import moment from "moment";
import { startOfWeek } from "date-fns";
import * as dateFns from "date-fns";

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

const Calendar = styled.div`
  width: 55%;
  & > div:nth-child(1) {
    display: flex;

    & > div {
      flex: 1;
      padding-bottom: 2%;
      margin-right: 5px;
      margin-bottom: 5px;
      position: relative;
      align-items: center;

      text-align: center;

      &:nth-child(7n) {
        margin-right: 0;
      }
    }
  }

  .row {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
  }

  .body .row {
    border-bottom: 1px solid var(--border-color);
    display: flex;
    & > div {
      flex: 1;
      padding-bottom: 12%;
      margin-right: 5px;
      margin-bottom: 5px;
      position: relative;
      &:nth-child(7n) {
        margin-right: 0;
      }
    }
    & > div > span {
      flex: 1;
      width: 100%;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      position: absolute;
      padding: 4px 11px;
      background-color: #eee;
      box-sizing: border-box;
      color: #777777;
      font-weight: bold;
      font-family: "Noto Sans KR";
      font-size: 1rem;
      cursor: pointer;

      &:hover {
        outline: 5px auto -webkit-focus-ring-color;
      }
    }
    & > div.diff > span {
      color: #b6b6b6;
    }
    & > div.sun > span {
      background-color: #ffc4c4;
    }
    & > div.sat > span {
      background-color: #e1e9ff;
    }
    & > div > div {
      width: 60%;
      padding-bottom: 60%;
      height: 0;
      position: absolute;
      right: 10%;
      bottom: 10%;
      & > img {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
      }
    }
  }
`;

const Holidays = () => {
  const [currentMonth, setCurrentMonth] = useState(moment().toDate());

  const onClickPrev = () => {
    setCurrentMonth(
      moment(currentMonth)
        .subtract(1, "month")
        .toDate()
    );
  };

  const onClickNext = () => {
    setCurrentMonth(
      moment(currentMonth)
        .add(1, "month")
        .toDate()
    );
  };

  const onClickDay = day => () => {
    // alert()
    if (confirm(`${moment(day).format("YYYY년 MM월 DD일")}을(를) 유급휴일로 지정하시겠습니까?`)) {
      console.log(day);
    }
  };

  function renderCells() {
    // const { currentMonth, selectedDate } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows: React.ReactElement[] = [];

    let days: React.ReactElement[] = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        // const cloneDay = day;
        days.push(
          <div
            className={`${day.getMonth() !== monthStart.getMonth() ? "diff" : ""} ${dateFns.format(day, "E") === "Sun" ? "sun" : ""} ${
              dateFns.format(day, "E") === "Sat" ? "sat" : ""
            }`}
            // className={`col cell ${!dateFns.isSameMonth(day, monthStart) ? "disabled" : dateFns.isSameDay(day, selectedDate) ? "selected" : ""}`}
            // key={day}
            // onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
          >
            <span className="number" onClick={onClickDay(day)}>
              {formattedDate}
            </span>
          </div>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(<div className="row">{days}</div>);
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  return (
    <div>
      <ToolsWrapper>
        <span onClick={onClickPrev}>◀︎</span>
        <span>{currentMonth.getMonth() + 1}월</span>
        <span onClick={onClickNext}>▶︎</span>
      </ToolsWrapper>
      <Calendar className="calendar">
        <div className="head">
          <div>일</div>
          <div>월</div>
          <div>화</div>
          <div>수</div>
          <div>목</div>
          <div>금</div>
          <div>토</div>
        </div>
        {renderCells()}
      </Calendar>
    </div>
  );
};

export default withLayout(Holidays, { title: "유급 휴일 관리" });
