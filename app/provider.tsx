"use client";
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useUserContext } from "@/context/UserContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const convex = useConvex();
  const { setUserDetail, userDetail } = useUserContext();

  const isAuthenticated = async () => {
    if (typeof window !== undefined) {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const result = await convex.query(api.users.getUser, {
        email: user?.email,
      });
      setUserDetail(result);
    }
  };
  React.useEffect(() => {
    isAuthenticated();
  }, []);
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_KEY!}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </NextThemesProvider>
    </GoogleOAuthProvider>
  );
}
