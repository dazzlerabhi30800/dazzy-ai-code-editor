import { HelpCircle, LogOut, Settings, Wallet } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

const SideBarFooter = () => {
  const options = [
    {
      name: "Settings",
      icon: Settings,
    },
    {
      name: "Help Centre",
      icon: HelpCircle,
    },
    {
      name: "Subscriptions",
      icon: Wallet,
    },
    {
      name: "Sign Out",
      icon: LogOut,
    },
  ];
  return (
    <div className="flex flex-col justify-start p-5 gap-3 mb-8">
      {options.map((option: any, index) => (
        <Button key={index} className="flex items-center justify-start" variant="ghost">
          <option.icon />
          {option.name}
        </Button>
      ))}
    </div>
  );
};

export default SideBarFooter;
