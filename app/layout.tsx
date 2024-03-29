import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextUiProvider } from "@/provider/next-ui-provider";
import { Toaster } from "react-hot-toast";
import { StoreProvider } from "@/store/StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Invoice generator",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={inter.className}>
          <NextUiProvider>
            <Toaster position="top-center" />
            {children}
          </NextUiProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
