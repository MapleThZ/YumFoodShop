'use client';

import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Image from 'next/image';

import styles from '../components/Menu.module.css';
import Link from "next/link";
import { useState } from "react";

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

  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setIsOpen1(false);
    setIsOpen2(false);
  };
  const toggleDropdown1 = () => {
    setIsOpen(false);
    setIsOpen1(!isOpen1);
    setIsOpen2(false);
  };
  const toggleDropdown2 = () => {
    setIsOpen(false);
    setIsOpen1(false);
    setIsOpen2(!isOpen2);
  };

  var Menu = (
    <nav className={styles.navbar}>
      <ul className={styles.ulmargin}>
        <li>
          <Link href="/" onClick={toggleDropdown}>
            <label className={styles.link}>Home</label>
          </Link>
        </li>
        {isOpen &&
          <li className={styles.menuItem}>
            <Link href="/">
              <label className={styles.link}>Home 11</label>
            </Link>
          </li>
        }
      </ul>
      <ul className={styles.ulmargin}>
        <li>
          <Link href="/" onClick={toggleDropdown1}>
            <label className={styles.link}>Home 2</label>
          </Link>
        </li>

        {isOpen1 &&
          <li className={styles.menuItem}>
            <Link href="/">
              <label className={styles.link}>Home 21</label>
            </Link>
          </li>
        }
      </ul>
      <ul className={styles.ulmargin}>
        <li>
          <Link href="/" onClick={toggleDropdown2}>
            <label className={styles.link}>Home 3</label>
          </Link>
        </li>

        {isOpen2 &&
          <li className={styles.menuItem}>
            <Link href="/">
              <label className={styles.link}>Home 31</label>
            </Link>
          </li>
        }
        {isOpen2 &&
          <li className={styles.menuItem}>
            <Link href="/">
              <label className={styles.link}>Home 32</label>
            </Link>
          </li>
        }
      </ul>
    </nav >
  );

  return (
    <html lang="en">
      <header>
        <Image src="/images/banner.jpg"
          alt="A description of the image"
          width={1000}
          height={200}
          layout="responsive"
          style={{ height: '10%', width: '100%', maxHeight: '150px' }}
        />
      </header>
      <body className={`${fontpoppins.className} antialiased`}>
        <div>
          <div>
            {Menu}
          </div>
          <div className="context">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
