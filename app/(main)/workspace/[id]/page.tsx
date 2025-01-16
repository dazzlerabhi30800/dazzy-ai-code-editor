"use client";
import ChatView from "@/components/custom/ChatView";
import CodeView from "@/components/custom/CodeView";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { Menu, X } from "lucide-react";
import React from "react";

const page = () => {
  const { toggleSidebar, open, setOpenMobile, openMobile } = useSidebar();
  return (
    <main className="mt-0 p-6 md:p-10">
      <Button onClick={toggleSidebar} className="hidden md:block mb-4">
        {open ? <X /> : <Menu />}
      </Button>
      <Button
        onClick={() => setOpenMobile(!openMobile)}
        className="md:hidden mb-4"
      >
        {openMobile ? <X /> : <Menu />}
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <ChatView />
        <div className="md:col-span-3">
          <CodeView />
        </div>
      </div>
    </main>
  );
};

export default page;
