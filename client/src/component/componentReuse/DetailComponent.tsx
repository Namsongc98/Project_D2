import { Box, Divider, Stack, Typography } from "@mui/material";
import {
  BookingStatus,
  IBookingData,
  StatusPayment,
  typeGetRoom,
} from "../../type";
import { rowsRoom, rowsBooking } from "../../constain";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
function SamplePrevArrow(props: any) {
  const { onClick } = props;
  return (
    <div
      className="bg-[#1976d2] z-10 absolute top-[40%] left-[-30px] p-1 rounded-full flex justify-center items-center"
      onClick={onClick}
    >
      <ArrowBackIosNewIcon fontSize="inherit" sx={{ color: "white" }} />
    </div>
  );
}

function SampleNextArrow(props: any) {
  const { onClick } = props;
  return (
    <div
      className=" bg-[#1976d2] z-10 absolute top-[40%] right-[-30px] p-1 rounded-full flex justify-center items-center"
      onClick={onClick}
    >
      <ArrowForwardIosIcon fontSize="inherit" sx={{ color: "white" }} />
    </div>
  );
}

const DetailComponent = ({
  booking,
  room,
}: {
  booking?: IBookingData | any;
  room?: typeGetRoom;
}) => {
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    speed: 500,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
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
              ? "Đơn đã bị hủy"
              : "Chờ xác nhận"}
          </Typography>
        )}
      </Stack>
      <Divider sx={{ my: 2 }} light />
      <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
        <Box sx={{ width: 1 / 2 }}>
          <div className="relative w-[400px] mx-auto my-0">
            <Slider {...settings} className="">
              {room!.image.map((item) => (
                <div className="" key={item.id}>
                  <img
                    src={item.url + "?fit=crop&auto=format"}
                    alt={room?.city}
                    loading="lazy"
                    className="object-cover h-[268px] w-full"
                  />
                </div>
              ))}
            </Slider>
          </div>
          <Box>
            <Divider sx={{ my: 2 }} light />
            <div className="">
              <h3 className="font-medium mb-2 ">Mô tả: </h3>
              <span>{room?.decription}</span>
            </div>
          </Box>
        </Box>
        <Box sx={{ width: "45%" }}>
          {room &&
            rowsRoom.map((row) => {
              const value = room[row.id];
              return (
                <div key={row.id}>
                  <div className="flex justify-between items-center ">
                    <h3 className="font-medium min-w-[100px]">{row.label} </h3>
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
              return (
                <div key={row.id}>
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium min-w-[100px]">{row.label}</h3>
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
