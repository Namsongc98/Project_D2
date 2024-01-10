import React from "react";
import imgLogo from "../../assets/image/Logo_Luxstay.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import ShopIcon from "@mui/icons-material/Shop";
import AppleIcon from "@mui/icons-material/Apple";
const Footer = () => {
  return (
    <div className="w-full  bg-[#00AFDD]">
      <div className="max-w-[1024px] bg-[#00AFDD] mx-auto my-0 flex py-10">
        <ul className="text-[white] flex flex-col gap-2 mr-9 w-1/4">
          <li>
            <img src={imgLogo} alt="" className="mb-8" />
          </li>
          <li>
            Địa chỉ: Tầng 18 - tòa Center Building - 85 Vũ Trọng Phụng - Quận
            Thanh Xuân - Hà Nội
          </li>
          <li>Hotline: 0919 50 1881</li>
          <li>Email: support@asahiluxstay.com</li>
          <li>Liên hệ với chúng tôi</li>
        </ul>
        <ul className="text-[white] flex flex-col gap-3 mr-9 w-1/6">
          <li className="mb-5 mt-3 text-lg">Menu</li>
          <li className="">Trang chủ</li>
          <li className="">Căn hộ</li>
          <li className="">Blogs</li>
          <li className="">Câu hỏi thường gặp</li>
          <li className="">Giới thiệu về Asahi</li>
        </ul>
        <ul className="text-[white] flex flex-col gap-3 mr-9 w-1/6">
          <li className="mb-5 text-lg mt-3">Loại hình lưu trú</li>
          <li>Căn hộ dịch vụ</li>
          <li>Biệt thự</li>
          <li>Homestay</li>
          <li>Khách sạn</li>
          <li>Tour</li>
        </ul>
        <ul className="text-[white] flex flex-col gap-3 mr-9 w-1/6">
          <li className="mb-5 text-lg mt-3">My Social</li>
          <li className="flex items-center gap-1">
            <FacebookIcon />
            <span className="">Facebook</span>
          </li>
          <li className="flex items-center gap-1">
            <InstagramIcon />
            Instagram
          </li>
          <li className="flex items-center gap-1">
            <PinterestIcon />
            Pinterest
          </li>
          <li className="flex items-center gap-1">
            <TwitterIcon />
            Twitter
          </li>
          <li className="flex items-center gap-1">
            <InstagramIcon />
            Tiktok
          </li>
        </ul>
        <ul className="flex flex-col gap-5 mr-9 w-1/4">
          <li className="mb-5 text-lg mt-3 text-white">My Social</li>
          <li className="flex items-center gap-3 h-[70px] w-60 px-4 border border-solid border-[#ffffff] rounded-md">
            <ShopIcon fontSize="large" className="text-white" />
            <h1 className=" text-white">Google Play</h1>
          </li>
          <li className="flex items-center gap-3 h-[70px] w-60 px-4 border border-solid border-[#ffffff] rounded-md">
            <AppleIcon fontSize="large" className="text-white" />
            <h1 className="text-white">App Store</h1>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
