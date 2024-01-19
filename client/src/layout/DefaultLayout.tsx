import { Outlet } from "react-router-dom";
import Footer from "../component/componentPage/Footer";
import Header from "../component/componentPage/Header";

const DefaultLayout = () => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default DefaultLayout;
