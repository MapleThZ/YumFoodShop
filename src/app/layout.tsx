'use client';

import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Image from 'next/image';

import styles from '../components/Menu.module.css';
import Link from "next/link";
import { useState } from "react";
import List from '../components/List';
import Head from "next/head";

const fontpoppins = Poppins({
  weight: "200",
  subsets: ["latin"],
});

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={`${fontpoppins.className} antialiased`}>
        <Image src="/images/banner.jpg"
          alt="A description of the image"
          width={1000}
          height={200}
          layout="responsive"
          style={{ height: '10%', width: '100%', maxHeight: '150px' }}
        />
        <div className="context">
          <div className="contextItem">
            <List />
          </div>
          <div className="contextItem">
            {children}
          </div>
        </div>
      </body>

      {/* <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

      </footer> */}
    </html>
  );
}
