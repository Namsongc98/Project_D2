import { Typography } from "@mui/material";
import { Button, Input, SelectOption, TextArea } from "../../component/element";
import { SelectOptionType, StatusApi } from "../../type";
import {
  useButton,
  useInput,
  useInputMultiple,
  useInputTypeNumber,
  useSelectOption,
  useTextArea,
} from "../../hook";
import { PreviewImg, ToastComponent } from "../../component/componentReuse";
import { useEffect, useState } from "react";

const PostRoom = () => {
  const [loading, setLoading] = useState(false);
  const [statusApi, setStatusApi] = useState<StatusApi>({
    type: "",
    message: "",
  });

  // input text
  const inputCity = useInput("");
  const inputHost = useInput("");
  const inputPrice = useInputTypeNumber("");

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
  const selectCity = useSelectOption("");

  const TypeTouris = ["Căn hộ dịch vụ", "Biệt thự", "Homestay", "khách sạn"];
  const optionsTypetouris: SelectOptionType[] = [
    ...TypeTouris.map((type) => ({ label: type, value: type })),
  ];
  const selectTypeTouris = useSelectOption("");

  const coutRoom = [1, 2, 3];
  const optionsRoom: SelectOptionType[] = [
    ...coutRoom.map((type) => ({ label: type, value: type })),
  ];
  const selectBedRoom = useSelectOption("");
  const selectBathRoom = useSelectOption("");

  // input type ảnh
  const imageRoom = useInputMultiple();
  // input textArea
  const textArea = useTextArea("");
  // butom reset
  const resetButton = useButton();

  // submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputHost.value) {
      //setStatusApi({ type: "error", message: "Nhập tên khách sạn!" });
      validate("Nhập tên khách sạn!");
      return;
    } else if (!inputCity.value) {
      validate("Nhập địa chỉ!");
      return;
    } else if (!inputPrice.value) {
      setStatusApi({ type: "error", message: "Nhập giá tiền!" });
      return;
    } else if (!selectCity.value) {
      setStatusApi({ type: "error", message: "Chọn thành phố!" });
      return;
    } else if (!selectTypeTouris.value) {
      setStatusApi({ type: "error", message: "Chọn Loại hình du lịch!" });
      return;
    } else if (!selectBedRoom.value) {
      setStatusApi({ type: "error", message: "Nhập số lượng phòng ngủ!" });
      return;
    } else if (!selectBathRoom.value) {
      setStatusApi({ type: "error", message: "Nhập số lượng phòng tắm!" });
      return;
    } else if (!textArea.value) {
      setStatusApi({ type: "error", message: "Mô tả phòng" });
      return;
    }
  };

  const validate = (message: string) => {
    setStatusApi({ type: "error", message: message });
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    resetButton.onClick(e);
    inputCity.setValue("");
    inputHost.setValue("");
    inputPrice.setValue("");
  };

  return (
    <section className="flex justify-center items-center ">
      {statusApi.message && (
        <ToastComponent status={statusApi} setStatusApi={setStatusApi} />
      )}
      <form
        action=""
        className="bg-white rounded-xl p-4 mt-7 min-w-[70%] shadow-md"
        onSubmit={handleSubmit}
      >
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Thêm phòng
        </Typography>

        <div className="flex flex-row gap-5 mt-5">
          <div className="w-2/3">
            <PreviewImg imageRoom={imageRoom} />
            <div className="w-full flex justify-between mt-4 ">
              <div className="w-2/3">
                <TextArea {...textArea} label="Describe" />
              </div>
              <div className="flex justify-between flex-wrap w-1/3 ">
                <SelectOption
                  options={optionsRoom}
                  label="Phòng ngủ"
                  {...selectBedRoom}
                />

                <SelectOption
                  options={optionsRoom}
                  label="Phòng tắm"
                  {...selectBathRoom}
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
              {...inputHost}
            />
            <Input
              type="text"
              title="Địa chỉ Thành phố"
              placeholder="Địa chỉ khách sạn..."
              className="block py-2 px-3 w-full text-base text-[#475F7B] bg-white rounded border border-solid border-[#DFE3E7] input-register"
              label="address"
              {...inputCity}
            />
            <Input
              type="number"
              title="Giá tiền"
              className="block py-2 px-3 w-full text-base text-[#475F7B] bg-white rounded border border-solid border-[#DFE3E7] input-register"
              label="price"
              placeholder="Phập giá tiền..."
              {...inputPrice}
            />
            <div className="flex flex-col gap-7 mt-5">
              <SelectOption
                label="Tên thành phố"
                options={optionsCity}
                {...selectCity}
              />
              <SelectOption
                label="Loại hình du lịch"
                options={optionsTypetouris}
                {...selectTypeTouris}
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
