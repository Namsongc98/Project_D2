import Slider from "react-slick";
import { dataCityCarousel } from "../../constain";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";

function SamplePrevArrow(props: any) {
  const { onClick } = props;
  return (
    <div
      className="bg-white z-10 absolute top-[40%] left-3 p-4 rounded-full flex justify-center items-center"
      onClick={onClick}
    >
      <ArrowBackIosIcon fontSize="inherit" />
    </div>
  );
}

function SampleNextArrow(props: any) {
  const { onClick } = props;
  return (
    <div
      className="bg-white z-10 absolute top-[40%] right-3 p-4 rounded-full flex justify-center items-center"
      onClick={onClick}
    >
      <ArrowForwardIosIcon fontSize="inherit" />
    </div>
  );
}

const PopularTravelCarousel = () => {
  const settings = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="w-full ">
      <div className="text-center  mt-12 mb-10">
        <h1 className="my-5 mx-0 text-4xl text-center">Khu vực phổ biến</h1>
        <p className="text-xl ">
          Những địa điểm lưu trú phổ biến được nhiều khách du lịch quan tâm và
          thường xuyên ghé thăm.
        </p>
      </div>
      <div className=" relative">
        <Slider {...settings}>
          {dataCityCarousel.map((item) => (
            <Link to={`/${item.search}`} className="" key={item.id}>
              <div className="relative overflow-hidden rounded cursor-pointer mx-1">
                <h2 className="absolute text-white text-lg bottom-0 mb-4 ml-4 font-bold">
                  {item.city}
                </h2>

                <img src={item.img} alt="" className="object-cover h-[248px]" />
              </div>
            </Link>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default PopularTravelCarousel;
