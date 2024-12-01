import type { Metadata } from "next";
import "./globals.css";
import { Inter } from 'next/font/google'
import {Header} from "@/entities/Header/Header";
import {Providers} from "@/Providers/Providers";
import {Footer} from "@/entities/Footer/Footer";
import {Container} from "@/shared/Container/Container";

const inter = Inter({
    subsets: ['latin'],
    weight: ["400", "600"]
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
    <html lang="en" suppressHydrationWarning >
      <body className={inter.className} >
      <Providers>
          <Header />
          <Container className="content" >
              {children}
          </Container>
          <Footer />
      </Providers>
      </body>
    </html>
  );
}
