'use client'
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import "../globals.css";

// ✅ Dynamically import only the icons you need
const HiMenuAlt1 = dynamic(() =>
  import("react-icons/hi").then((mod) => mod.HiMenuAlt1)
);
const CgClose = dynamic(() =>
  import("react-icons/cg").then((mod) => mod.CgClose)
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <header
      className="w-full shadow-white navbar py-6 bg-[rgba(0,0,0,0.55)] 
                 sticky top-0 z-50 backdrop-blur-2xl"
    >
      <nav className="flex items-center justify-around w-full">
        {/* Logo */}
        <h1 className="text-[1.7rem] font-semibold cursor-pointer">
          ClonicalClone
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-16">
          {["Home", "About", "Projects", "Skills", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="hover:text-zinc-300 hover:scale-105 transition-all duration-200"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Mobile Icon (only hamburger here) */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="focus:outline-none"
            aria-label="Open menu"
          >
            <HiMenuAlt1 size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu with Framer Motion */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 50 }}
            className="fixed top-0 left-0 w-screen h-screen bg-black 
                       flex flex-col items-center justify-center 
                       text-[3vh] gap-[5vh] z-50" // ⬅ bumped to z-50
          >
            {/* Close Button inside overlay */}
            <button
              onClick={toggleMenu}
              className="absolute top-6 right-6 focus:outline-none"
              aria-label="Close menu"
            >
              <CgClose size={32} />
            </button>

            {["Home", "About", "Projects", "Skills", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                onClick={() => setIsOpen(false)} // Close on link click
                className="hover:text-white transition-all duration-200"
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
