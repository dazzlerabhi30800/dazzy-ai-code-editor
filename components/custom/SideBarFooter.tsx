import { HelpCircle, LogOut, Settings, Wallet } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const SideBarFooter = () => {
  const router = useRouter();
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
      path: "/pricing",
    },
    {
      name: "Sign Out",
      icon: LogOut,
    },
  ];
  const handleRoute = (option: any) => {
    if (!option.path) return;
    router.push(option.path);
  };
  return (
    <div className="flex flex-col justify-start p-5 gap-3 mb-8">
      {options.map((option: any, index) => (
        <Button
          onClick={() => handleRoute(option)}
          key={index}
          className="flex items-center justify-start"
          variant="ghost"
        >
          <option.icon />
          {option.name}
        </Button>
      ))}
    </div>
  );
};

export default SideBarFooter;
