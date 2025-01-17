"use client";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { useUserContext } from "@/context/UserContext";
import { useActionContext } from "@/context/ActionContext";

const Header = () => {
  const { userDetail } = useUserContext();
  const { setAction } = useActionContext();
  return (
    <header className="p-4 flex justify-between items-center border-b border-gray-600">
      <Image
        src={"/logo.png"}
        width={40}
        height={40}
        className="object-cover"
        alt="Dazzy"
      />
      {!userDetail?.name ? (
        <div className="flex items-center gap-3">
          <Button variant="ghost">Sign In</Button>
          <Button className="text-white bg-blue2 hover:bg-blue-500">
            Log In
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <Button
            onClick={() =>
              setAction((prev) => ({
                ...prev,
                actionType: "export",
                timestamp: Date.now(),
              }))
            }
            variant="ghost"
          >
            Export
          </Button>
          <Button
            onClick={() =>
              setAction((prev) => ({
                ...prev,
                actionType: "deploy",
                timestamp: Date.now(),
              }))
            }
            className="text-white bg-blue2 hover:bg-blue-500"
          >
            Deploy
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;
