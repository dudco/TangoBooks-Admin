import { withLayout } from "../components/Layout";
import { useEffect, useState } from "react";
import { NextPageContext } from "next";
import EmployeeService from "../api/services/EmployeeService";
import nextCookies from "next-cookies";
import EmployeeModel from "../api/models/Employee";
import DepartmentModel from "../api/models/Department";
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, TextField } from "@material-ui/core";

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

const Resigner = (props: { employees: EmployeeModel[] }) => {
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">순번</TableCell>
            <TableCell align="center">성명</TableCell>
            <TableCell align="center">주민등록번호</TableCell>
            <TableCell align="center">주소</TableCell>
            <TableCell align="center">휴대폰</TableCell>
            <TableCell align="center">자택</TableCell>
            <TableCell align="center">은행명</TableCell>
            <TableCell align="center">계좌번호</TableCell>
            <TableCell align="center">담당부서</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.employees
            .filter(data => data.isLeave)
            .map((data, idx) => (
              <TableRow>
                <TableCell align="center">{idx + 1}</TableCell>
                <TableCell align="center">{data.name}</TableCell>
                <TableCell align="center">{data.identity_number}</TableCell>
                <TableCell align="center">{data.address}</TableCell>
                <TableCell align="center">{data.phone}</TableCell>
                <TableCell align="center">{data.telephone}</TableCell>
                <TableCell align="center">{data.bank}</TableCell>
                <TableCell align="center">{data.bank}</TableCell>
                <TableCell align="center">{(data.department as DepartmentModel).name}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

Resigner.getInitialProps = async (ctx: NextPageContext) => {
  const { user } = nextCookies(ctx);
  const { token } = JSON.parse(user);
  const { data } = await getEmployees(token);
  return { employees: data };
};

export default withLayout(Resigner, { title: "퇴사자 관리" });
