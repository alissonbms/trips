import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "@/providers/auth";
import Header from "../components/Header";
import Footer from "@/components/Footer";
import ToastProvider from "@/providers/toast";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Trips",
  description: "Travel booking system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <NextAuthProvider>
          <ToastProvider>
            <div className="flex flex-col h-screen">
              <div className="h-[94px]">
                <Header />
              </div>

              <div className="flex-1">{children}</div>
              <Footer />
            </div>
          </ToastProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
