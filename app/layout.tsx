import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "./ConvexProvider";
import ContextProvider from "./ContextProvider";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dazzy - AI Coder",
  description:
    "Created by Abhishek Choudhary, this is an app that can be used to generate/create an app based on the user prompt.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`} suppressHydrationWarning={true}>
        <Toaster />
        <ConvexClientProvider>
          <ContextProvider>{children}</ContextProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
