import React from "react";
import { cards } from "../Constants/card";

const Info = () => {
  return (
    <div className="container mx-auto p-10">
      <div className="w-[80vw] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 p-5">
        {cards.map((card) => (
          <div
            className="flex transition-all duration-400 shadow-[0px_0px_15px_0px_rgba(0,0,0,0.1)] hover:scale-102 flex-col gap-8  border border-gray-200 p-6 rounded-md"
            key={card.id}
          >
            <h3 className="text-xl font-bold text-black ">{card.head}</h3>
            <p className="text-gray-600">{card.para}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Info;
