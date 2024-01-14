import { Banner, ListHotel, PopularTravelCarousel, SearchHotel } from "../../component/componentPage";

const Home = () => {
  return (
    <>
      <Banner />
      <SearchHotel />
      <div className="max-w-[1300px] mx-auto my-0 ">
        <PopularTravelCarousel />
        <ListHotel />
      </div>
    </>
  );
};

export default Home;
