import Lookup from "@/data/Lookup";
import { pricing } from "@/type";
import React from "react";
import { Button } from "../ui/button";

const PricingComp = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mt-10 lg:grid-cols-3 xl:grid-cols-4 gap-10">
      {Lookup.PRICING_OPTIONS?.map((option: pricing, index: number) => (
        <div className="border rounded-sm p-4 flex flex-col gap-4 text-left justify-between" key={index}>
          <h2 className="font-bold text-2xl">{option.name}</h2>
          <h3 className="font-medium text-lg">{option.tokens}</h3>
          <p className="text-gray-400">{option.desc}</p>
          <h4 className="font-bold text-4xl mt-4">${option.price}</h4>
          <Button>Uprade to {option.name}</Button>
        </div>
      ))}
    </div>
  );
};

export default PricingComp;
