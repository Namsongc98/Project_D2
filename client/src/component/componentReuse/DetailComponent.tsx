import {
  Box,
  Divider,
  ImageList,
  ImageListItem,
  Stack,
  Typography,
} from "@mui/material";
import {
  BookingStatus,
  IBookingData,
  StatusPayment,
  typeGetRoom,
} from "../../type";
import { rowsRoom, rowsBooking } from "../../constain";

const DetailComponent = ({
  booking,
  room,
}: {
  booking?: IBookingData;
  room?: typeGetRoom;
}) => {
  return (
    <>
      <Stack display={"flex"} direction="row" justifyContent="space-between">
        <Typography variant="h6" component="h2" color="primary">
          Chi tiết phòng
        </Typography>
        {booking && (
          <Typography
            variant="h6"
            component="h2"
            color={
              booking?.booking_status === BookingStatus.pending
                ? "primary"
                : booking?.booking_status === BookingStatus.success
                ? "#4caf50"
                : booking?.booking_status === BookingStatus.cancel
                ? "error"
                : "error"
            }
          >
            {booking?.booking_status === BookingStatus.pending
              ? "Đợi xác nhận "
              : booking?.booking_status === BookingStatus.success
              ? "Đã được chấp nhận"
              : booking?.booking_status === BookingStatus.cancel
              ? "Đơn đẵ bị hủy"
              : "Đơn đã bị hủy"}
          </Typography>
        )}
      </Stack>
      <Divider sx={{ my: 2 }} light />
      <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
        <Box sx={{ width: 1 / 2 }}>
          <ImageList sx={{ height: "auto" }} cols={2} rowHeight={164}>
            {room!.image.map((item) => (
              <ImageListItem key={item.id}>
                <img src={item.url} alt={room?.city} loading="lazy" />
              </ImageListItem>
            ))}
          </ImageList>

          <Box sx={{}}>
            <Divider sx={{ my: 2 }} light />
            <div className="">
              <h3 className="font-medium mb-2 ">Mô tả: </h3>
              <span>{room?.decription}</span>
            </div>
          </Box>
        </Box>
        <Box sx={{ width: "45%" }}>
          {rowsRoom.map((row) => {
            const value = room[row.id];
            return (
              <div key={row.id}>
                <div className="flex justify-between items-center ">
                  <h3 className="font-medium">{row.label} </h3>
                  <span>
                    {row.format && typeof value === "number"
                      ? row.format(value)
                      : value}
                  </span>
                </div>
                <Divider sx={{ my: 2 }} light />
              </div>
            );
          })}

          {booking &&
            rowsBooking.map((row) => {
              const value = booking[row.id];
              console.log(booking);
              return (
                <div key={row.id}>
                  <div className="flex justify-between items-center ">
                    <h3 className="font-medium">{row.label}</h3>
                    <span>
                      {row.format && typeof value === "number" && value > 1000
                        ? row.format(value)
                        : value}{" "}
                    </span>
                  </div>
                  <Divider sx={{ my: 2 }} light />
                </div>
              );
            })}
          {booking && (
            <div className="flex justify-between items-center  ">
              <h3 className="font-medium">Trạng thái thanh toán:</h3>
              <span>
                {booking?.pay_status === StatusPayment.pending
                  ? "Chưa thanh toán"
                  : booking?.pay_status === StatusPayment.success
                  ? "đã thanh toán"
                  : ""}{" "}
              </span>
            </div>
          )}
        </Box>
      </Stack>
    </>
  );
};

export default DetailComponent;
