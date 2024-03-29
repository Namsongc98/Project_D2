import {
  Box,
  Container,
  Divider,
  ImageListItem,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { Button, Input, PickDate } from "../../component/element";
import HotelIcon from "@mui/icons-material/Hotel";
import BathtubIcon from "@mui/icons-material/Bathtub";
import GroupIcon from "@mui/icons-material/Group";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { createBooking, getOneRoom } from "../../service";
import {
  BookingStatus,
  IBookingData,
  StatusPayment,
  typeGetRoom,
} from "../../type";
import { ModalComponent } from "../../component/componentReuse";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useGetUser } from "../../hook";
import { LocalizationProvider } from "@mui/x-date-pickers";
import useDate from "../../hook/useDate";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { formatcurrency } from "../../common";
import { useSelector } from "react-redux";
import { getBookingParam } from "../../store/reducer/bookingSlice";
const DetailRoom = () => {
  const [detailRoom, setDetailRoom] = useState<typeGetRoom | undefined>();
  const [gapDate, setGapDate] = useState<number>(0);

  const [total, setTotal] = useState<number>(0);
  const [error, setError] = useState("");
  const [openConfirm, setOpenConfirm] = useState(false);
  const bookingParam = useSelector(getBookingParam);

  const param = useParams();
  const user = useGetUser();
  const inputStartDate = useDate(bookingParam?.checkin);
  const inputEndDate = useDate(bookingParam?.checkout);
  const navigate = useNavigate();
  const getRoom = async () => {
    try {
      if (param.id) {
        const dataRoom = await getOneRoom(+param.id);
        setDetailRoom(dataRoom.data);
      }
    } catch (error) {
      navigate("*");
      throw new Error("Phòng không tồn tại");
    }
  };
  useEffect(() => {
    getRoom();
  }, []);

  const handleOpenConfirm = () => {
    setOpenConfirm(!openConfirm);
  };

  const schema = yup.object({
    phone: yup.string().required("Mời nhập số điện thoại"),
    countPerson: yup.number().typeError("Mời nhập số lượng người"),
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const message: string | undefined =
    errors?.phone?.message || errors?.countPerson?.message;
  useEffect(() => {
    setError(message!);
    return () => {
      setError("");
    };
  }, [message]);
  useEffect(() => {
    const gapTimespamp =
      inputEndDate.timestamp! + 24 * 60 * 60 * 1000 - inputStartDate.timestamp!;

    const gapDate = Math.ceil(gapTimespamp / (1000 * 60 * 60 * 24));

    setGapDate(gapDate);
    if (detailRoom) {
      const total = gapDate * detailRoom.price;
      setTotal(total);
    }
  }, [detailRoom, inputStartDate.timestamp, inputEndDate.timestamp]);

  const onSubmit: SubmitHandler<any> = async (data) => {
    const userName =
      (user?.firstName ? user.firstName : "") +
      " " +
      (user?.lastName ? user.lastName : "");

    if (inputStartDate.timestamp! >= inputEndDate.timestamp!) {
      setError("Ngày trả phòng không hợp lệ");
      return;
    }
    if (data.countPerson > detailRoom!.cout_people) {
      setError("Phòng nhiều nhất chỉ " + detailRoom!.cout_people + "người");
      return;
    }
    setError("");
    const booking: IBookingData = {
      id_touris: detailRoom!.id,
      user_id: user!.id,
      host_id: detailRoom!.host_id,
      name_user: userName,
      phone: data.phone,
      email: user!.email,
      name_room: detailRoom!.name,
      address_room: detailRoom!.address,
      booking_status: BookingStatus.pending,
      start_date: inputStartDate.timestamp!,
      end_date: inputEndDate.timestamp! + 24 * 60 * 60 * 1000,
      count_date: gapDate,
      count_person: data.countPerson,
      price: detailRoom!.price,
      total: total,
      complete_touris: false,
      pay_status: StatusPayment.pending,
    };
    try {
      await createBooking(booking);
      navigate("/user");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Box sx={{ backgroundColor: "#P5f5f5" }}>
      <div className="w-full flex h-[480px]">
        {detailRoom?.image?.map((item) => {
          return (
            <ImageListItem key={item.id} component={"div"}>
              <img
                srcSet={`${item.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
                alt={item.url}
                loading="lazy"
              />
            </ImageListItem>
          );
        })}
      </div>
      <Container maxWidth="lg" sx={{ my: 0, mx: "auto" }}>
        <Stack direction="row" sx={{ my: 5 }} spacing={3}>
          <div className="w-[60%]">
            <Paper className="bg-white p-4 w-full mb-5">
              <div className="flex justify-between items-center">
                <div className="mb-5 p-2">
                  <p className="bg-white  w-full  font-medium text-2xl">
                    {detailRoom?.name}
                  </p>
                  <Rating name="read-only" value={2} readOnly />
                </div>
                <Button
                  type="button"
                  className="py-2 px-4 bg-[#5392f9] rounded text-white font-medium "
                  onClick={handleOpenConfirm}
                >
                  Đặt ngay
                </Button>
              </div>
              <div className="flex justify-between items-center mt-3">
                <div className="text-lg">{detailRoom?.address}</div>
                <div className="">
                  <span className="text-red-500 text-2xl font-semibold">
                    {detailRoom?.price && formatcurrency(detailRoom.price)}
                  </span>
                </div>
              </div>
            </Paper>
            <Paper className="bg-white p-4 w-full mb-5">
              <Typography sx={{ fontSize: 18, fontWeight: "600" }} gutterBottom>
                Mô tả
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {detailRoom?.decription}
              </Typography>
            </Paper>
          </div>
          <Paper className="w-[35%] bg-white p-4 ">
            <Typography sx={{ fontSize: 18, fontWeight: "600" }} gutterBottom>
              Tiện ích
            </Typography>
            <List className="">
              <ListItem
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <ListItemIcon>
                  <HotelIcon />
                </ListItemIcon>
                <ListItemText primary={`Phòng ngủ: ${detailRoom?.bedroom}`} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <BathtubIcon />
                </ListItemIcon>
                <ListItemText primary={`Phòng tắm ${detailRoom?.bathroom}`} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText
                  primary={`Số lượng người tối đa ${detailRoom?.cout_people}`}
                />
              </ListItem>
            </List>
          </Paper>
        </Stack>
      </Container>

      <ModalComponent setOpen={setOpenConfirm} open={openConfirm}>
        <Typography variant="h6" component="h2">
          Bạn đồng ý đặt phòng
        </Typography>
        <Divider light sx={{ my: 2 }} />
        {error && (
          <div className="wapper-danger w-full mb-6 bg-red-100 text-red-500 p-3 rounded-md flex items-center">
            <ErrorOutlineIcon className="mr-3" />
            <span className="text-sm">{error}</span>
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <Input
            type="number"
            title="Số điện thoại"
            label="phone"
            placeholder="Số điện thoại là..."
            className="block py-2 px-3 w-full text-base text-[#475F7B] bg-white rounded border border-solid border-[#DFE3E7] input-register"
            required={true}
            register={register}
            defaultValue={user?.phone}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box
              sx={{
                width: "400px",
                height: "50px",
                display: "flex",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <PickDate label="Nhận phòng " {...inputStartDate} />
              <PickDate label="Trả phòng" {...inputEndDate} />
            </Box>
          </LocalizationProvider>
          <Input
            type="number"
            title="Số lượng người"
            label="countPerson"
            placeholder="Số người là..."
            className="block py-2 px-3 w-full text-base text-[#475F7B] bg-white rounded border border-solid border-[#DFE3E7] input-register"
            required={true}
            register={register}
            defaultValue={bookingParam?.person}
          ></Input>
          <Stack sx={{ mt: 2 }} direction="row" justifyContent="space-between">
            <span className="text-xl ">Số ngày đặt:</span>
            <span className="">{gapDate} Ngày</span>
          </Stack>
          <Stack sx={{ mt: 2 }} direction="row" justifyContent="space-between">
            <span className="text-xl ">Ước tính tiền phải trả</span>
            <span className="">{formatcurrency(total)}</span>
          </Stack>
          <Stack sx={{ mt: 4 }} direction="row" spacing={2}>
            <Button
              type="submit"
              className="text-white bg-[#5A8DEE] rounded px-4 py-2 hover:opacity-80 shadow-[0_2px_4px_0_rgba(90,141,238,0.5)] hover:shadow-[0_4px_12px_0_rgba(90,141,238,0.6)]"
            >
              Đồng ý
            </Button>
            <Button
              type="button"
              className="text-white bg-red-500  rounded px-4 py-2 hover:opacity-80 shadow-[0_2px_4px_0_rgba(90,141,238,0.5)] hover:shadow-[0_4px_12px_0_rgba(90,141,238,0.6)] "
            >
              Không đồng ý
            </Button>
          </Stack>
        </form>
      </ModalComponent>
    </Box>
  );
};

export default DetailRoom;
