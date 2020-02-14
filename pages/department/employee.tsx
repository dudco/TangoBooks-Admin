import { withLayout } from "../../components/Layout";
import { useEffect, useState } from "react";
import { Paper, Table, TableHead, TableRow, TableCell as OriginCell, TableBody, Button, TextField } from "@material-ui/core";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import koLocale from "date-fns/locale/ko";
import styled from "styled-components";
import EmployeeService from "../../api/services/EmployeeService";
// import { NextPageContext } from "next";
import Cookies from "js-cookie";
import { useAuth } from "../../utils/user-context";
import EmployeeModel from "../../api/models/Employee";
import { useFormFiled } from "../../utils/utils";
import nextCookies from "next-cookies";
import { NextPageContext } from "next";

const TableCell = styled(OriginCell)`
  text-align: center !important;
`;

const ToolWrapper = styled.div`
  & > div {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;

    .space {
      flex: 1;
    }
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

type DataType = Pick<EmployeeModel, "name" | "phone" | "identity_number" | "address" | "telephone" | "bank" | "account" | "join">;

const DepartmentEmployee = (props: { employees: EmployeeModel[] }) => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [employees, setEmployees] = useState<EmployeeModel[]>(props.employees);
  const initialForm = {
    name: "",
    phone: "",
    identity_number: "",
    address: "",
    telephone: "",
    bank: "",
    account: "",
    join: new Date()
  };
  const [form, onChangeForm, setForm] = useFormFiled<DataType>(initialForm);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setForm({ ...form, join: date });
  };
  const onClickAdd = async () => {
    // console.log(form);
    const res = await EmployeeService.post(user.token, form);
    if (res.status === 200) {
      getEmployees(user.token).then(({ data }) => {
        setEmployees(data);
      });
    }
  };

  const onClickDelete = id => async _ => {
    const res = await EmployeeService.delete(user.token, id);
    if (res.status === 200) {
      getEmployees(user.token).then(({ data }) => {
        setEmployees(data);
      });
    }
  };

  return (
    <div>
      <ToolWrapper>
        <div>
          <TextField label="이름" variant="outlined" style={{ width: "10%" }} value={form.name} name={"name"} onChange={onChangeForm} />
          <TextField label="주민등록번호" variant="outlined" style={{ width: "15%" }} value={form.identity_number} name={"identity_number"} onChange={onChangeForm} />
          <TextField label="주소" variant="outlined" style={{ width: "70%" }} value={form.address} name={"address"} onChange={onChangeForm} />
          <TextField label="휴대전화" variant="outlined" style={{ width: "19%" }} value={form.phone} name={"phone"} onChange={onChangeForm} />
          <TextField label="자택전화" variant="outlined" style={{ width: "19%" }} value={form.telephone} name={"telephone"} onChange={onChangeForm} />
          <TextField label="은행명" variant="outlined" style={{ width: "19%" }} value={form.bank} name={"bank"} onChange={onChangeForm} />
          <TextField label="계좌번호" variant="outlined" style={{ width: "19%" }} value={form.account} name={"account"} onChange={onChangeForm} />
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
              style={{ width: "19%" }}
              invalidDateMessage="올바른 날짜 형식이 아닙니다."
            />
          </MuiPickersUtilsProvider>
        </div>

        <div>
          <div className="space"></div>
          <Button variant="contained" style={{ float: "right" }} onClick={onClickAdd}>
            추가
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
              <TableCell>담당부서</TableCell>
              <TableCell>퇴사</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees
              .filter(data => !data.isLeave)
              .map((data, idx) => (
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
                  <TableCell>
                    <Button variant="contained" onClick={onClickDelete(data._id)}>
                      퇴사
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

DepartmentEmployee.getInitialProps = async (ctx: NextPageContext) => {
  const { user } = nextCookies(ctx);
  const { token } = JSON.parse(user);
  const employees = await getEmployees(token);

  return { employees: employees.data };
};

export default withLayout(DepartmentEmployee, { title: "근로자 관리" });
