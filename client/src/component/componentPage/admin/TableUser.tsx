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
import { IBookingData, PropsUser } from "../../../type";
import { Avatar, IconButton, Menu, MenuItem, Stack } from "@mui/material";
import { columnUser } from "../../../constain";
import { getBookingUser } from "../../../service";
import { convertDateToTimestamp } from "../../../common";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function TableUser({ data }: PropsUser) {
  // error

  const [openInfor, setOpenInfor] = useState(false);
  const [bookingArr, setBookingArr] = useState<IBookingData[]>();
  // page
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState("");

  // open modal chi tiết phòng

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // const handleOpenInfor = async (idProfile: string) => {};

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickMenu = async (
    event: React.MouseEvent<HTMLButtonElement>,
    idProfile: string
  ) => {
    console.log(idProfile)
    setOpen(idProfile);
    setAnchorEl(event.currentTarget);
    try {
      const res = await getBookingUser(idProfile);
      setBookingArr(res.data);
    } catch (error) {
      console.log(error);
    }
    setOpenInfor(!openInfor);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Email</TableCell>
              {columnUser.map((column) => (
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
                  <TableRow hover key={profile.id}>
                    <TableCell key={profile.id}>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar alt={profile?.avatar} src={profile?.avatar} />
                        <div className="">
                          <p className="font-semibold">{profile.email} </p>
                          <p className="text-sm ">
                            {profile.firstName + " " + profile.lastName}
                          </p>
                        </div>
                      </Stack>
                    </TableCell>

                    {columnUser.map((column, index) => {
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
                    <TableCell
                      align="center"
                      onClick={(
                        e: React.MouseEvent<HTMLTableCellElement, MouseEvent>
                      ) => handleClickMenu(e, profile.id)}
                    >
                      <IconButton aria-label="infor" size="small">
                        <InfoIcon color="primary" fontSize="inherit" />
                        <Menu
                          id="basic-menu"
                          open={open === profile.id}
                          onClose={handleClose}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: -100,
                          }}
                          MenuListProps={{
                            "aria-labelledby": "basic-button",
                          }}
                        >
                          {bookingArr && bookingArr.length > 0 ? (
                            bookingArr?.map((booking) => (
                              <MenuItem
                                sx={{ px: "10px", minWidth: "300px" }}
                                key={booking.id}
                                // onClick={() => handleOpenInfor(booking)}
                              >
                                <div className="w-full">
                                  <div className="flex justify-between items-center">
                                    <div className="">
                                      <span>{booking.name_room}</span>
                                      <p className="text-xs opacity-70">
                                        <span className="text-sm">
                                          Từ ngày:{" "}
                                        </span>
                                        {convertDateToTimestamp(
                                          booking.start_date
                                        ) +
                                          " - " +
                                          convertDateToTimestamp(
                                            booking.end_date
                                          )}
                                      </p>
                                    </div>
                                    <MoreVertIcon fontSize="small" />
                                  </div>
                                </div>
                              </MenuItem>
                            ))
                          ) : (
                            <Stack
                              sx={{
                                border: "1px solid #dadae1",
                                borderRadius: "6px",
                                height: "100px",
                                width: "200px",
                                mx: "10px",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <span>Chưa đặt chuyến nào!</span>
                            </Stack>
                          )}
                        </Menu>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      {data && (
        <TablePagination
          rowsPerPageOptions={[2, 4, 8]}
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
}
