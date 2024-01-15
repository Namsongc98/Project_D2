import React from "react";
import { typeTouris } from "../../constain";
const TypeTourism = () => {
  return (
    <div className="w-full mb-10">
      <h1 className="my-5 mx-0 text-4xl text-center mb-10">
        Khám phá thêm loại hình du lịch
      </h1>
      <div className="flex gap-9">
        {typeTouris.map((item) => (
          <div
            className="w-1/4 rounded-md shadow-[0px_0px_10px_0px_rgba(0,_0,_0,_0.1)] hover:shadow-lg"
            key={item.id}
          >
            <div className="w-full rounded-md overflow-hidden object-cover h-40">
              <img src={item.image} alt="" className="w-full h-full" />
            </div>
            <div className="p-3">
              <h3 className="text-lg hover:text-red-500 cursor-pointer">
                {item.type}
              </h3>
              <p></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TypeTourism;
