"use client";
import ChatView from "@/components/custom/ChatView";
import CodeView from "@/components/custom/CodeView";
import React from "react";

const page = () => {
  return (
    <main className="mt-10 p-10">
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
