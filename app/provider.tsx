"use client";
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useUserContext } from "@/context/UserContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/custom/AppSidebar";
import Header from "@/components/custom/Header";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function ThemeProvider({
  children,
}: React.ComponentProps<typeof NextThemesProvider>) {
  const convex = useConvex();
  const { setUserDetail } = useUserContext();

  const isAuthenticated = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.email) {
      const result = await convex.query(api.users.getUser, {
        email: user?.email,
      });
      setUserDetail(result as any);
      return;
    }
    return;
    // }
    // if (typeof window !== undefined) {
  };
  React.useEffect(() => {
    isAuthenticated();
  }, []);
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_KEY!}>
      <PayPalScriptProvider
        options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID! }}
      >
        <NextThemesProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <SidebarProvider defaultOpen={true}>
            <AppSidebar />
            {children}
          </SidebarProvider>
        </NextThemesProvider>
      </PayPalScriptProvider>
    </GoogleOAuthProvider>
  );
}
