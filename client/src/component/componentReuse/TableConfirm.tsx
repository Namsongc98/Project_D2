import {
  IconButton,
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

const TableConfirm = ({
  columnsTable,
  data,
  handleOpenApprove,
  handleOpenInfor,
}: any) => {
  return (
    <>
      <TableContainer sx={{ maxHeight: 440 }}>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length &&
              data?.map((item: any) => {
                return (
                  <TableRow hover key={item.id}>
                    {columnsTable.map((column: any) => {
                      const value = item[column.id];
                      return <TableCell key={column.id}>{value}</TableCell>;
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
                        onClick={() => handleOpenApprove(item)}
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
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TableConfirm;
