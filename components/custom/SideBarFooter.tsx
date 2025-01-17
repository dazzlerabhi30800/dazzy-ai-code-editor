import { HelpCircle, LogOut, Settings, Wallet } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/UserContext";
import { googleLogout } from "@react-oauth/google";

const SideBarFooter = () => {
  const router = useRouter();
  const { setUserDetail } = useUserContext();
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
      path: "/logout",
    },
  ];
  const handleRoute = (option: any) => {
    if (!option.path) return;
    if (option.name === "Sign Out") {
      googleLogout();
      window.localStorage.removeItem("user");
      router.push("/");
      setUserDetail(null);
      return;
    }
    router.push(option.path);
  };
  return (
    <footer className="flex flex-col justify-start p-5 gap-3 mb-8">
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
    </footer>
  );
};

export default SideBarFooter;
