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
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";
import { useActionContext } from "@/context/ActionContext";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";

export default function ThemeProvider({
  children,
}: React.ComponentProps<typeof NextThemesProvider>) {
  const convex = useConvex();
  const { setUserDetail } = useUserContext();
  const { setShowLoader, showLoader } = useActionContext();
  const router = useRouter();

  const isAuthenticated = async () => {
    setShowLoader(true);
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user?.email) {
      router.push("/");
      setShowLoader(false);
      return;
    }
    const result = await convex.query(api.users.getUser, {
      email: user?.email,
    });
    setUserDetail({ ...result, token: result.token ?? 0 });
    setShowLoader(false);
    toast.info(`Welcome Back ${result.name}`);
  };
  React.useEffect(() => {
    isAuthenticated();
  }, []);
  if (showLoader)
    return (
      <div className="h-full absolute top-0 left-0 w-full flex justify-center items-center">
        <Loader2Icon className="animate-spin w-10 h-10 mr-2" />
        fetching User...
      </div>
    );
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
