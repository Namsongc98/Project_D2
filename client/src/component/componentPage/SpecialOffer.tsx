import { specialOffer } from "../../constain";
const SpecialOffer = () => {
  return (
    <div className="w-full mb-10">
      <div className="text-center  mt-12 mb-10">
        <h1 className="my-5 mx-0 text-4xl text-center">Ưu đãi đặc biệt</h1>
        <p className="text-xl ">
          Cùng khám phá và tận hưởng kỳ nghỉ của bạn với những ưu đãi đặc biệt
          khi đến với Asahi Luxstay.
        </p>
      </div>

      <div className="w-full flex gap-2">
        {specialOffer.map((item) => (
          <div
            className="overflow-hidden rounded cursor-pointer w-1/3 h-[224px]"
            key={item.id}
          >
            <img
              src={item.image}
              alt={item.image}
              className="object-left object-cover h-full w-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialOffer;
