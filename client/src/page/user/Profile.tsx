import { useState } from "react";
import Input from "../../component/Input";
import "../../style/styleComponent.scss";
import imgUpload from "../../assets/image/upanh.png";
import { Box, Modal } from "@mui/material";
import Button from "../../component/Button";
import { NavLink } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import imgUser from "../../assets/image/userImg.png";
import { getUserToken } from "../../config";
import { useInput, useInputTypeFileImg, useInputTypeNumber } from "../../hook";
import InputFileUpload from "../../component/InputFileUpload";
import { SelectOption } from "../../component/SelectOption";
import useSelectOption from "../../hook/useSelectOption";
import { SelectOptionType } from "../../type";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const user = getUserToken();

  const genders = ["Nam", "Nữ"];
  const selectGender = useSelectOption("");

  const options: SelectOptionType[] = [
    ...genders.map((gender) => ({ label: gender, value: gender })),
  ];

  const inputFirstName = useInput("");
  const inputLastName = useInput("");
  const age = useInputTypeNumber("");
  const phone = useInputTypeNumber("");
  const avatar = useInputTypeFileImg("");

  return (
    <div className="mx-auto my-0 max-w-[1024px]  w-full ">
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
              <form action="" className="form-container">
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
                  <SelectOption {...selectGender} options={options} />
                  <div className=" mt-2 wp-btn">
                    {/* {loading ? (
                      <div className=" btn-save">
                        <div className="ring-loading"></div>
                      </div>
                    ) : (
                    )} */}
                    <Button
                      type="submit"
                      className="text-white bg-[#5A8DEE] w-full rounded px-6 py-2 hover:opacity-80 shadow-[0_2px_4px_0_rgba(90,141,238,0.5)] hover:shadow-[0_4px_12px_0_rgba(90,141,238,0.6)]"
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
                  <div className="wp-avatar overflow-hidden">
                    {avatar.avatarView ? (
                      <img
                        src={avatar.avatarView}
                        alt=""
                        className="avatar-view mx-auto "
                      />
                    ) : (
                      <img
                        src={imgUpload}
                        alt=""
                        className="mx-auto  w-20 mt-[35%]"
                      />
                    )}
                  </div>
                  <div className="mx-auto my-0">
                    <InputFileUpload {...avatar} />
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
                  <p className=" text-yellow-400">{user.email}</p>
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

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box>
            <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[400px] bg-white shadow-md border border-solid border-[#000] p-4">
              <h1 className="text-center text-2xl mb-3">Đổi mật khẩu</h1>

              <Input
                title="Mật khẩu cũ"
                type="text"
                placeholder="nhập mật khẩu cũ"
                label="password"
                className="block py-2 px-3 w-full text-base text-[#475F7B] bg-white rounded border border-solid border-[#DFE3E7] input-register"
              />

              <Input
                title="Mật khẩu mới"
                type="text"
                placeholder="nhập mật khẩu cũ"
                label="password"
                className="block py-2 px-3 w-full text-base text-[#475F7B] bg-white rounded border border-solid border-[#DFE3E7] input-register"
              />
              <Input
                title="Xác nhận mật khẩu"
                type="text"
                placeholder="nhập mật khẩu cũ"
                label="password"
                className="block py-2 px-3 w-full text-base text-[#475F7B] bg-white rounded border border-solid border-[#DFE3E7] input-register"
              />
              <Button
                type="submit"
                className="text-white bg-[#5A8DEE] w-full rounded px-6 py-2 hover:opacity-80 shadow-[0_2px_4px_0_rgba(90,141,238,0.5)] hover:shadow-[0_4px_12px_0_rgba(90,141,238,0.6)]"
              >
                Xác nhận
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Profile;
