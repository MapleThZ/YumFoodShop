'use client';

import { Poppins } from "next/font/google";
import "./globals.css";
import Image from 'next/image';
import MenuList from '../components/MenuList';
import Content from '../components/Content'
import React, { useState, useEffect } from 'react';

const fontpoppins = Poppins({
  weight: "200",
  subsets: ["latin"],
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [menuKey, setMenuKey] = useState('');

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
            <MenuList setMenuKey={setMenuKey} />
          </div>
          <div className="contextItem" style={{ height: '600px' }}>
            <Content menuKey={menuKey} />
          </div>
        </div>
      </body>
    </html>
  );
}
