import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Button } from "../ui/button";
import { MessageCircleCode } from "lucide-react";
import WorkspaceHistory from "./WorkspaceHistory";
import SideBarFooter from "./SideBarFooter";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-5">
        <Image
          src={"/logo.png"}
          alt="Dazzy"
          width={35}
          height={35}
          className="object-cover"
        />
        <Button className="mt-3">
          <MessageCircleCode className="text-xl" /> Start New Chat
        </Button>
      </SidebarHeader>
      <SidebarContent className="p-5 pt-0">
      <SidebarGroup>
      <WorkspaceHistory />
      </SidebarGroup>
      {/* <SidebarGroup /> */}
      </SidebarContent>
      <SidebarFooter>
        <SideBarFooter />
      </SidebarFooter>
    </Sidebar>
  );
}
