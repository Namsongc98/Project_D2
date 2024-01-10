import Footer from "../component/componentPage/Footer";
import Header from "../component/componentPage/Header";
import { Props } from "../type";

const DefaultLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default DefaultLayout;
