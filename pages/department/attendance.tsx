import { withLayout } from "../../components/Layout";
import { Table, Paper, TableHead, TableRow, TableCell, MenuItem, Select } from "@material-ui/core";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { getWeek, getMonth, startOfWeek, addDays } from "date-fns";
import koLocale from "date-fns/locale/ko";

const ToolsWrapper = styled.div`
  width: 100%;
  text-align: right;
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
const AdminEmployee = () => {
  const [baseDate, setBaseDate] = useState<Date>(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [workDay, setWorkDay] = useState(5);
  // const [month, setMonth] = useState(getMonth(baseDate) + 1);
  // const [week, setWeek] = useState(new Date().getDate());

  const onClickPrev = () => {
    setBaseDate(addDays(baseDate, -7));
  };

  const onClickNext = () => {
    setBaseDate(addDays(baseDate, 7));
  };

  return (
    <div>
      <ToolsWrapper>
        {addDays(baseDate, 6).getMonth() + 1 !== baseDate.getMonth() + 1 &&
          `(${addDays(baseDate, 6).getMonth() + 1}월 ${Math.floor((addDays(baseDate, 6).getDate() + 1) / 7 + 1)}번째 주)`}
        <span onClick={onClickPrev}>◀︎</span>
        <span>
          {baseDate.getMonth() + 1}월 {Math.ceil((baseDate.getDate() + 1) / 7 + 1)}번째 주
        </span>
        <span onClick={onClickNext}>▶︎</span>
      </ToolsWrapper>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell colSpan={2} align="center">
                만근일수:
                <Select style={{ marginLeft: 20 }} value={workDay} onChange={e => setWorkDay(e.target.value as number)}>
                  <MenuItem value={1}>1일</MenuItem>
                  <MenuItem value={2}>2일</MenuItem>
                  <MenuItem value={3}>3일</MenuItem>
                  <MenuItem value={4}>4일</MenuItem>
                  <MenuItem value={5}>5일</MenuItem>
                </Select>
              </TableCell>
              {[0, 1, 2, 3, 4].map(val => {
                const date = addDays(baseDate, val);
                return (
                  <TableCell align="center">
                    {date.getMonth() + 1}/{date.getDate()}
                  </TableCell>
                );
              })}
              {/*               
              <TableCell align="center">
                {addDays(startDate, 1).getMonth() + 1}/{addDays(startDate.getDate() + 1, 1)}
              </TableCell>
              <TableCell align="center">2/5</TableCell>
              <TableCell align="center">2/6</TableCell>
              <TableCell align="center">2/7</TableCell> */}
            </TableRow>
          </TableHead>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: "7%" }} size="small">
                순번
              </TableCell>
              <TableCell style={{ width: "7%" }} align="center">
                성명
              </TableCell>
              <TableCell style={{ width: "15%" }} align="center">
                월
              </TableCell>
              <TableCell style={{ width: "15%" }} align="center">
                화
              </TableCell>
              <TableCell style={{ width: "15%" }} align="center">
                수
              </TableCell>
              <TableCell style={{ width: "15%" }} align="center">
                목
              </TableCell>
              <TableCell style={{ width: "15%" }} align="center">
                금
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </Paper>
    </div>
  );
};

export default withLayout(AdminEmployee, { title: "출근부" });
