import type { Metadata } from "next";
import localFont from "next/font/local";
import '../db/models'
import "./globals.css";
import Link from "next/link";
import {UserCartProvider} from '@/components/user/UserCartContext.tsx'

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <Link href={'/api/auth/signin'}>
        <button className='bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-2 px-4 rounded'>Войти</button>
      </Link>
      <Link href={'/api/auth/signout'}>
        <button className='bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-2 px-4 rounded'>Выйти из аккаунта</button>
      </Link>
      <UserCartProvider>
          {children}
      </UserCartProvider>
      </body>
    </html>
  );
}
