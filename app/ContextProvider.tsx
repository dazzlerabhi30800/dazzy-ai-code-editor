"use client";
import MessageContextProvider from "@/context/MessageContext";
import UserContextProvider from "@/context/UserContext";
import React, { useEffect, useState } from "react";
import ThemeProvider from "./provider";
import { childrenType } from "@/type";
import ActionContextProvider from "@/context/ActionContext";

const ContextProvider = ({ children }: childrenType) => {
  const [client, setClient] = useState(false);
  useEffect(() => {
    setClient(true);
  }, []);
  if (!client) return <div>Loading...</div>;
  return (
    <MessageContextProvider>
      <UserContextProvider>
        <ActionContextProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </ActionContextProvider>
      </UserContextProvider>
    </MessageContextProvider>
  );
};

export default ContextProvider;
