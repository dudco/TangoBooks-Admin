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
    align-items: center;
    justify-content: space-between;
  }

  margin-bottom: 20px;
`;

const AdminEmployee = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <ToolWrapper>
        <div>
          <TextField label="일당관리" variant="outlined" />
          <TextField label="중식비관리" variant="outlined" />
          <TextField label="국민연금" variant="outlined" />
          <TextField label="건강보험" variant="outlined" />
          <TextField label="고용보험" variant="outlined" />
          <TextField label="소득세" variant="outlined" />
          <TextField label="주민세" variant="outlined" />
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
          <TableBody></TableBody>
        </Table>
      </Paper>
    </div>
  );
};

export default withLayout(AdminEmployee, { title: "근로자 관리" });
