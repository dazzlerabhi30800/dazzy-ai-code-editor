"use client";
import Lookup from "@/data/Lookup";
import { ArrowRight, Link } from "lucide-react";
import React, { useState } from "react";

const Hero = () => {
  const [userInput, setUserInput] = useState<string | undefined>();
  return (
    <div className="flex flex-col items-center mt-56 gap-2 w-full px-4 text-center">
      <h2 className="font-bold text-4xl text-white">{Lookup.HERO_HEADING}</h2>
      <p className="text-gray-300 font-medium">{Lookup.HERO_DESC}</p>
      <div className="border p-5 rounded-xl w-full max-w-2xl my-8 bg-customBackground">
        <div className="flex gap-2">
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder={Lookup.INPUT_PLACEHOLDER}
            className="bg-transparent outline-none w-full h-32 max-h-56 resize-none"
          />
          {userInput && (
            <ArrowRight className="bg-blue-500 p-2 h-8 w-8 rounded-md" />
          )}
        </div>
        <div>
          <Link className="w-5 h-5" />
        </div>
      </div>
      <div className="flex flex-wrap max-w-3xl w-full gap-2 justify-center">
        {Lookup.SUGGSTIONS?.map((suggestion, index) => (
          <h2
            className="border border-gray-500 text-gray-500 hover:text-white p-2 text-sm rounded-xl cursor-pointer"
            key={index}
          >
            {suggestion}
          </h2>
        ))}
      </div>
    </div>
  );
};

export default Hero;
