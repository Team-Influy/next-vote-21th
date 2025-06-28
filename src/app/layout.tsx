import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./components/NavBar";
import ReactQueryProvider from "@/utils/reactQueryProvider";
import ClientReissueProvider from "@/app/components/ClientReissueProvider";
import React from "react";

export const metadata: Metadata = {
  title: "Next Vote",
  description: "Next Vote 21th by Team Influy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="box-border flex h-full min-h-dvh w-full min-w-[20rem] flex-1 justify-center pt-12 text-black sm:pt-16 lg:pt-20">
        <ReactQueryProvider>
          <ClientReissueProvider>
            <NavBar />
            {children}
          </ClientReissueProvider>

        </ReactQueryProvider>
      </body>
    </html>
  );
}
