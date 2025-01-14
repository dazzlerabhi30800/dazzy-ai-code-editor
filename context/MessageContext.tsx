import { childrenType } from "@/type";
import React, { createContext, useContext, useState } from "react";


export type message = {
  role: string;
  content: string;
};
export type arrayMsg = Array<message>;

type msgContext = {
  messages: message | any;
  setMessages: React.Dispatch<React.SetStateAction<message | undefined | any>>;
};

const MessageContext = createContext<msgContext | null>(null);

export default function MessageContextProvider({ children }: childrenType) {
  const [messages, setMessages] = useState<undefined | message>();
  return (
    <MessageContext.Provider value={{ messages, setMessages }}>
      {children}
    </MessageContext.Provider>
  );
}

export const useMessageContext = () => {
  const messageContext = useContext(MessageContext);
  if (!messageContext) {
    throw Error("context is not defined");
  }
  return messageContext;
};
