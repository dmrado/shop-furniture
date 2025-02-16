import React from "react"
import type {Metadata} from "next"
import localFont from "next/font/local"
import '../db/models'
import "./globals.css"
import {CartProvider} from '@/components/cart/CartContext'
import Header from "@/components/site/Header"
import Script from "next/script";
import {ToastContainer} from "react-toastify";
import {getServerSession} from "next-auth";
import {isSessionExpired} from "@/actions/isSessionExpired";
import {redirect} from "next/navigation";

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
        <Script
            src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_CLIENT_KEY}`}
                strategy="beforeInteractive"
                />
       <CartProvider>
            <Header/>
           <ToastContainer />
            <main className="pt-[137px] ">
                {children}
            </main>
        </CartProvider>
        </body>
        </html>
    )
}
