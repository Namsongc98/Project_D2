type Props = {
  children: React.ReactNode;
};
import Header from "../../component/Header";

const LayoutAdmin = ({ children }: Props) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default LayoutAdmin;
