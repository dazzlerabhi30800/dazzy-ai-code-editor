import React, { createContext, ReactNode, useState } from "react";

type msgContext = {
  messages: Array<string> | any,
  setMessages: React.Dispatch<React.SetStateAction<any>>,
}
type children = {
  children: ReactNode,
}

export const messageContext = createContext<msgContext>({
  messages: "",
  setMessages: () => void,
});

export default const MessageContextProvider = ({children}: children)  => {
  const [messages, setMessages] = useState();
  return (
  <messageContext.Provider value={{messages, setMessages}}>
      {children}
    </messageContext.Provider>
  )
}
