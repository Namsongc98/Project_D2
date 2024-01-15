import {
  Banner,
  ListHotel,
  PopularTravelCarousel,
} from "../../component/componentPage";
import SpecialOffer from "../../component/componentPage/SpecialOffer";
import TypeTourism from "../../component/componentPage/TypeTourism";
import { SearchHotel } from "../../component/componentReuse";

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
