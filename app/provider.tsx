"use client";
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import MessageContextProvider from "@/context/MessageContext";
import UserContextProvider from "@/context/UserContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_KEY!}>
      <UserContextProvider>
        <MessageContextProvider>
          <NextThemesProvider {...props}>{children}</NextThemesProvider>
        </MessageContextProvider>
      </UserContextProvider>
    </GoogleOAuthProvider>
  );
}
