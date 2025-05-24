import localFont from "next/font/local";
import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./components/NavBar";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

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
      <body className={`${pretendard.className} pt-12 sm:pt-16 lg:pt-20`}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
