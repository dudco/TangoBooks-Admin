import { withLayout } from "../../components/Layout";
import { useEffect, useState } from "react";
import { Paper, Table, TableHead, TableRow, TableCell as OriginCell, TableBody, Button, TextField } from "@material-ui/core";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import koLocale from "date-fns/locale/ko";
import styled from "styled-components";

const TableCell = styled(OriginCell)`
  text-align: center !important;
`;

const ToolWrapper = styled.div`
  & > div {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
  }

  margin-bottom: 20px;
`;

const DepartmentEmployee = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <ToolWrapper>
        <div>
          <TextField label="이름" variant="outlined" style={{ width: "10%" }} />
          <TextField label="주민등록번호" variant="outlined" style={{ width: "15%" }} />
          <TextField label="주소" variant="outlined" style={{ width: "70%" }} />
          <TextField label="휴대전화" variant="outlined" style={{ width: "19%" }} />
          <TextField label="자택전화" variant="outlined" style={{ width: "19%" }} />
          <TextField label="은행명" variant="outlined" style={{ width: "19%" }} />
          <TextField label="계좌번호" variant="outlined" style={{ width: "19%" }} />
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
        <Button variant="contained" style={{ float: "right" }}>
          추가
        </Button>
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
          <TableBody></TableBody>
        </Table>
      </Paper>
    </div>
  );
};

export default withLayout(DepartmentEmployee, { title: "근로자 관리" });
