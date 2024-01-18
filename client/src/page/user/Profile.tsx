import { useEffect, useState } from "react";
import "../../style/styleComponent.scss";
import imgUpload from "../../assets/image/upanh.png";
import { NavLink } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import {
  useButton,
  useGetUser,
  useInput,
  useInputTypeFileImg,
  useInputTypeNumber,
  useSelectOption,
} from "../../hook";
import { SelectOptionType } from "../../type";
import { postProfile, upfileClodinary } from "../../service";

import {
  Button,
  Input,
  InputFileUpload,
  SelectOption,
} from "../../component/element";
import AvatarUser from "../../component/componentReuse/AvatarUser";
import { Changepassword, ModalComponent } from "../../component/componentReuse";
import SnackBarReuse from "../../component/componentReuse/SnackBarReuse";
import { AlertColor } from "@mui/material";
import { AppDispatch } from "../../store/configStore";
import { useDispatch } from "react-redux";
import { getUser, setUser } from "../../store/reducer/userSlice";
import { useSelector } from "react-redux";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [loading, setLoading] = useState(false);
  const user = useGetUser();
  const [type, setType] = useState<AlertColor>("success");
  const [error, setError] = useState("");
  const userSelector = useSelector(getUser);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(setUser(userSelector));
  }, [user]);

  const genders = ["Nam", "Nữ"];
  const options: SelectOptionType[] = [
    ...genders.map((gender) => ({ label: gender, value: gender })),
  ];
  const selectGender = useSelectOption(userSelector?.gender || "");
  const inputFirstName = useInput(userSelector?.firstName || "");
  const inputLastName = useInput(userSelector?.lastName || "");
  const age = useInputTypeNumber(userSelector?.age || "");
  const phone = useInputTypeNumber(userSelector?.phone || "");
  const InputTypeFileImg = useInputTypeFileImg(userSelector?.avatar || "");
  const resetButton = useButton();

  useEffect(() => {
    inputFirstName.setValue(userSelector?.firstName || "");
    inputLastName.setValue(userSelector?.lastName || "");
    age.setValue(userSelector?.age || "");
    phone.setValue(userSelector?.phone || "");
    InputTypeFileImg.setValueImg(userSelector?.avatar || "");
    selectGender.setValue(userSelector?.gender || "");
  }, [userSelector]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (InputTypeFileImg.errorImg) return;
    setLoading(true);
    if (InputTypeFileImg.valueImg instanceof File) {
      try {
        const urlAvatar = await upfileClodinary(InputTypeFileImg.valueImg);
        profilePort(urlAvatar);
        return;
      } catch (error: unknown) {
        setType("error");
        setError("Upload ảnh thất bại!");
        if (typeof error === "string") throw new Error(error);
      } finally {
        setLoading(false);
      }
    }

    if (userSelector) profilePort(userSelector.avatar!);
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
      if (userSelector) {
        const res = await postProfile(userSelector.id, newProfile);
        dispatch(setUser(res.data));
      }
      setType("success");
      setError("Cập nhật thành công");
    } catch (error: unknown) {
      setType("error");
      setError("Upload ảnh thất bại!");
      if (typeof error === "string") throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    resetButton.onClick(e);
    inputFirstName.setValue("");
    inputLastName.setValue("");
    age.setValue("");
    phone.setValue("");
    selectGender.setValue("");
  };

  return (
    <div className="mx-auto my-0 max-w-[1024px]  w-full ">
      <SnackBarReuse type={type} message={error} />
      <div className="relative my-3">
        <div className="bg-slate-100 flex gap-3 p-3 ">
          <div className=" bg-white w-1/4 px-3 py-2  ">
            <div className="mx-auto my-0 pt-5">
              <div className=" w-[50px] h-[50px] flex items-center justify-center rounded-full  overflow-hidden mx-auto ">
                <AvatarUser user={userSelector} size={50} />
              </div>
              <p className=" text-center font-semibold text-xl mt-5 opacity-70">
                {" "}
                {userSelector?.firstName} {userSelector?.lastName}{" "}
              </p>
            </div>
          </div>
          <div className=" w-3/4">
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
                      required={false}
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
                      required={false}
                    />
                  </div>

                  {/* SelectOpion */}
                  <SelectOption
                    {...selectGender}
                    options={options}
                    label="Giới tính"
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
                      onClick={(e) => handleClick(e)}
                    >
                      Xóa
                    </Button>
                  </div>
                </div>
                <div className="wp-form-left">
                  <div className="wp-input">
                    <Input
                      type="number"
                      label="age"
                      placeholder=""
                      className="block py-2 px-3 w-full text-base text-[#475F7B] bg-white rounded border border-solid border-[#DFE3E7] input-register"
                      title="Tuổi"
                      {...age}
                      required={false}
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
                      required={false}
                    />
                  </div>
                </div>
                <div className="wp-right">
                  <div
                    className={` w-44 h-44 border border-solid mx-auto my-0 p-1  overflow-hidden ${
                      InputTypeFileImg.errorImg
                        ? " border-red-600"
                        : "border-[#cccbcb]"
                    }`}
                  >
                    {InputTypeFileImg.avatarView ? (
                      <img
                        src={InputTypeFileImg.avatarView}
                        alt=""
                        className="mx-auto  w-full h-full object-cover "
                      />
                    ) : InputTypeFileImg.valueImg &&
                      typeof InputTypeFileImg.valueImg === "string" ? (
                      <img
                        src={InputTypeFileImg.valueImg}
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
                    {InputTypeFileImg.errorImg}
                  </p>
                  <div className="flex justify-center items-center">
                    <InputFileUpload handleChange={InputTypeFileImg.onChange} />
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
                  <p className=" text-yellow-400">{userSelector?.email}</p>
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
        {open && (
          <ModalComponent handleOpen={handleOpen} open={open}>
            <Changepassword />
          </ModalComponent>
        )}
      </div>
    </div>
  );
};

export default Profile;
