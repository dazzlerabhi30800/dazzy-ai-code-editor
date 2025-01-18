"use client";
import React, { useEffect, useState } from "react";
import {
  SandpackProvider,
  SandpackCodeEditor,
  SandpackLayout,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import { Button } from "../ui/button";
import Lookup from "@/data/Lookup";
import { useMessageContext } from "@/context/MessageContext";
import axios from "axios";
import Prompt from "@/data/Prompt";
import { useConvex, useMutation } from "convex/react";
// import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Loader2Icon } from "lucide-react";
import SandpackPreviewClient from "./SandpackPreviewClient";
import { Id } from "@/convex/_generated/dataModel";
import { useActionContext } from "@/context/ActionContext";

type status = "code" | "preview";

const CodeView = () => {
  const { messages } = useMessageContext();
  const { id } = useParams();
  const { action } = useActionContext();
  const updateFiles = useMutation(api.workspace.updateFiles);
  const convex = useConvex();
  const [activeTab, setActiveTab] = useState<status>("code");
  const tabStyle = {
    height: "78vh",
  };
  const [circleStyle, setCircleStyle] = useState({
    left: 12,
    width: "35%",
  });
  const [files, setFiles] = useState(Lookup.DEFAULT_FILE);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages.length - 1].role;
      if (role === "user") {
        generateAiCode();
      }
    }
  }, [messages]);

  useEffect(() => {
    if (action.actionType == "") return;
    handleStatusChange("preview");
  }, [action]);

  //NOTE: get current workspace files
  useEffect(() => {
    if (!id) return;
    getCurrentFiles();
  }, [id]);

  // NOTE: get workspace data to set files
  const getCurrentFiles = async () => {
    setLoading(true);
    const result = await convex.query(api.workspace.getWorkspace, {
      workspaceId: id as Id<"workspace">,
    });
    const mergedFiles = { ...Lookup.DEFAULT_FILE, ...result?.fileData };
    setFiles(mergedFiles);
    setLoading(false);
  };

  const generateAiCode = async () => {
    setLoading(true);
    const codePrompt =
      messages[messages?.length - 1].content + " " + Prompt.CODE_GEN_PROMPT;
    await axios
      .post("/api/ai-code", {
        prompt: codePrompt,
      })
      .then(async (result) => {
        const data = result.data.fileData;
        const mergedFiles = { ...Lookup.DEFAULT_FILE, ...data?.files };
        setFiles(mergedFiles);
        await updateFiles({
          workspaceId: id as Id<"workspace">,
          files: data.files,
        });
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
    // console.log(result);
    // if (result.data.error) {
    //   setLoading(false);
    //   return;
    // }
    // setLoading(false);
  };

  const handleStatusChange = (status: string) => {
    const button = document.getElementById(status);
    if (!button) return;
    const dimensions = button?.getBoundingClientRect();
    const parentDim = button?.offsetParent?.getBoundingClientRect();
    if (!parentDim || !dimensions) return;
    const leftPercent = dimensions?.left - parentDim?.left;
    setCircleStyle({
      ...circleStyle,
      left: leftPercent,
      width: dimensions.width + "px",
    });
    setActiveTab(status as status);
  };
  return (
    <div className="relative">
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
            <SandpackPreviewClient />
          )}
        </SandpackLayout>
      </SandpackProvider>
      {loading && (
        <div className="absolute w-full h-full p-10 bg-gray-800/80 top-0 left-0 flex items-center justify-center">
          <Loader2Icon className="w-10 h-10 animate-spin" />
          <h2>Generating Your Code...</h2>
        </div>
      )}
    </div>
  );
};

export default CodeView;
