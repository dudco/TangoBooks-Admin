import { withLayout } from "../../components/Layout";
import { useEffect, useState } from "react";
import { Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";

const AdminSalary = () => {
  return (
    <div>
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
            <TableRow>
              <TableCell align="center">합계</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center">26406660</TableCell>
              <TableCell align="center">18208660</TableCell>
              <TableCell align="center">3900000</TableCell>
              <TableCell align="center">2548000</TableCell>
              <TableCell align="center">0</TableCell>
              <TableCell align="center">1750000</TableCell>
              <TableCell align="center">302960</TableCell>
              <TableCell align="center">0</TableCell>
              <TableCell align="center">11750</TableCell>
              <TableCell align="center">950</TableCell>
              <TableCell align="center">264060</TableCell>
              <TableCell align="center">26200</TableCell>
              <TableCell align="center">26103700</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

export default withLayout(AdminSalary, { title: "급여 관리" });
