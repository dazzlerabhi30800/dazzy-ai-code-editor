"use client";
import React, { useState } from "react";
import {
  SandpackProvider,
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import { Button } from "../ui/button";
import Lookup from "@/data/Lookup";

const CodeView = () => {
  const [activeTab, setActiveTab] = useState<string>("code");
  const tabStyle = {
    height: "78vh",
  };
  const [circleStyle, setCircleStyle] = useState<any>({
    left: "12px",
    width: "35%",
  });
  const [files, setFiles] = useState(Lookup.DEFAULT_FILE);

  const handleStatusChange = (status: string) => {
    const button = document.getElementById(status);
    if (!button) return;
    const dimensions: any = button?.getBoundingClientRect();
    const parentDim: any = button?.offsetParent?.getBoundingClientRect();
    const leftPercent = dimensions?.left - parentDim?.left;
    setCircleStyle({
      ...circleStyle,
      left: leftPercent,
      width: dimensions.width + "px",
    });
    setActiveTab(status);
    // const rect = button.getBoundingClientRect();
    // console.log(status);
  };
  return (
    <div>
      <div className="border-b border-gray-500 bg-customBackground p-2">
        <div className="flex flex-wrap gap-2 items-center w-fit bg-black rounded-3xl py-2 px-3 border border-gray-700 relative">
          <Button
            variant="ghost"
            onClick={() => handleStatusChange("code")}
            className={`z-10 h-7 px-3 rounded-2xl ${activeTab === "code" ? "text-white hover:text-black" : "bg-transparent text-white hover:text-sky-500"} hover:bg-transparent code`}
            id="code"
          >
            Code
          </Button>
          <Button
            onClick={() => handleStatusChange("preview")}
            variant="ghost"
            className={`z-10 h-7 px-3 rounded-2xl ${activeTab === "preview" ? "text-white hover:text-black" : "bg-transparent text-white  hover:text-sky-500"} hover:bg-transparent`}
            id="preview"
          >
            Preview
          </Button>
          <span
            style={circleStyle}
            className="absolute -z-1 bg-sky-500 rounded-2xl h-7 px-3 transition-all"
          ></span>
        </div>
      </div>
      <SandpackProvider
        files={files}
        options={{
          externalResources: ["https://cdn.tailwindcss.com/"],
        }}
        customSetup={{
          dependencies: {
            ...Lookup.DEPENDANCY,
          },
        }}
        template="react"
        theme={"dark"}
      >
        <SandpackLayout>
          {activeTab === "code" ? (
            <>
              <SandpackFileExplorer style={tabStyle} />
              <SandpackCodeEditor style={tabStyle} />
            </>
          ) : (
            <SandpackPreview showNavigator={true} style={tabStyle} />
          )}
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
};

export default CodeView;
