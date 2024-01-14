
import Slider from "react-slick";

const PopularTravelCarousel = () => {

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    };
    return (
        <div>
            <div className="text-center mb-4 mt-12 ">
                <h1 className="text-3xl text-[#33333] font-semibold mb-2">Khu vực phổ biến</h1>
                <p className="text-xl ">Những địa điểm lưu trú phổ biến được nhiều khách du lịch quan tâm và thường xuyên ghé thăm.</p>
            </div>
            <div className="">


            </div>
            <Slider {...settings}>
                <div className="relative overflow-hidden rounded cursor-pointer">
                    <h2 className="absolute"></h2>
                    <div className="">
                        <img src="" alt="" className="object-cover w-1/5 h-[248px]" />
                    </div>
                </div>

            </Slider>
        </div>
    )
}

export default PopularTravelCarousel