import { Box, Divider, ImageList, Stack, Typography } from "@mui/material";
import React from "react";

const rowsDetail1 = [
  { id: "name", label: "Tên khách sạn:" },
  { id: "type_tourism", label: "Tên khách sạn:" },
  { id: "price", label: "Tên khách sạn:" },
  { id: "address", label: "Tên khách sạn:" },
  { id: "bedroom", label: "Tên khách sạn:" },
  { id: "bathroom", label: "Tên khách sạn:" },
];

const DetailComponent = ({data1, data2, rowsDetail1 }) => {
  return (
    <>
      <Stack display={"flex"} direction="row" justifyContent="space-between">
        <Typography variant="h6" component="h2" color="primary">
          Chi tiết phòng
        </Typography>
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
        <Box sx={{ width: "45%", mb: 6 }}>
          <div className="flex justify-between items-center ">
            <h3 className="font-medium">Tên khách sạn: </h3>
            <span>{room?.name}</span>
          </div>
          <Divider sx={{ my: 2 }} light />
          <div className="flex justify-between items-center ">
            <h3 className="font-medium">Loại hình du lịch: </h3>
            <span>{room?.type_tourism}</span>
          </div>
          <Divider sx={{ my: 2 }} light />
          <div className="flex justify-between items-center ">
            <h3 className="font-medium">Giá phòng: </h3>
            <span>{room?.price}</span>
          </div>
          <Divider sx={{ my: 2 }} light />
          <div className="flex justify-between items-center  ">
            <h3 className="font-medium">Địa Chỉ: </h3>
            <span>{room?.address}</span>
          </div>
          <Divider sx={{ my: 2 }} light />
          <div className="flex justify-between items-center  ">
            <h3 className="font-medium">Số lượng phòng ngủ</h3>
            <span>{room?.bedroom}</span>
          </div>
          <Divider sx={{ my: 2 }} light />
          <div className="flex justify-between items-center  ">
            <h3 className="font-medium">Số lượng phòng tắm</h3>
            <span>{room?.bathroom}</span>
          </div>
          <Divider sx={{ my: 2 }} light />
          <div className="flex justify-between items-center  ">
            <h3 className="font-medium">Từ ngày</h3>
            <span>
              {convertDateToTimestamp(booking!.start_date) +
                " - " +
                convertDateToTimestamp(booking!.end_date)}{" "}
            </span>
          </div>
          <Divider sx={{ my: 2 }} light />
          <div className="flex justify-between items-center  ">
            <h3 className="font-medium">Số ngày</h3>
            <span>{booking?.count_date} </span>
          </div>
          <Divider sx={{ my: 2 }} light />
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Thanh toán:</h3>
            <span>{booking?.total} </span>
          </div>
          <Divider sx={{ my: 2 }} light />
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
        </Box>
      </Stack>
    </>
  );
};

export default DetailComponent;
