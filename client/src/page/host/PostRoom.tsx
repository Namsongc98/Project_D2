import { Typography } from "@mui/material";
import { Input, SelectOption } from "../../component/element";
import { SelectOptionType } from "../../type";
import { useCheckbox, useSelectOption } from "../../hook";
import { PreviewImg } from "../../component/componentReuse";

const PostRoom = () => {
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

  const checkbox = [1, 2, 3];
  const checkboxBathroom = useCheckbox(0);

  const checkboxBedroom = useCheckbox(0);
  const optionsRoom: SelectOptionType[] = [
    ...checkbox.map((type) => ({ label: type, value: type })),
  ];

  return (
    <section className="flex justify-center items-center ">
      <form action="" className="bg-white rounded-xl p-4 mt-7 min-w-[70%] shadow-md">
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Thêm phòng
        </Typography>

        <div className="flex flex-row gap-5 mt-5">
          <div className="w-2/3">

            <PreviewImg />
          </div>
          <div className="w-1/3">
            <Input
              type="text"
              title="Tên khách sạn"
              placeholder="Phập tên khách sạn..."
              className="block py-2 px-3 w-full text-base text-[#475F7B] bg-white rounded border border-solid border-[#DFE3E7] input-register"
              label="name"
            />
            <Input
              type="text"
              title="Địa chỉ"
              placeholder="Địa chỉ khách sạn..."
              className="block py-2 px-3 w-full text-base text-[#475F7B] bg-white rounded border border-solid border-[#DFE3E7] input-register"
              label="address"
            />
            <Input
              type="number"
              title="Giá tiền"
              className="block py-2 px-3 w-full text-base text-[#475F7B] bg-white rounded border border-solid border-[#DFE3E7] input-register"
              label="price"
              placeholder="Phập giá tiền..."
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
              <div className="flex justify-between ">
                <SelectOption
                  options={optionsRoom}
                  label="Phòng ngủ"
                  {...checkboxBathroom}
                />

                <SelectOption
                  options={optionsRoom}
                  label="Phòng tắm"
                  {...checkboxBedroom}
                />
              </div>
            </div>
          </div>

        </div>
      </form>
    </section>
  );
};

export default PostRoom;
