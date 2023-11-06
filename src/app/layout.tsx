import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex min-h-screen flex-col items-center gap-10 justify-start">
          {children}
          <div className="-z-10 h-full absolute w-full bg-gradient-radial from-slate-300 via-indigo-300 via-20% to-transparent opacity-20" />
        </main>
      </body>
    </html>
  );
}
