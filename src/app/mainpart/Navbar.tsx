import React from "react";

const Navbar = () => {
  return (
    <header className="w-full flex justify-center pt-3 px-4">
      <nav className="w-full max-w-120 h-17 bg-black rounded-full transition duration-300 ease-in-out hover:shadow-[15px_14px_40px_-7px_rgba(255,255,255,0.2),inset_-20px_-3px_40px_7px_rgba(255,255,255,0.1)]  select-none shadow-[15px_14px_40px_-7px_rgba(255,255,255,0.2),inset_0_3px_40px_-7px_rgba(255,255,255,0.2)]">
        <ul className="flex justify-center items-center h-full gap-6 text-[10px] sm:text-[16px]">
          <a href="/">Home</a>
          <a href="/projects">Projects</a>
          <a href="/experience">Experience</a>
          <a href="/contact">Contact</a>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
