import { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import InfoIcon from "@mui/icons-material/Info";
import { PropsUser } from "../../type";
import { Avatar, IconButton, Stack } from "@mui/material";

import imgEmpty from "../../assets/image/img_empty.png";

const TableUser = ({ data, onClickNav, columns }: PropsUser) => {
  // page
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);

  // thay đổi trang
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "auto" }}>
      <TableContainer sx={{ height: 400, overflow: "auto" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Email</TableCell>
              {columns?.map((column) => (
                <TableCell
                  key={column.index}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell style={{ minWidth: 70 }} align="center">
                Chi tiết
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((profile) => {
                return (
                  <TableRow
                    hover
                    key={profile.id}
                    onClick={() => onClickNav(profile.id)}
                  >
                    <TableCell key={profile.id}>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar alt={profile?.avatar} src={profile?.avatar} />
                        <div className="">
                          <p className="font-semibold">{profile.email} </p>
                          <p className="text-sm ">
                            {profile.firstName} {profile.lastName}
                          </p>
                        </div>
                      </Stack>
                    </TableCell>
                    {columns?.map((column, index) => {
                      const value = profile[column.index];
                      return (
                        <TableCell key={index}>
                          {column.format && typeof value === "number" ? (
                            column.format(value)
                          ) : column.url && typeof value === "string" ? (
                            <Avatar alt={value} src={value} />
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}

                    <TableCell align="center">
                      <IconButton aria-label="infor" size="small">
                        <InfoIcon color="primary" fontSize="inherit" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        {!data?.length && (
          <Stack
            sx={{ height: "300px" }}
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <div className="">
              <img
                src={imgEmpty}
                width={100}
                height={100}
                alt={imgEmpty}
                className="mx-auto my-0"
              />
              <p className="text-center mt-2">Đơn hàng trống</p>
            </div>
          </Stack>
        )}
      </TableContainer>

      {data && (
        <TablePagination
          rowsPerPageOptions={[4, 6, 8]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
};

export default TableUser;
