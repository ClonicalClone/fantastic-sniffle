'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';

import Navbar from "../app/components/Navbar";
import Homes from "../app/components/Home";
import Project from "../app/components/Project";
import About from "../app/components/About";
import Skills from "../app/components/Skills";
import Contacts from "../app/components/Contacts";
import Cursor from "../app/components/Cursor";
import Cursor2 from "../app/components/Cursor2";




export default function Home() {
  const cursor2Ref = useRef(null);

  useEffect(() => {
    const cursor1 = document.getElementById("cursor");
    const cursor2 = cursor2Ref.current;

    if (!cursor1 || !cursor2) return;

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos1 = { ...mouse };
    const pos2 = { ...mouse };

    const speed1 = 0.2; // cursor1 speed
    const speed2 = 0.28; // cursor2 speed

    // ticker only updates position
    const update = () => {
      // Cursor1
      pos1.x += (mouse.x - pos1.x) * speed1;
      pos1.y += (mouse.y - pos1.y) * speed1;
      gsap.set(cursor1, { x: pos1.x, y: pos1.y });

      // Cursor2
      pos2.x += (mouse.x - pos2.x) * speed2;
      pos2.y += (mouse.y - pos2.y) * speed2;
      gsap.set(cursor2, { x: pos2.x, y: pos2.y });
    };
    gsap.ticker.add(update);

    // Mouse move
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Hover effect with **smooth GSAP animation**
    const handleHover = (e: MouseEvent) => {
      const target = (e.target as Element)?.closest("a, button,[data-cursor-hover]");
      if (target) {
        gsap.to(cursor2, { scale: 1.75, duration: 0.2, ease: "power2.out" });
      } else {
        gsap.to(cursor2, { scale: 1, duration: 0.2, ease: "power2.out" });
      }
    };
    document.addEventListener("mouseover", handleHover);

    // Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.5,
      easing: t => 1 - Math.pow(1 - t, 4),
      touchMultiplier: 1.5,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleHover);
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Navbar />
      <div
        id="lenis-root"
        className="relative bg-black text-white flex flex-col items-center justify-center min-h-screen w-full overflow-x-hidden"
      >
        <div
          className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.5)_1px,transparent_1px)] bg-[size:40px_40px]"
          style={{ opacity: 0.03 }}
        ></div>

        <div className="relative z-10 w-full">
          <Cursor />
          <Cursor2 ref={cursor2Ref} />
          <Homes />
          <About />
          <Project />
          <Skills />
          <Contacts />
        </div>
      </div>
    </>
  );
}
