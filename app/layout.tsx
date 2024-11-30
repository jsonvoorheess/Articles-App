import type { Metadata } from "next";
import "./globals.css";
import { Inter } from 'next/font/google'
import {Header} from "@/entities/Header/Header";

const inter = Inter({
    subsets: ['latin'],
    weight: ["400"]
})

export const metadata: Metadata = {
  title: "The blog",
  description: "Прочитай известные блоги",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} >
      <Header />
        {children}
      </body>
    </html>
  );
}
