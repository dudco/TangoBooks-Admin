import { withLayout } from "../../components/Layout";
import { Table, Paper, TableHead, TableRow, TableCell, MenuItem, Select, TableBody, Button } from "@material-ui/core";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { startOfWeek, addDays, getDay } from "date-fns";
import EmployeeService from "../../api/services/EmployeeService";
import { useAuth } from "../../utils/user-context";
import EmployeeModel from "../../api/models/Employee";
import moment from "moment";
import { NextPageContext } from "next";
import nextCookies from "next-cookies";
import Attendance from "../../api/services/Attendance";

const ToolsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  font-size: 20px;

  & > div > span {
    margin-left: 5px;

    &:not(:nth-child(2)) {
      cursor: pointer;
    }
  }
  margin-bottom: 15px;
  margin-right: 15px;
`;

const getEmployees = async token => {
  try {
    const res = await EmployeeService.get(token);
    if (res.status === 200) {
      return { data: res.data.data };
    } else {
      return { data: [] };
    }
  } catch (err) {
    console.log(err);
  }
};

const DepartmentAttendance = (props: { employees: EmployeeModel[] }) => {
  const { user } = useAuth();

  const [baseDate, setBaseDate] = useState<Date>(startOfWeek(new Date(), { weekStartsOn: 0 }));
  const [workDay, setWorkDay] = useState(5);
  const [datas, setDatas] = useState<EmployeeModel[]>(props.employees);

  const onClickPrev = () => {
    setBaseDate(addDays(baseDate, -7));
  };

  const onClickNext = () => {
    setBaseDate(addDays(baseDate, 7));
  };

  const onChangeSelect = (id, date) => e => {
    const copyData = JSON.parse(JSON.stringify(datas)) as EmployeeModel[];
    const idx = copyData.findIndex(data => data._id === id);
    if (idx < 0) {
      return;
    }
    const dateIdx = copyData[idx].attendances.findIndex(attendance => attendance.date === date);
    if (dateIdx < 0) {
      return;
    }
    copyData[idx].attendances[dateIdx].attend = e.target.value;
    setDatas(copyData);
  };

  const onClickSave = async () => {
    console.log(datas);

    const res = await Attendance.put(user.token, { employees: datas });
    if (res.status === 200) {
      const { data } = await getEmployees(user.token);
      setDatas(data);
    }
  };

  return (
    <div>
      <ToolsWrapper>
        <div>
          <Button variant="contained" onClick={onClickSave}>
            저장
          </Button>
        </div>
        <div>
          {addDays(baseDate, 6).getMonth() + 1 !== baseDate.getMonth() + 1 &&
            `(${addDays(baseDate, 6).getMonth() + 1}월 ${Math.floor((addDays(baseDate, 6).getDate() + 1) / 7 + 1)}번째 주)`}
          <span onClick={onClickPrev}>◀︎</span>
          <span>
            {baseDate.getMonth() + 1}월 {Math.ceil((baseDate.getDate() + 1) / 7 + 1)}번째 주
          </span>
          <span onClick={onClickNext}>▶︎</span>
        </div>
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
              {[0, 1, 2, 3, 4, 5, 6].map(val => {
                const date = addDays(baseDate, val);
                return (
                  <TableCell align="center" key={date.getTime()}>
                    {date.getMonth() + 1}/{date.getDate()}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: "6%" }} align="center" size="small">
                순번
              </TableCell>
              <TableCell style={{ width: "10%" }} align="center">
                성명
              </TableCell>
              <TableCell style={{ width: "12%", color: "red" }} align="center">
                일
              </TableCell>
              <TableCell style={{ width: "12%" }} align="center">
                월
              </TableCell>
              <TableCell style={{ width: "12%" }} align="center">
                화
              </TableCell>
              <TableCell style={{ width: "12%" }} align="center">
                수
              </TableCell>
              <TableCell style={{ width: "12%" }} align="center">
                목
              </TableCell>
              <TableCell style={{ width: "12%" }} align="center">
                금
              </TableCell>
              <TableCell style={{ width: "12%", color: "blue" }} align="center">
                토
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datas
              .filter(data => !data.isLeave)
              .map((data, idx) => (
                <TableRow key={data._id}>
                  <TableCell align="center" size="small">
                    {idx + 1}
                  </TableCell>
                  <TableCell align="center">{data.name}</TableCell>
                  {[0, 1, 2, 3, 4, 5, 6].map(val => {
                    const date = addDays(baseDate, val);
                    const idx = data.attendances.findIndex(attend => attend.date === moment(date).format("YYYYMMDD"));
                    let value = 0;

                    if (idx >= 0) {
                      value = data.attendances[idx].attend;
                    } else if (getDay(date) === 0 || getDay(date) === 6) {
                      value = 6;
                    }

                    return (
                      <TableCell align="center" key={date.getTime()}>
                        <Select
                          value={value}
                          disabled={moment().diff(date, "days") < 0 || moment(data.join).diff(date, "days") > 0}
                          onChange={onChangeSelect(data._id, moment(date).format("YYYYMMDD"))}
                        >
                          <MenuItem value={0}>출근</MenuItem>
                          <MenuItem value={1}>지각</MenuItem>
                          <MenuItem value={2}>조퇴</MenuItem>
                          <MenuItem value={3}>월차</MenuItem>
                          <MenuItem value={4}>결근</MenuItem>
                          <MenuItem value={5}>유급</MenuItem>
                          <MenuItem value={6}>휴일</MenuItem>
                        </Select>
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

DepartmentAttendance.getInitialProps = async (ctx: NextPageContext) => {
  const { user } = nextCookies(ctx);
  const { token } = JSON.parse(user);

  const { data } = await getEmployees(token);
  return { employees: data };
};

export default withLayout(DepartmentAttendance, { title: "출근부" });
