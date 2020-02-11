import { withLayout } from "../../components/Layout";
import { useEffect, useState } from "react";
import { Paper, Table, TableHead, TableRow, TableCell as OriginCell, TableBody, Button, TextField } from "@material-ui/core";
import styled from "styled-components";

const TableCell = styled(OriginCell)`
  text-align: center !important;
`;

const ToolWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  padding: 0 20px;
  margin-bottom: 20px;
`;

const AdminDepartment = () => {
  return (
    <div>
      <ToolWrapper>
        <TextField label="부서명" variant="outlined" />
        <TextField label="부서 ID" variant="outlined" />
        <TextField label="부서 PW" variant="outlined" />
        <TextField label="연락처" variant="outlined" />
        <Button variant="contained">추가</Button>
      </ToolWrapper>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>부서명</TableCell>
              <TableCell>부서 ID</TableCell>
              <TableCell>부서 PW</TableCell>
              <TableCell>연락처</TableCell>
              <TableCell>삭제</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>망원지구</TableCell>
              <TableCell>mangwon</TableCell>
              <TableCell>akddnjs114</TableCell>
              <TableCell>010-1234-1234</TableCell>
              <TableCell>
                <Button variant="contained">삭제</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

export default withLayout(AdminDepartment, { title: "부서 관리" });
