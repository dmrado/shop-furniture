import React from "react"
import type {Metadata} from "next"
import localFont from "next/font/local"
import '../db/models'
import "./globals.css"
import Link from "next/link"
import {CartProvider} from '@/components/cart/CartContext'
import Header from "@/components/site/Header"

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
       <CartProvider>
            <Header/>
            <main className="pt-[137px] ">
                {children}
            </main>
        </CartProvider>
        </body>
        </html>
    )
}
