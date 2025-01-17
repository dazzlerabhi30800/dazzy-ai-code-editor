import React from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

const ToggleSidebarButton = () => {
  const { toggleSidebar, open, setOpenMobile, openMobile } = useSidebar();
  return (
    <>
      <Button
        onClick={toggleSidebar}
        className="hidden md:block mb-4 self-start"
      >
        {open ? <X /> : <Menu />}
      </Button>
      <Button
        onClick={() => setOpenMobile(!openMobile)}
        className="md:hidden mb-4 self-start"
      >
        {openMobile ? <X /> : <Menu />}
      </Button>
    </>
  );
};

export default ToggleSidebarButton;
