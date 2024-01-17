import Footer from "../component/componentPage/Footer";
import Header from "../component/componentPage/Header";
import { PropsLayout } from "../type";

const DefaultLayout = ({ children }: PropsLayout) => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default DefaultLayout;
