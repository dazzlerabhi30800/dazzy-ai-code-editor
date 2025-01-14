import { arrayMsg, message, useMessageContext } from "@/context/MessageContext";
import { useUserContext } from "@/context/UserContext";
import { api } from "@/convex/_generated/api";
import Lookup from "@/data/Lookup";
import { useConvex, useMutation } from "convex/react";
import { ArrowRight, Link, Loader2Icon } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import Prompt from "@/data/Prompt";
import ReactMarkdown from 'react-markdown';

const ChatView = () => {
  const { id } = useParams();
  const convex = useConvex();
  const updateWorkspace = useMutation(api.workspace.updateWorkspace);
  const { messages, setMessages } = useMessageContext();
  const { userDetail } = useUserContext();
  const [userInput, setUserInput] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // NOTE: get data using workspace id
  const getWorkspaceData = async (id: string) => {
    const result = await convex.query(api.workspace.getWorkspace, {
      workspaceId: id as any,
    });
    setMessages(result?.messages);
  };

  // NOTE: get data from prompt
  const getApiResponse = async () => {
    setLoading(true);
    const aiPrompt = JSON.stringify(messages) + Prompt.CHAT_PROMPT;
    const result = await axios.post("/api/ai-chat", {
      prompt: aiPrompt,
    });
    const aiResult = result.data.result;
    setMessages((prev: arrayMsg) => [
      ...prev,
      { role: "ai", content: result.data.result },
    ]);
    await updateWorkspace({
      messages: [...messages, aiResult],
      workspaceId: id as any,
    });
    setLoading(false);
  };

  // NOTE: generate more repsonses
  const onGenerate = (input: string) => {
    if (input.length < 5) return;
    setMessages((prev: arrayMsg) => [
      ...prev,
      {
        role: "user",
        content: input,
      },
    ]);
    setUserInput('');
  };

  useEffect(() => {
    id && getWorkspaceData(id as string);
  }, []);

  useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages.length - 1].role;
      if (role === "user") {
        getApiResponse();
      }
    }
  }, [messages]);
  // console.log(messages);

  return (
    <div className="relative flex flex-col h-[85vh]">
      <div className="flex-1 scrollbar-hide overflow-y-auto">
        {messages?.map((message: message, index: number) => (
          <div
            key={index}
            className="flex items-center gap-2 bg-chatBg p-3 rounded-lg mb-2 text-sm leading-6"
          >
            {message.role === "user" && (
              <Image
                src={userDetail?.picture as string}
                alt={userDetail?.name as string}
                width={35}
                className="rounded-[50%]"
                height={35}
              />
            )}
            <ReactMarkdown className="flex flex-col">{message.content}</ReactMarkdown>
          </div>
        ))}
        {loading && (
          <div className="bg-chatBg flex items-center gap-2 bg-chatBg p-3 rounded-lg mb-2">
            <Loader2Icon className="animate-spin" />
            <h2>Generating Response...</h2>
          </div>
        )}
      </div>
      {/* NOTE: Input Section */}
      <div className="border p-5 rounded-xl w-full my-8 bg-customBackground">
        <div className="flex gap-2">
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder={Lookup.INPUT_PLACEHOLDER}
            className="bg-transparent outline-none text-sm w-full h-32 max-h-56 resize-none"
          />
          {userInput && (
            <Button
              onClick={() => onGenerate(userInput)}
              className="bg-blue-500 p-2 h-8 w-8 rounded-md text-white hover:bg-blue-400"
            >
              <ArrowRight />
            </Button>
          )}
        </div>
        <div>
          <Link className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default ChatView;