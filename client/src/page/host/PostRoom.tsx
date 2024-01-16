import { Typography } from "@mui/material";
import { Button, Input, SelectOption, TextArea } from "../../component/element";
import { IRoom, SelectOptionType, StatusApi } from "../../type";
import {
  useButton,
  useInputMultiple,
} from "../../hook";
import { PreviewImg, ToastComponent } from "../../component/componentReuse";
import { useEffect, useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import SnackBarReuse from "../../component/componentReuse/SnackBarReuse";

const PostRoom = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>()
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("");

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

  const TypeTouris = ["Căn hộ dịch vụ", "Biệt thự", "Homestay", "khách sạn"];
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
  // const resetButton = useButton();

  const schema = yup.object({
    nameHotel: yup
      .string()
      .required("Nhập tên khác sạn"),
    address: yup
      .string()
      .required("Nhập địa chỉ"),
    price: yup
      .number()
      .required("Nhập giá tiền "),
    city: yup
      .string()
      .required("Nhập tên thành phố "),
    typeTouris: yup
      .string()
      .required("Nhập loại Du lich"),
    bedRoom: yup
      .number()
      .required("Nhập số lượng phòng ngủ"),
    bathRoom: yup
      .number()
      .required("Nhập số lượng phòng tắm"),
    decription: yup
      .string()
      .required("Nhập mô tả phòng"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const message: string | undefined | number =
    errors?.nameHotel?.message ||
    errors?.address?.message ||
    errors?.price?.message ||
    errors?.city?.message ||
    errors?.typeTouris?.message ||
    errors.bedRoom?.message ||
    errors.bathRoom?.message ||
    errors.decription?.message;

  console.log(message)
  const handleClick = () => {
    setOpen(true);
  };
  useEffect(() => {
    setError(message);
    setType("error")
    handleClick()
    return () => {
      setError("");
    };
  }, [message]);

  const onSubmit: SubmitHandler<IRoom> = async (): Promise<void> => {

  }


  // const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  //   resetButton.onClick(e);
  //   inputCity.setValue("");
  //   inputHost.setValue("");
  //   inputPrice.setValue("");
  // };

  return (
    <section className="flex justify-center items-center ">
      {/* <SnackBarReuse message={error} open={open} setOpen={setOpen} type={type} /> */}
      <form
        action=""
        className="bg-white rounded-xl p-4 mt-7 min-w-[70%] shadow-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Thêm phòng
        </Typography>

        <div className="flex flex-row gap-5 mt-5">
          <div className="w-2/3">
            <PreviewImg imageRoom={imageRoom} />
            <div className="w-full flex justify-between mt-4 gap-2 ">
              <div className="w-2/3">
                <TextArea register={register} title="Describe" label="decription" />
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
              label="name"
              register={register}

            />
            <Input
              type="text"
              title="Địa chỉ Thành phố"
              placeholder="Địa chỉ khách sạn..."
              className="block py-2 px-3 w-full text-base text-[#475F7B] bg-white rounded border border-solid border-[#DFE3E7] input-register"
              label="address"
              register={register}

            />
            <Input
              type="number"
              title="Giá tiền"
              className="block py-2 px-3 w-full text-base text-[#475F7B] bg-white rounded border border-solid border-[#DFE3E7] input-register"
              label="price"
              placeholder="Phập giá tiền..."
              register={register}

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
                  className={`text-white ${loading && "opacity-70"
                    } bg-[#5A8DEE] w-full rounded px-6 py-2 hover:opacity-80 shadow-[0_2px_4px_0_rgba(90,141,238,0.5)] hover:shadow-[0_4px_12px_0_rgba(90,141,238,0.6)]`}
                >
                  Lưu
                </Button>
                <Button
                  type="reset"
                  className=" bg-slate-100 w-full rounded px-6 py-2 hover:opacity-80 shadow hover:shadow-md"
                // onClick={(e) => handleClick(e)}
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
