import Header from "../component/Header";
type Props = {
  children: React.ReactNode;
};
function DefaultLayout({ children }: Props) {
  return (
    <div>
      {/* <Header /> */}
      {children}
    </div>
  );
}

export default DefaultLayout;
