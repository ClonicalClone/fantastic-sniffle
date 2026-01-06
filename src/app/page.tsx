"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import Navbar from "./mainpart/Navbar";
import Homes from "./mainpart/Home";

export default function Home() {
  return (
    <>
      <Navbar />
      <Homes />
    </>
  );
}
