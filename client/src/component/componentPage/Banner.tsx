
import logoLuxstay from "../../assets/image/Logo_Luxstay.png";

const Banner = () => {
  return (
    <section className=" bg-[#00AFDD] w-full">
      <div className=" bg-[#00AFDD] pt-11 pb-3 my-0 mx-auto max-w-[1024px]">
        <div className="flex justify-between items-center">
          <img src={logoLuxstay} alt="" width={200} height={62} />
          <div className="flex gap-1 items-center text-white text-sm">
            Travel simply and economically!
          </div>
        </div>
        <div>
          <h1 className="pt-24  text-white text-4xl">
            Tìm chuyến bay & khách sạn
          </h1>
        </div>
      </div>
    </section>
  )
}

export default Banner