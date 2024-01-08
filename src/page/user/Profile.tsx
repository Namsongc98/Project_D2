import { useState } from "react";

import Input from "../../component/Input";
import "./style/style.scss";
import { Box, Modal } from "@mui/material";
import Buttom from "../../component/Buttom";
import { NavLink } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import imgUser from "../../assets/image/userImg.png";
const Profile = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
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
                <img
                  src={imgUser}
                  alt=""
                  width={50}
                  height={50}
                  className=" "
                />
              </div>
              <p className=" text-center font-semibold text-xl mt-5 opacity-70">
                {" "}
                {/* {profile?.firstName} {profile?.lastName}{" "} */}
              </p>
              <p className="text-center font-normal text-base opacity-70">
                {/* {currenEmail?.email} */}
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
                      //   value={firstName}
                      //      onChange={(e) => setFirstname(e.target.value)}
                    />
                  </div>
                  <div className="wp-input">
                    <Input
                      type="text"
                      label="lastname"
                      placeholder=""
                      className="form-input"
                      title="Tên"
                      //   value={lastName}
                      //   onChange={(e) => setlastname(e.target.value)}
                    />
                  </div>
                  <div className="wp-input">
                    <label className="">
                      <select
                        id="gender"
                        aria-label="gender"
                        name="gender"
                        // onChange={(e) => setGender(e.target.value)}
                        className="form-select"
                      >
                        <option> --Giới tính--</option>
                        <option value={"Nam"}>Nam</option>
                        <option value={"Nữ"}>Nữ</option>
                      </select>
                    </label>
                  </div>

                  <div className=" mt-7 wp-btn">
                    {/* {loading ? (
                      <div className=" btn-save">
                        <div className="ring-loading"></div>
                      </div>
                    ) : (
                    )} */}
                    <button type="submit" className=" btn-save">
                      Lưu
                    </button>
                    <button type="reset" className=" btn-Cancel">
                      Cancel
                    </button>
                  </div>
                </div>
                <div className="wp-form-left">
                  <div className="wp-input">
                    <Input
                      type="number"
                      label="age"
                      placeholder=""
                      className="form-input"
                      title="Tuổi"
                      //   value={age}
                      //   onChange={handleInputAge}
                    />
                  </div>
                  <div className="wp-input">
                    <Input
                      type="text"
                      label="phone"
                      placeholder=""
                      className="form-input"
                      title="Số điện thoại"
                      //   value={phone}
                      //   onChange={handleInputPhone}
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

                  <label htmlFor="avatar" className="label-avatar">
                    <span>Add Avatar</span>
                    <input
                      type="file"
                      id="avatar"
                      name="avatar"
                      placeholder="avatar"
                      //   onChange={handeAvatar}
                    />
                  </label>
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
                  <p className=" text-yellow-400"></p>
                </div>
                <div className="w-[100%] line-midleware mx-auto max-w-[1600px]" />
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
              <Buttom type="submit">Xác nhận</Buttom>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Profile;
