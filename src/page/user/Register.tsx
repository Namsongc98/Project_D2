import Input from "../../component/Input";
import "./style/registerLogin.scss";
import LoginImg from "../../assets/image/login.png";
import { useInput } from "../../hook";






const Register = () => {
  const { value, handleChange } = useInput("")
  const inputData = [
    { id: 1, name: "Email",value, onchange: handleChange, },
    { id: 2, name: "Password",value, onchange: handleChange, },
    { id: 3, name: "ConfirmPassword",value, onchange: handleChange, }
  ]


  return (
    <section className="bg-[url('./src/assets/image/auth-bg.jpg')] w-dvw h-dvh flex justify-center items-center">
      <div className="flex  bg-white w-2/3 shadow-[-8px_20px_25px_0_rgba(25,42,70,0.3)] rounded">
        <div className="w-1/2 p-6  ">
          <div className=" text-center  pt-5 pl-7 pr-7 pb-4 ">
            <h4 className=" mb-6 text-[#475F7B] font-normal leading-5 text-2xl">
              Đăng ký tài khoản trên Asahi Luxstay.
            </h4>
          </div>
          <div className="pr-7 pl-7 pb-7">
            <div className="flex mt-4 mb-4 justify-between items-center border-solid">
              <div className="w-1/3 border-t-[1px] border-[#DFE3E7] h-[0px] "></div>
              <div className="bg-white px-4">
                <p className="font-normal text-sm text-[#828D99]  whitespace-nowrap ">THÔNG TIN ĐĂNG NHẬP</p>
              </div>
              <div className="w-1/3 border-t-[1px] border-[#DFE3E7] h-[1px] border-solid"></div>
            </div>
            <div className="">
              <form>
                <Input  />


              </form>
            </div>
          </div>
        </div>
        <div className="w-1/2 self-center p-12 mt-10 mb-10">
          <img src={LoginImg} alt="" className="img-register" />
        </div>
      </div>
    </section>
  );
};

export default Register;
