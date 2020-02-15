import { withLayout } from "../../../components/Layout";
import { useEffect, useState } from "react";
import { Paper, Table, TableHead, TableRow, TableCell as OriginCell, TableBody, Button, TextField } from "@material-ui/core";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import koLocale from "date-fns/locale/ko";
import styled from "styled-components";
import EmployeeService from "../../../api/services/EmployeeService";
import EmployeeModel from "../../../api/models/Employee";
import Cookies from "js-cookie";
import { useAuth } from "../../../utils/user-context";
import AdminModel from "../../../api/models/Admin";
import { useFormFiled } from "../../../utils/utils";
import nextCookies from "next-cookies";
import AdminService from "../../../api/services/AdminService";
import { NextPageContext } from "next";
import DepartmentModel from "../../../api/models/Department";

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
    console.log(err.message);
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

type DataType = Pick<AdminModel, "charge_per_day" | "lunch" | "pension" | "health_insurance" | "employment_insurance" | "income_tax" | "resident_tax" | "join_date" | "leave_date">;

const AdminEmployee = (props: { adminInfo: AdminModel; employees: EmployeeModel[] }) => {
  const { user } = useAuth();
  const initialAdminInfo = {
    charge_per_day: props.adminInfo.charge_per_day || 0,
    lunch: props.adminInfo.lunch || 0,
    pension: props.adminInfo.pension || 0,
    health_insurance: props.adminInfo.health_insurance || 0,
    employment_insurance: props.adminInfo.employment_insurance || 0,
    income_tax: props.adminInfo.income_tax || 0,
    resident_tax: props.adminInfo.resident_tax || 0,
    join_date: props.adminInfo.join_date || new Date(),
    leave_date: props.adminInfo.leave_date || new Date(),
    ...props.adminInfo
  };

  const [employeeDatas, setEmployeeDatas] = useState<EmployeeModel[]>(props.employees);
  const [adminInfo, onChange, setAdminInfo] = useFormFiled<DataType>(initialAdminInfo);

  const onClickSave = async () => {
    const res = await AdminService.put(user.token, adminInfo);
    if (res.status === 200) {
      setAdminInfo(res.data.data);
      alert("저장되었습니다.");
    }
  };

  return (
    <div>
      <ToolWrapper>
        <div>
          <TextField label="일당관리" variant="outlined" name="charge_per_day" value={adminInfo.charge_per_day} onChange={onChange} />
          <TextField label="중식비관리" variant="outlined" name="lunch" value={adminInfo.lunch} onChange={onChange} />
          <TextField label="국민연금" variant="outlined" name="pension" value={adminInfo.pension} onChange={onChange} />
          <TextField label="건강보험" variant="outlined" name="health_insurance" value={adminInfo.health_insurance} onChange={onChange} />
          <TextField label="고용보험" variant="outlined" name="employment_insurance" value={adminInfo.employment_insurance} onChange={onChange} />
          <TextField label="소득세" variant="outlined" name="income_tax" value={adminInfo.income_tax} onChange={onChange} />
          <TextField label="주민세" variant="outlined" name="resident_tax" value={adminInfo.resident_tax} onChange={onChange} />
        </div>
        <div>
          <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={koLocale}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="yyyy년 MM월 dd일"
                margin="normal"
                id="join_date-picker"
                label="입사일"
                name="join_date"
                value={adminInfo.join_date}
                onChange={(date: Date | null) => {
                  setAdminInfo({
                    ...adminInfo,
                    join_date: date
                  });
                }}
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
                id="leave_date-picker"
                label="퇴사일"
                name="leave_date"
                value={adminInfo.leave_date}
                onChange={(date: Date | null) => {
                  setAdminInfo({
                    ...adminInfo,
                    leave_date: date
                  });
                }}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
                invalidDateMessage="올바른 날짜 형식이 아닙니다."
              />
            </MuiPickersUtilsProvider>
          </div>
          <Button variant="contained" onClick={onClickSave}>
            저장
          </Button>
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
            {employeeDatas
              .filter(data => !data.isLeave)
              .map((data, idx) => (
                <TableRow key={data._id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{data.name}</TableCell>
                  <TableCell>{data.identity_number}</TableCell>
                  <TableCell>{data.address}</TableCell>
                  <TableCell>{data.phone}</TableCell>
                  <TableCell>{data.telephone}</TableCell>
                  <TableCell>{data.bank}</TableCell>
                  <TableCell>{data.bank}</TableCell>
                  <TableCell>{(data.department as DepartmentModel).name}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

AdminEmployee.getInitialProps = async (ctx: NextPageContext) => {
  const { user } = nextCookies(ctx);
  const { token } = JSON.parse(user);
  const employees = await getEmployees(token);
  const adminInfo = await getAdminInfo(token);

  return { employees: employees.data, adminInfo: adminInfo.data };
};

export default withLayout(AdminEmployee, { title: "근로자 관리" });
