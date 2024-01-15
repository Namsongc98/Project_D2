import {
  Banner,
  ListHotel,
  PopularTravelCarousel,
  SearchHotel,
} from "../../component/componentPage";
import SpecialOffer from "../../component/componentPage/SpecialOffer";
import TypeTourism from "../../component/componentPage/TypeTourism";

const Home = () => {
  return (
    <>
      <Banner />
      <SearchHotel />
      <div className="max-w-[1300px] mx-auto my-0 ">
        <PopularTravelCarousel />
        <SpecialOffer />
        <TypeTourism />
        <ListHotel />
      </div>
    </>
  );
};

export default Home;
