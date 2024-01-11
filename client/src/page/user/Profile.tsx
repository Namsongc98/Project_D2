import { useEffect, useState } from "react";
import Input from "../../component/element/Input";
import "../../style/styleComponent.scss";
import imgUpload from "../../assets/image/upanh.png";
import Button from "../../component/element/Button";
import { NavLink } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import imgUser from "../../assets/image/userImg.png";
import {
  useGetUser,
  useInput,
  useInputTypeFileImg,
  useInputTypeNumber,
} from "../../hook";
import InputFileUpload from "../../component/element/InputFileUpload";
import { SelectOption } from "../../component/element/SelectOption";
import useSelectOption from "../../hook/useSelectOption";
import { SelectOptionType, StatusApi } from "../../type";
import { postProfile, upfileClodinary } from "../../service";
import Toast from "../../common/Toast";
import Changepassword from "../../component/componentPage/Changepassword";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const [loading, setLoading] = useState(false);

  const user = useGetUser();

  const [statusApi, setStatusApi] = useState<StatusApi>({
    type: "",
    message: "",
  });

  const genders = ["Nam", "Nữ"];
  const options: SelectOptionType[] = [
    ...genders.map((gender) => ({ label: gender, value: gender })),
  ];
  const selectGender = useSelectOption(user?.gender || "");
  const inputFirstName = useInput(user?.firstName || "");
  const inputLastName = useInput(user?.lastName || "");
  const age = useInputTypeNumber(user?.age || "");
  const phone = useInputTypeNumber(user?.phone || "");
  const { avatarView, onChange, errorImg, valueImg } = useInputTypeFileImg(
    user?.avatar || ""
  );

  useEffect(() => {
   
  }, [user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (errorImg) return;
    setLoading(true);
    if (valueImg instanceof File) {
      try {
        const urlAvatar = await upfileClodinary(valueImg);
        profilePort(urlAvatar);
        return;
      } catch (error: unknown) {
        setStatusApi({ type: "error", message: "Upload ảnh thất bại!" });
        if (typeof error === "string") throw new Error(error);
      } finally {
        setLoading(false);
      }
    }

    if (user) profilePort(user.avatar!);
  };

  const profilePort = async (avatarUrl: string) => {
    const newProfile = {
      firstName: inputFirstName.value,
      lastName: inputLastName.value,
      gender: selectGender.value,
      age: age.value,
      phone: phone.value,
      avatar: avatarUrl,
    };
    try {
      if (user) await postProfile(user.id, newProfile);
      setStatusApi({ type: "success", message: "Cập nhật thành công!" });
    } catch (error: unknown) {
      setStatusApi({ type: "error", message: "Cập nhật thất bại!" });
      if (typeof error === "string") throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto my-0 max-w-[1024px]  w-full ">
      {statusApi.message && <Toast status={statusApi} />}
      <div className="relative my-3">
        <div className="bg-slate-100 flex gap-5 p-8 ">
          <div className=" bg-white w-[20%] px-3 py-2  ">
            <div className="mx-auto my-0 pt-5">
              <div className=" w-[50px] h-[50px] rounded-full  overflow-hidden mx-auto ">
                <img src={imgUser} alt="" width={50} height={50} className="" />
              </div>
              <p className=" text-center font-semibold text-xl mt-5 opacity-70">
                {" "}
                {user?.firstName} {user?.lastName}{" "}
              </p>
              <p className="text-center font-normal text-base opacity-70">
                {user?.email}
              </p>
            </div>
          </div>
          <div className=" w-[100%]">
            <div className="bg-white w-[100%] px-4 py-4">
              <h2 className=" font-semibold text-xl mb-5">Chi tiết bản thân</h2>
              <form
                action=""
                className="form-container"
                onSubmit={handleSubmit}
              >
                <div className="wp-form-left">
                  <div className="wp-input">
                    <Input
                      className="block py-2 px-3 w-full text-base text-[#475F7B] bg-white rounded border border-solid border-[#DFE3E7] input-register"
                      type="text"
                      label="firstname"
                      placeholder=""
                      title="Họ"
                      {...inputFirstName}
                    />
                  </div>
                  <div className="wp-input">
                    <Input
                      type="text"
                      label="lastname"
                      placeholder=""
                      className="block py-2 px-3 w-full text-base text-[#475F7B] bg-white rounded border border-solid border-[#DFE3E7] input-register"
                      title="Tên"
                      {...inputLastName}
                    />
                  </div>

                  {/* SelectOpion */}
                  <SelectOption
                    {...selectGender}
                    options={options}
                    label={"Giới tính"}
                  />
                  <div className=" mt-2 wp-btn">
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
                      onClick={() => onclick}
                    >
                      Xóa
                    </Button>
                  </div>
                </div>
                <div className="wp-form-left">
                  <div className="wp-input">
                    <Input
                      type="text"
                      label="age"
                      placeholder=""
                      className="block py-2 px-3 w-full text-base text-[#475F7B] bg-white rounded border border-solid border-[#DFE3E7] input-register"
                      title="Tuổi"
                      {...age}
                    />
                  </div>
                  <div className="wp-input">
                    <Input
                      type="text"
                      label="phone"
                      placeholder=""
                      className="block py-2 px-3 w-full text-base text-[#475F7B] bg-white rounded border border-solid border-[#DFE3E7] input-register"
                      title="Số điện thoại"
                      {...phone}
                    />
                  </div>
                </div>
                <div className="wp-right">
                  <div
                    className={` w-44 h-44 border border-solid  p-1  overflow-hidden ${
                      errorImg ? " border-red-600" : "border-[#cccbcb]"
                    }`}
                  >
                    {avatarView ? (
                      <img
                        src={avatarView}
                        alt=""
                        className="mx-auto  w-full h-full object-cover "
                      />
                    ) : (
                      <img
                        src={imgUpload}
                        alt=""
                        className="mx-auto  w-20 mt-[35%]"
                      />
                    )}
                  </div>
                  <p className="text-red-500 leading-6 h-6 font-normal text-xs">
                    {errorImg}
                  </p>
                  <div className="mx-auto my-0">
                    <InputFileUpload onChange={onChange} />
                  </div>
                </div>
              </form>
            </div>
            <div className=" w-[100%] bg-white px-12 py-4 mt-5">
              <div className=""></div>
              <div className="mt-10">
                <h1 className=" text-2xl font-semibold text-gray-500 mb-2">
                  Tài khoản
                </h1>
                <div className="font-medium text-xl flex justify-between items-center my-4">
                  <p className="">Email</p>
                  <p className=" text-yellow-400">{user?.email}</p>
                </div>
                <div className="w-[100%] line-midleware border border-solid border-[#e5e7eb] mx-auto max-w-[1600px]" />
                <div className=" font-medium text-xl my-4  flex justify-between items-center">
                  <div className="cursor-pointer"> Đăng xuất</div>
                  <div className="cursor-pointer" onClick={handleOpen}>
                    Đổi mật khẩu
                  </div>
                </div>
                <div className="font-semibold text-base my-4  flex justify-between items-center">
                  <div></div>
                  <NavLink to="/" className="flex items-center   ">
                    {" "}
                    Home
                    <ExitToAppIcon className="ml-2" />
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        {open && <Changepassword handleOpen={handleOpen} open={open} />}
      </div>
    </div>
  );
};

export default Profile;
