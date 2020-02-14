import { withLayout } from "../../components/Layout";
import { Table, Paper, TableHead, TableRow, TableCell, MenuItem, Select, TableBody } from "@material-ui/core";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { startOfWeek, addDays } from "date-fns";
import EmployeeService from "../../api/services/EmployeeService";
import { useAuth } from "../../utils/user-context";
import EmployeeModel from "../../api/models/Employee";
import moment from "moment";
import { NextPageContext } from "next";
import nextCookies from "next-cookies";

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
              {[0, 1, 2, 3, 4, 5, 6].map(val => {
                const date = addDays(baseDate, val);
                return (
                  <TableCell align="center">
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
                <TableRow>
                  <TableCell align="center" size="small">
                    {idx + 1}
                  </TableCell>
                  <TableCell align="center">{data.name}</TableCell>
                  {[0, 1, 2, 3, 4, 5, 6].map(val => {
                    const date = addDays(baseDate, val);
                    return (
                      <TableCell align="center">
                        <Select value={0} disabled={moment().diff(date, "days") < 0}>
                          <MenuItem value={0}>출근</MenuItem>
                          <MenuItem value={1}>지각</MenuItem>
                          <MenuItem value={2}>조퇴</MenuItem>
                          <MenuItem value={3}>월차</MenuItem>
                          <MenuItem value={4}>결근</MenuItem>
                          <MenuItem value={5}>유급</MenuItem>
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
