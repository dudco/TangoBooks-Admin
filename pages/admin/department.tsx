import { withLayout } from "../../components/Layout";
import { useEffect, useState } from "react";
import { Paper, Table, TableHead, TableRow, TableCell as OriginCell, TableBody, Button, TextField } from "@material-ui/core";
import styled from "styled-components";
import { useFormFiled } from "../../utils/utils";
import DepartmentModel from "../../api/models/Department";
import DepartmentService from "../../api/services/DepartmentService";

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

type DataType = Pick<DepartmentModel, "name" | "phone" | "user_id" | "user_pw">;

const getDepartments = async () => {
  try {
    const res = await DepartmentService.get();
    if (res.status === 200) {
      return { data: res.data.data };
    } else {
      return { data: [] };
    }
  } catch (err) {
    console.log(err);
  }
};

const AdminDepartment = props => {
  const initialData = {
    name: "",
    phone: "",
    user_id: "",
    user_pw: ""
  };
  const [data, onChangeData, setData] = useFormFiled<DataType>(initialData);

  const [departments, setDepartments] = useState<DepartmentModel[]>(props.data || []);

  const onClickAdd = async () => {
    const res = await DepartmentService.post(data);
    if (res.status === 200) {
      setData(initialData);
      setDepartments((await getDepartments()).data);
    }
  };
  return (
    <div>
      <ToolWrapper>
        <TextField value={data.name} label="부서명" variant="outlined" name="name" onChange={onChangeData} />
        <TextField value={data.user_id} label="부서 ID" variant="outlined" name="user_id" onChange={onChangeData} />
        <TextField value={data.user_pw} label="부서 PW" variant="outlined" name="user_pw" onChange={onChangeData} />
        <TextField value={data.phone} label="연락처" variant="outlined" name="phone" onChange={onChangeData} />
        <Button variant="contained" onClick={onClickAdd}>
          추가
        </Button>
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
            {departments.map(department => (
              <TableRow key={department._id}>
                <TableCell>{department.name}</TableCell>
                <TableCell>{department.user_id}</TableCell>
                <TableCell>{department.user_pw}</TableCell>
                <TableCell>{department.phone}</TableCell>
                <TableCell>
                  <Button variant="contained">삭제</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

AdminDepartment.getInitialProps = async () => {
  return await getDepartments();
};

export default withLayout(AdminDepartment, { title: "부서 관리" });
