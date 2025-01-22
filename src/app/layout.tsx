import type { Metadata } from "next";
import localFont from "next/font/local";
import '../db/models/index.model'
import "./globals.css";
import Header from "@/components/site/Header";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Shop-furniture",
  description: "Main page furniture",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.warn('app.layout')
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased size-full relative`} // это body-wrapper нужен для меню навигации справа в режиме телефона
      >
      <div className="overflow-hidden max-w-full mx-auto"> {/*свойство overflow: hidden у контейнера нужно что бы боковое бургер-меню не вылезало*/}
          {/*<Header/>*/}
          {children}
      </div>

      </body>
    </html>
  );
}
