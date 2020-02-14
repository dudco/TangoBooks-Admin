import { withLayout } from "../../components/Layout";
import { useEffect, useState } from "react";
import { Paper, Table, TableHead, TableRow, TableCell as OriginCell, TableBody, Button, TextField } from "@material-ui/core";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import koLocale from "date-fns/locale/ko";
import styled from "styled-components";
import EmployeeService from "../../api/services/EmployeeService";
import EmployeeModel from "../../api/models/Employee";
import Cookies from "js-cookie";
import { useAuth } from "../../utils/user-context";
import { AdminModel } from "../../api/models/Admin";
import { useFormFiled } from "../../utils/utils";

const TableCell = styled(OriginCell)`
  text-align: center !important;
`;

const ToolWrapper = styled.div`
  & > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  margin-bottom: 20px;
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

type DataType = Pick<AdminModel, "charge_per_day" | "lunch" | "pension" | "health_insurance" | "employment_insurance" | "income_tax" | "resident_tax" | "join_date" | "leave_date">;

const AdminEmployee = () => {
  const { user } = useAuth();
  const initialData = {
    charge_per_day: 0,
    lunch: 0,
    pension: 0,
    health_insurance: 0,
    employment_insurance: 0,
    income_tax: 0,
    resident_tax: 0,
    join_date: new Date(),
    leave_date: new Date()
  };

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [employeeDatas, setEmployeeDatas] = useState<EmployeeModel[]>([]);
  const [data, onChange, setData] = useFormFiled<DataType>(initialData);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const onClickSave = async () => {
    console.log(data)
  }

  useEffect(() => {
    if (user) {
      getEmployees(user.token).then(({ data }) => {
        console.log(data);
        setEmployeeDatas(data);
      });
    } else {
      getEmployees(JSON.parse(Cookies.get()["user"]).token).then(({ data }) => {
        console.log(data);
        setEmployeeDatas(data);
      });
    }
  }, []);

  useEffect(() => {
    if (user) {
      setData({
        charge_per_day: user.charge_per_day,
        lunch: user.lunch,
        pension: user.pension,
        health_insurance: user.health_insurance,
        employment_insurance: user.employment_insurance,
        income_tax: user.income_tax,
        resident_tax: user.resident_tax,
        join_date: user.join_date,
        leave_date: user.leave_date
      });
    } else {
    }
  }, []);

  return (
    <div>
      <ToolWrapper>
        <div>
          <TextField label="일당관리" variant="outlined" name="charge_per_day" value={data.charge_per_day} onChange={onChange} />
          <TextField label="중식비관리" variant="outlined" name="lunch" value={data.lunch} onChange={onChange} />
          <TextField label="국민연금" variant="outlined" name="pension" value={data.pension} onChange={onChange} />
          <TextField label="건강보험" variant="outlined" name="health_insurance" value={data.health_insurance} onChange={onChange} />
          <TextField label="고용보험" variant="outlined" name="employment_insurance" value={data.employment_insurance} onChange={onChange} />
          <TextField label="소득세" variant="outlined" name="income_tax" value={data.income_tax} onChange={onChange} />
          <TextField label="주민세" variant="outlined" name="resident_tax" value={data.resident_tax} onChange={onChange} />
        </div>
        <div>
          <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={koLocale}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="yyyy년 MM월 dd일"
                margin="normal"
                id="date-picker"
                label="입사일"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
                style={{ marginRight: 20 }}
                invalidDateMessage="올바른 날짜 형식이 아닙니다."
              />
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="yyyy년 MM월 dd일"
                margin="normal"
                id="date-picker"
                label="퇴사일"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
                invalidDateMessage="올바른 날짜 형식이 아닙니다."
              />
            </MuiPickersUtilsProvider>
          </div>
          <Button variant="contained">저장</Button>
        </div>
      </ToolWrapper>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>순번</TableCell>
              <TableCell>성명</TableCell>
              <TableCell>주민등록번호</TableCell>
              <TableCell>주소</TableCell>
              <TableCell>휴대폰</TableCell>
              <TableCell>자택</TableCell>
              <TableCell>은행명</TableCell>
              <TableCell>계좌번호</TableCell>
              <TableCell>담당지부</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employeeDatas.map((data, idx) => (
              <TableRow>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{data.name}</TableCell>
                <TableCell>{data.identity_number}</TableCell>
                <TableCell>{data.address}</TableCell>
                <TableCell>{data.phone}</TableCell>
                <TableCell>{data.telephone}</TableCell>
                <TableCell>{data.bank}</TableCell>
                <TableCell>{data.bank}</TableCell>
                <TableCell>{data.department.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

export default withLayout(AdminEmployee, { title: "근로자 관리" });
