import { PeopleOutline } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { AdminLayout } from "src/view/layouts";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Grid, MenuItem, Select } from "@mui/material";
import useSWR from "swr";
import { IUser } from "src/core/product/entity";
import { tesloApi } from "src/infra/database/auth/api";

const UsersPage = () => {
  const { data, error } = useSWR<IUser[]>("/api/admin/users");

  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  const onRoleUpdated = async (userId: string, newRole: string) => {
    const previosUsers = users.map((user) => ({ ...user }));

    const updateUsers = users.map((user) => ({
      ...user,
      role: userId === user._id ? newRole : user.role,
    }));

    setUsers(updateUsers);

    try {
      await tesloApi.put("/admin/users", {
        userId,
        role: newRole,
      });
    } catch (error) {
      setUsers(previosUsers);
      console.log(error);
    }
  };

  if (!data && !error) return <>Cargando...</>;

  const columns: GridColDef[] = [
    { field: "email", headerName: "Correo", width: 250 },
    { field: "name", headerName: "Nombre completo", width: 300 },
    {
      field: "role",
      headerName: "Rol",
      width: 300,
      renderCell: ({ row }: GridRenderCellParams) => {
        return (
          <Select
            value={row.role}
            label="Rol"
            sx={{ width: "300px" }}
            onChange={({ target }) => onRoleUpdated(row.id, target.value)}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="client">Client</MenuItem>
            <MenuItem value="super-user">Super user</MenuItem>
            <MenuItem value="SEO">SEO</MenuItem>
          </Select>
        );
      },
    },
  ];

  const rows = users!.map((user) => ({
    id: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
  }));

  return (
    <AdminLayout
      title={"Usuario"}
      subTitle={"Mantenimiento de usuarios"}
      icon={<PeopleOutline />}
    >
      <Grid container className="fadeIn">
        <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default UsersPage;
function userRouter() {
  throw new Error("Function not implemented.");
}
