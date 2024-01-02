import Input from "../../component/Input";
import "./style/registerLogin.scss";
import LoginImg from "../../assets/image/login.png";
const Register = () => {
  return (
    <section className="container_register row flex-center">
      <div className="wapper_register col-pc-8 flex bg-white">
        <div className="register-left p-4">
          <h4 className="text-center mb-2 ">
            Đăng ký tài khoản trên Asahi Luxstay.
          </h4>
          <p className="">THÔNG TIN ĐĂNG NHẬP</p>
          <div className="wapper_form">
            <form>
              <Input label={"Email hoặc số điện thoại"} />

              <label>
                Mật khẩu
                <Input />
              </label>
            </form>
          </div>
        </div>
        <div className="register-right p-4 col-pc-6">
          <img src={LoginImg} alt="" className="img-register" />
        </div>
      </div>
    </section>
  );
};

export default Register;
