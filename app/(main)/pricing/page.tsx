"use client";
import PricingComp from "@/components/custom/PricingComp";
import ToggleSidebarButton from "@/components/custom/ToggleSidebarButton";
import { useUserContext } from "@/context/UserContext";
import Lookup from "@/data/Lookup";
import React from "react";

const page = () => {
  const { userDetail } = useUserContext();
  return (
    <div className="flex flex-col w-full py-5 px-10 items-center">
      <ToggleSidebarButton />
      <div className="mt-20 flex flex-col gap-3 w-full items-center text-center">
        <h2 className="text-4xl font-bold">Pricing</h2>
        <p className="text-gray-400 max-w-3xl">{Lookup.PRICING_DESC}</p>
        <div className="w-full flex-wrap gap-4 max-w-4xl flex bg-customBackground p-5 border border-gray-500 rounded-lg mt-10 bg items-center justify-between text-left">
          <h2 className="font-bold text-lg">
            {userDetail?.token}{" "}
            <span className="font-medium text-gray-200">Tokens Left</span>
          </h2>
          <div className="flex flex-col">
            <h3 className="font-bold">Need more tokens?</h3>
            <p className="font-medium text-gray-200">Upgrade your plan below</p>
          </div>
        </div>
        <PricingComp />
      </div>
    </div>
  );
};

export default page;
