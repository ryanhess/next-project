import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function Dog() {
  const [num, setNum] = useState(0)
  function onClick() {
    setNum(num + 1)
  }
  return <div><button onClick={onClick}>increment</button>{num}</div>
}

export default function Home() {
  return (
    <Dog></Dog>
  );
}
