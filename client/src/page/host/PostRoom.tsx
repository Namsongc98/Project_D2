import { Button, Input, SelectOption, TextArea } from "../../component/element";
import {
  Approve,
  BookingStatus,
  IRoomPost,
  ImageFiles,
  SelectOptionType,
} from "../../type";
import { useButton, useGetUser, useInputMultiple } from "../../hook";
import { AlertComponent, PreviewImg } from "../../component/componentReuse";
import { useEffect, useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import SnackBarReuse from "../../component/componentReuse/SnackBarReuse";
import { createRoom, upfileClodinary } from "../../service";
import { Title } from "../../component/componentPage";
import { AlertColor, Stack } from "@mui/material";

const PostRoom = () => {
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<AlertColor | undefined>(undefined);
  const [error, setError] = useState("");
  const [typeAlert, setTypeAlert] = useState<AlertColor | undefined>(undefined);
  const [errorAlert, setErrorAlert] = useState("");
  const user = useGetUser();
  //  SelectOption
  const City = [
    "Hà Nội",
    "Ninh Bình",
    "Lào Cai",
    "Quảng Ninh",
    "Hồ Chí Minh",
    "Đà Nẵng",
  ];
  const optionsCity: SelectOptionType[] = [
    ...City.map((city) => ({ label: city, value: city })),
  ];

  const TypeTouris = ["Căn hộ dịch vụ", "Biệt thự", "Homestay", "Khách sạn"];
  const optionsTypetouris: SelectOptionType[] = [
    ...TypeTouris.map((type) => ({ label: type, value: type })),
  ];

  const coutRoom = [1, 2, 3];
  const optionsRoom: SelectOptionType[] = [
    ...coutRoom.map((type) => ({ label: type, value: type })),
  ];
  // input type ảnh
  const imageRoom = useInputMultiple();
  // butom reset
  const resetButton = useButton();

  const schema = yup.object({
    address: yup.string().required("Nhập địa chỉ"),
    nameHotel: yup.string().required("Nhập tên khách sạn"),
    price: yup.number().typeError("Nhập giá tiền "),
    coutPeople: yup.number().typeError("Nhập số lượng người "),
    city: yup.string().required("Nhập tên thành phố "),
    typeTouris: yup.string().required("Nhập loại Du lich"),
    bedRoom: yup.number().typeError("Nhập số lượng phòng ngủ"),
    bathRoom: yup.number().typeError("Nhập số lượng phòng tắm"),
    decription: yup.string().required("Nhập mô tả phòng"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const message: string | undefined =
    errors.nameHotel?.message ||
    errors.address?.message ||
    errors.price?.message ||
    errors.coutPeople?.message ||
    errors.city?.message ||
    errors.typeTouris?.message ||
    errors.bedRoom?.message ||
    errors.bathRoom?.message ||
    errors.decription?.message;

  useEffect(() => {
    if (message) {
      setTypeAlert("info");
      setErrorAlert(message);
    } else {
      setTypeAlert("info");
      setErrorAlert("");
    }
  }, [message]);

  const onSubmit: SubmitHandler<any> = async (data): Promise<void> => {
    setLoading(true);
    if (!imageRoom.arrImgView.length) {
      setType("error");
      setError("Bạn chưa chọn ảnh!");
      setLoading(false);
      return;
    }
    const uploadcClodinary = imageRoom.arrImgView.map((file: ImageFiles) =>
      upfileClodinary(file.file)
    );
    try {
      const uploadUrl = await Promise.all(uploadcClodinary);
      const dataImg = [
        ...uploadUrl.map((item, index) => ({ id: ++index, url: item })),
      ];

      const room: IRoomPost = {
        host_id: user!.id,
        created_at: Date.now(),
        booking_status: BookingStatus.empty,
        name: data.nameHotel,
        address: data.address,
        price: data.price,
        cout_people: data.coutPeople,
        city: data.city,
        type_tourism: data.typeTouris,
        bedroom: data.bedRoom,
        bathroom: data.bathRoom,
        start_date: Date.now(),
        end_date: Date.now(),
        decription: data.decription,
        image: dataImg,
        approve_room: Approve.pending,
      };

      await createRoom(room);
      setType("success");
      setError("Tạo phòng thành công");
      setErrorAlert("");
    } catch (error) {
      setType("error");
      setError("Tạo phòng thất bại");
      setLoading(false);
    } finally {
      setLoading(false);
      setErrorAlert("");
    }
  };
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    resetButton.onClick(e);
    imageRoom.arrImgView.forEach((image: any) => URL.revokeObjectURL(image));
    imageRoom.setArrImgView([]);
    reset({
      address: "",
      nameHotel: "",
      price: 0,
      decription: "",
    });
  };

  return (
    <section className="flex justify-center items-center relative">
      <SnackBarReuse message={error} type={type} setError={setError} />
      <form
        action=""
        className="bg-white rounded-xl p-4 mt-7 min-w-[70%] shadow-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack direction="row" justifyContent="space-between">
          <Title>Thêm phòng</Title>
          <div className="w-1/3">
            <AlertComponent
              error={errorAlert}
              type={typeAlert}
              setError={setErrorAlert}
            />
          </div>
        </Stack>
        <div className="flex flex-row gap-5 mt-5">
          <div className="w-2/3">
            <PreviewImg imageRoom={imageRoom} />
            <div className="w-full flex justify-between mt-4 gap-2 ">
              <div className="w-2/3">
                <TextArea
                  register={register}
                  title="Describe"
                  label="decription"
                  required={true}
                />
              </div>
              <div className="flex justify-between flex-wrap w-1/3 ">
                <SelectOption
                  options={optionsRoom}
                  label="Phòng ngủ"
                  field="bedRoom"
                  register={register}
                  defaultValue={1}
                />
                <SelectOption
                  options={optionsRoom}
                  label="Phòng tắm"
                  field="bathRoom"
                  register={register}
                  defaultValue={1}
                />
              </div>
            </div>
          </div>
          <div className="w-1/3">
            <Input
              type="text"
              title="Tên khách sạn"
              placeholder="Phập tên khách sạn..."
              className="block py-2 px-3 w-full text-base text-[#475F7B] bg-white rounded border border-solid border-[#DFE3E7] input-register"
              label="nameHotel"
              register={register}
              required={true}
            />
            <Input
              type="text"
              title="Địa chỉ Thành phố"
              placeholder="Địa chỉ khách sạn..."
              className="block py-2 px-3 w-full text-base text-[#475F7B] bg-white rounded border border-solid border-[#DFE3E7] input-register"
              label="address"
              register={register}
              required={true}
            />
            <Input
              type="number"
              title="Giá tiền"
              className="block py-2 px-3 w-full text-base text-[#475F7B] bg-white rounded border border-solid border-[#DFE3E7] input-register"
              label="price"
              placeholder="Phập giá tiền..."
              register={register}
              required={true}
              defaultValue={0}
            />
            <Input
              type="number"
              title="Số người có thể ở"
              className="block py-2 px-3 w-full text-base text-[#475F7B] bg-white rounded border border-solid border-[#DFE3E7] input-register"
              label="coutPeople"
              placeholder="Phập số người..."
              register={register}
              required={true}
              defaultValue={1}
            />
            <div className="flex flex-col gap-7 mt-5">
              <SelectOption
                label="Tên thành phố"
                options={optionsCity}
                register={register}
                field="city"
                defaultValue="Hà Nội"
              />
              <SelectOption
                label="Loại hình du lịch"
                options={optionsTypetouris}
                register={register}
                field="typeTouris"
                defaultValue="Homestay"
              />
              <div className="flex  gap-5">
                <Button
                  type="submit"
                  disabled={loading}
                  className={`text-white ${
                    loading && "opacity-70"
                  } bg-[#5A8DEE] w-full rounded px-6 py-2 hover:opacity-80 shadow-[0_2px_4px_0_rgba(90,141,238,0.5)] hover:shadow-[0_4px_12px_0_rgba(90,141,238,0.6)]`}
                >
                  Lưu
                </Button>
                <Button
                  type="reset"
                  className=" bg-slate-100 w-full rounded px-6 py-2 hover:opacity-80 shadow hover:shadow-md"
                  onClick={(e) => handleClick(e)}
                >
                  Xóa
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default PostRoom;
