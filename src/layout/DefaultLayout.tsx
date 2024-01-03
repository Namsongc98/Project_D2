import Header from "../component/Header";
type Props = {
  children: React.ReactNode;
};
const  DefaultLayout=({ children }: Props)=>  {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default DefaultLayout;
