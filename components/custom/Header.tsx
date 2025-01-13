import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <header className="p-4 flex justify-between items-center">
      <Image
        src={"/logo.png"}
        width={40}
        height={40}
        className="object-cover"
        alt="Dazzy"
      />
      <div className="flex items-center gap-3">
        <Button variant="ghost">Sign In</Button>
        <Button
          className="text-white bg-blue2 hover:bg-blue-500"
        >
          Log In
        </Button>
      </div>
    </header>
  );
};

export default Header;
