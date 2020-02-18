import { withLayout } from "../../components/Layout";
import { useEffect, useState } from "react";
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, TextField } from "@material-ui/core";
import moment from "moment";
import styled from "styled-components";
import { NextPageContext } from "next";
import nextCookies from "next-cookies";
import EmployeeService from "../../api/services/EmployeeService";
import EmployeeModel from "../../api/models/Employee";
import DepartmentModel from "../../api/models/Department";
import AdminService from "../../api/services/AdminService";
import AdminModel from "../../api/models/Admin";
import { useFormFiled } from "../../utils/utils";
import NumberFormat from "react-number-format";

const ToolsWrapper = styled.div`
  width: 100%;
  font-size: 20px;

  display: flex;
  & > div {
    margin-right: 20px;
  }
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

const getAdminInfo = async token => {
  try {
    const res = await AdminService.get(token);
    if (res.status === 200) {
      return { data: res.data.data };
    } else {
      return { data: [] };
    }
  } catch (err) {
    console.log(err.message);
  }
};

const getWeekday = (attendances, month) => attendances.filter(attend => +attend.date.slice(4, 6) === month).filter(attend => attend.attend === 0).length;

const AdminSalary = (props: { employees: EmployeeModel[]; adminInfo: AdminModel }) => {
  const defaultTop = [
    // 연번 부서 성명 주민번호 참여일 평일근무 유급휴일	주차유급	월차유급	소계	기본급	유급휴일	주휴수당	월차수당 중식비 계	국민연금	건강보험	고용보험	소득세	주민세  실지급액
    "합계",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ];

  const [month, setMonth] = useState(moment());
  const [defaultValues, onChangeDefaultValues, setDefaultValues] = useFormFiled({
    paidHolyday: 0, // 유급휴일
    weekPaid: 0, // 주차 유급
    monthPaid: 0 // 월차 유급
  });
  const [employeeWorkingDays, setEmployeeWorkingDays] = useState(
    props.employees.map(e => ({
      weekday: getWeekday(e.attendances, month.get("month") + 1),
      paidHolyday: defaultValues.paidHolyday,
      weekPaid: defaultValues.weekPaid,
      monthPaid: defaultValues.monthPaid
    }))
  );

  const getDatas = () =>
    props.employees.reduce<any>(
      (prev, e, idx) => {
        const { charge_per_day: charge, pension, health_insurance, employment_insurance, income_tax, resident_tax, lunch } = props.adminInfo;
        const { weekday, paidHolyday, weekPaid, monthPaid } = employeeWorkingDays[idx];

        const subTitle_wage = (+weekday + +paidHolyday + +weekPaid + +monthPaid) * charge + lunch * weekday; // 소계
        const subTitle_deduction = pension + health_insurance + employment_insurance + income_tax + resident_tax; // 계

        prev.push([
          idx + 1,
          (e.department as DepartmentModel).name,
          e.name,
          e.identity_number,
          moment(e.join).format("YYYY.MM.DD"),
          //
          weekday,
          paidHolyday,
          weekPaid,
          monthPaid,
          //
          subTitle_wage,
          weekday * charge,
          paidHolyday * charge,
          weekPaid * charge,
          monthPaid * charge,
          weekday * props.adminInfo.lunch,
          subTitle_deduction,
          pension,
          health_insurance,
          employment_insurance,
          income_tax,
          resident_tax,
          subTitle_wage - subTitle_deduction
        ]);

        prev[0][9] += subTitle_wage;
        prev[0][10] += weekday * charge;
        prev[0][11] += paidHolyday * charge;
        prev[0][12] += weekPaid * charge;
        prev[0][13] += monthPaid * charge;
        prev[0][14] += weekday * props.adminInfo.lunch;
        prev[0][15] += subTitle_deduction;
        prev[0][16] += pension;
        prev[0][17] += health_insurance;
        prev[0][18] += employment_insurance;
        prev[0][19] += income_tax;
        prev[0][20] += resident_tax;
        prev[0][21] += subTitle_wage - subTitle_deduction;

        return prev;
      },
      [JSON.parse(JSON.stringify(defaultTop))]
    );

  const [datas, setDatas] = useState(getDatas());

  const onClickPrev = () => {
    setMonth(moment(month).add(-1, "month"));
  };

  const onClickNext = () => {
    setMonth(moment(month).add(1, "month"));
  };

  const onChangeWorkingDays = (idx1, idx2) => e => {
    const copy = JSON.parse(JSON.stringify(employeeWorkingDays));

    const getKey = idx => {
      switch (idx) {
        case 5:
          return "weekday";
        case 6:
          return "paidHolyday";
        case 7:
          return "weekPaid";
        case 8:
          return "monthPaid";
      }
    };
    copy[idx1 - 1][getKey(idx2)] = e.target.value;
    setEmployeeWorkingDays(copy);
  };

  // 달이 바뀜
  useEffect(() => {
    const datas = props.employees.map((e, idx) => ({ ...employeeWorkingDays[idx], weekday: getWeekday(e.attendances, month.get("month") + 1) }));
    setEmployeeWorkingDays(datas);
  }, [month]);

  // 기본 정보가 바뀜
  useEffect(() => {
    const datas = props.employees.map((e, idx) => ({
      ...employeeWorkingDays[idx],
      paidHolyday: defaultValues.paidHolyday,
      weekPaid: defaultValues.weekPaid,
      monthPaid: defaultValues.monthPaid
    }));
    setEmployeeWorkingDays(datas);
  }, [...Object.values(defaultValues)]);

  // 근무일이 바뀜
  useEffect(() => {
    const newData = getDatas();
    setDatas(newData);
  }, [...employeeWorkingDays]);

  return (
    <div>
      <ToolsWrapper>
        <div>
          <span onClick={onClickPrev}>◀︎</span>
          <span>{month.get("month") + 1}월</span>
          <span onClick={onClickNext}>▶︎</span>
        </div>
        <div>
          <TextField label="유급휴일" type="number" value={defaultValues.paidHolyday} name="paidHolyday" onChange={onChangeDefaultValues} />
        </div>
        <div>
          <TextField label="주차유급" type="number" value={defaultValues.weekPaid} name="weekPaid" onChange={onChangeDefaultValues} />
        </div>
        <div>
          <TextField label="월차유급" type="number" value={defaultValues.monthPaid} name="monthPaid" onChange={onChangeDefaultValues} />
        </div>
      </ToolsWrapper>
      <Paper style={{ width: "2000px", marginRight: "50px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" rowSpan={2}>
                연번
              </TableCell>
              <TableCell align="center" rowSpan={2}>
                부서
              </TableCell>
              <TableCell align="center" rowSpan={2}>
                성명
              </TableCell>
              <TableCell align="center" rowSpan={2}>
                주민번호
              </TableCell>
              <TableCell align="center" rowSpan={2}>
                참여일
              </TableCell>
              <TableCell align="center" colSpan={4}>
                근무일수
              </TableCell>
              <TableCell align="center" colSpan={5}>
                임금
              </TableCell>
              <TableCell align="center" rowSpan={2}>
                중식비
              </TableCell>
              <TableCell align="center" colSpan={6}>
                공제내역
              </TableCell>
              <TableCell align="center" rowSpan={2}>
                실지급액
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">평일근무</TableCell>
              <TableCell align="center">유급휴일</TableCell>
              <TableCell align="center">주차유급</TableCell>
              <TableCell align="center">월차유급</TableCell>
              <TableCell align="center">소계</TableCell>
              <TableCell align="center">기본급</TableCell>
              <TableCell align="center">유급휴일</TableCell>
              <TableCell align="center">주휴수당</TableCell>
              <TableCell align="center">
                월차수당,
                <br />
                유급휴일
              </TableCell>
              <TableCell align="center">계</TableCell>
              <TableCell align="center">국민연금</TableCell>
              <TableCell align="center">건강보험</TableCell>
              <TableCell align="center">고용보험</TableCell>
              <TableCell align="center">소득세</TableCell>
              <TableCell align="center">주민세</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datas.map((data, idx1) => (
              <TableRow key={idx1}>
                {data.map((d, idx2) => (
                  <TableCell align="center" key={`${idx1}_${idx2}`}>
                    {/* {d} */}
                    {idx1 > 0 && (idx2 === 5 || idx2 === 6 || idx2 === 7 || idx2 === 8) ? (
                      <TextField style={{ width: 30 }} value={d} margin="none" size="small" type="number" onChange={onChangeWorkingDays(idx1, idx2)} />
                    ) : idx2 > 8 ? (
                      <NumberFormat value={d} thousandSeparator={true} displayType="text" />
                    ) : (
                      d
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

AdminSalary.getInitialProps = async (ctx: NextPageContext) => {
  const { user } = nextCookies(ctx);
  const { token } = JSON.parse(user);

  const { data } = await getEmployees(token);
  const adminInfo = await getAdminInfo(token);

  return { employees: data, adminInfo: adminInfo.data };
};

export default withLayout(AdminSalary, { title: "급여 관리" });
