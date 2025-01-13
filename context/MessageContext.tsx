import { children } from "@/type";
import React, { createContext, useState } from "react";

type message = {
  role: string;
  content: string;
};

type msgContext = {
  messages: Array<string> | any;
  setMessages: React.Dispatch<React.SetStateAction<message | undefined>>;
};

export const messageContext = createContext<msgContext>({
  messages: "",
  setMessages: () => {},
});

export default function MessageContextProvider({ children }: children) {
  const [messages, setMessages] = useState<undefined | message>();
  return (
    <messageContext.Provider value={{ messages, setMessages }}>
      {children}
    </messageContext.Provider>
  );
}
