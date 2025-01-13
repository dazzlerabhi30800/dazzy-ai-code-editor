"use client";
import MessageContextProvider from "@/context/MessageContext";
import UserContextProvider from "@/context/UserContext";
import React from "react";
import ThemeProvider from "./provider";
import { childrenType } from "@/type";

const ContextProvider = ({ children }: childrenType) => {
  return (
    <MessageContextProvider>
      <UserContextProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </UserContextProvider>
    </MessageContextProvider>
  );
};

export default ContextProvider;
