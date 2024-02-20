import {
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { Button } from "../element";
import { Approve } from "../../type";
import imgEmpty from "../../assets/image/img_empty.png";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";


const TableConfirm = ({
  columnsTable,
  data,
  handleOpenApprove,
  handleOpenInfor,
  handleNavigate,
}: any) => {
  return (
    <>
      <TableContainer
        sx={{ maxHeight: 440, minHeight: "400px", overflow: "auto" }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columnsTable.map((column: any) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell style={{ minWidth: 70 }} align="center">
                Duyệt
              </TableCell>
              <TableCell style={{ minWidth: 70 }} align="center">
                Chi tiết
              </TableCell>
              <TableCell style={{ minWidth: 70 }} align="center">
                Đặt phòng
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length ? (
              data?.map((item: any) => {
                return (
                  <TableRow hover key={item.id}>
                    {columnsTable.map((column: any) => {
                      const value = item[column.id];
                      return (
                        <TableCell key={column.id}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                    <TableCell align="center">
                      <Button
                        className={`px-2 py-1 rounded-md ${
                          item.approve_room === Approve.pending
                            ? "bg-[#5A8DEE]"
                            : item.approve_room === Approve.fail
                            ? "bg-red-500"
                            : "bg-green-500"
                        } text-white`}
                        type="button"
                        onClick={
                          handleOpenApprove && (() => handleOpenApprove(item))
                        }
                      >
                        {item.approve_room === "Pending"
                          ? "Đang chờ"
                          : item.approve_room === "Success"
                          ? "Hoạt động"
                          : "Không cho phép"}
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        aria-label="infor"
                        size="small"
                        onClick={() => handleOpenInfor(item)}
                      >
                        <InfoIcon color="primary" fontSize="inherit" />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={() => handleNavigate(item.id)}
                        aria-label="infor"
                        size="small"
                      >
                        <CalendarMonthIcon color="primary" fontSize="inherit" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <></>
            )}
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
    </>
  );
};

export default TableConfirm;
