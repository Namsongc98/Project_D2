import { useState } from "react";
import Input from "../../component/Input";
import "./style/style.scss";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
} from "@mui/material";
import Buttom from "../../component/Buttom";
import { NavLink } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import imgUser from "../../assets/image/userImg.png";
import { getUserToken } from "../../config";
import { useInput, useInputTypeNumber } from "../../hook";
import InputFileUpload from "../../component/InputFileUpload";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const user = getUserToken();

  const [gender, setGender] = useState("");
  const inputFirstName = useInput("");
  const inputLastName = useInput("");
  const age = useInputTypeNumber("");
  const phone = useInputTypeNumber("");

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    p: 4,
  };

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
                      className="form-input"
                      type="text"
                      label="firstname"
                      placeholder="Nhập họ..."
                      title="Họ"
                      {...inputFirstName}
                    />
                  </div>
                  <div className="wp-input">
                    <Input
                      type="text"
                      label="lastname"
                      placeholder=""
                      className="form-input"
                      title="Tên"
                      {...inputLastName}
                    />
                  </div>

                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small-label">
                      Giới tính
                    </InputLabel>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={gender}
                      label="Age"
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={"Nam"}>Nam</MenuItem>
                      <MenuItem value={"Nữ"}>Nữ</MenuItem>
                    </Select>
                  </FormControl>

                  <div className=" mt-2 wp-btn">
                    {/* {loading ? (
                      <div className=" btn-save">
                        <div className="ring-loading"></div>
                      </div>
                    ) : (
                    )} */}
                    <Buttom
                      type="submit"
                      className="text-white bg-[#5A8DEE] w-full rounded px-6 py-2 hover:opacity-80 shadow-[0_2px_4px_0_rgba(90,141,238,0.5)] hover:shadow-[0_4px_12px_0_rgba(90,141,238,0.6)]"
                    >
                      Lưu
                    </Buttom>
                    <Buttom
                      type="submit"
                      className=" bg-slate-100 w-full rounded px-6 py-2 hover:opacity-80 shadow hover:shadow-md"
                    >
                      Xóa
                    </Buttom>
                  </div>
                </div>
                <div className="wp-form-left">
                  <div className="wp-input">
                    <Input
                      type="text"
                      label="age"
                      placeholder=""
                      className="form-input"
                      title="Tuổi"
                      {...age}
                    />
                  </div>
                  <div className="wp-input">
                    <Input
                      type="text"
                      label="phone"
                      placeholder=""
                      className="form-input"
                      title="Số điện thoại"
                      {...phone}
                    />
                  </div>
                </div>
                <div className="wp-right">
                  <div className="wp-avatar overflow-hidden">
                    {/* {avatarView?.preview ? (
                      <img
                        src={avatarView?.preview}
                        alt=""
                        className="avatar-view mx-auto "
                      />
                    ) : (
                      <img
                        src={imgUpload}
                        alt=""
                        className="mx-auto  w-20 mt-[35%]"
                      />
                    )} */}
                  </div>

                  <InputFileUpload  />
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
          <Box sx={style}>
            <div className="">
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
              <Buttom type="submit" className="">
                Xác nhận
              </Buttom>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Profile;
