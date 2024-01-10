import Footer from "../component/Footer";
import Header from "../component/Header";
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
