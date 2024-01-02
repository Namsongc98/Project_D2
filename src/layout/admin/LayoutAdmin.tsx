type Props = {
  children: React.ReactNode;
};
import Header from "../../component/Header";

function LayoutAdmin({ children }: Props) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default LayoutAdmin;
