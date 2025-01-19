"use client";
import ChatView from "@/components/custom/ChatView";
import CodeView from "@/components/custom/CodeView";
import ToggleSidebarButton from "@/components/custom/ToggleSidebarButton";
import { useActionContext } from "@/context/ActionContext";
import Link from "next/link";
import React from "react";

const WorkSpace = () => {
  const { liveLink } = useActionContext();
  return (
    <main className="mt-0 p-6 md:p-10">
      <div className="flex justify-between mb-5 items-center">
        <ToggleSidebarButton />
        {liveLink && (
          <Link
            href={liveLink}
            className="text-sm font-bold italic hover:underline"
            target="_blank"
          >
            Deployment Link
          </Link>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <ChatView />
        <div className="md:col-span-3">
          <CodeView />
        </div>
      </div>
    </main>
  );
};

export default WorkSpace;
