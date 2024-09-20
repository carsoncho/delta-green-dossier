import type { Metadata } from "next";
import { Courier_Prime } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import { Toaster } from "./components/ui/toaster";
import Providers from "./providers";

const courierPrime = Courier_Prime({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Delta Green Agent Dossier",
  description: "Have a great night at the opera",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const classes = `${courierPrime.className}`;
  return (
    <html lang="en">
      <body className={classes}>
        <Providers>
          <Header />
          {children}
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
