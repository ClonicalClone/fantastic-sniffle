'use client'
import React, { useEffect } from 'react';
import Projectcard from './Projectcard';
import AOS from "aos";
import "aos/dist/aos.css";

const Project = () => {
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 900,
      easing: "ease-in-out",
      once: true,
    });

    const handleBeforeUnload = (event: { preventDefault: () => void; returnValue: string }) => {
      event.preventDefault();
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <section
      id="Projects"
      className="md:pl-30 md:pt-50 pt-20 width-screen 
                 justify-center items-center text-center 
                 md:text-left md:scale-100 scale-90 overflow-hidden"
      aria-labelledby="projects-heading"
    >
      {/* Section Heading */}
      <h1
        id="projects-heading"
        className="text-3xl font-bold"
        data-aos="fade-up"
      >
        Projects
      </h1>
      <div className="w-full flex justify-center items-center md:justify-start md:items-start">
        <div
          className="w-50 h-2 bg-white mt-3 rounded-full"
          data-aos="fade-right"
          aria-hidden="true"
        ></div>
      </div>

      {/* Projects List */}
      <div className="container gap-12 flex flex-col mt-15 overflow-hidden">
        {/* Project 1 */}
        <a
          href="https://github.com/ClonicalClone/SonavoOS.git"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View project Sonavo OS Landing Page on GitHub"
        >
          <div data-aos="zoom-in" data-aos-delay="200">
            <Projectcard
              srcimg="/w1.png"
              desc="A modern, responsive landing page for Sonavo OS - a revolutionary next-generation operating system. Built with React 18, Vite, and modern web development best practices."
              title="Sonavo OS — Landing Page"
            />
          </div>
        </a>

        {/* Project 2 */}
        <a
          href="https://github.com/ClonicalClone/ClonicalClonerr...git"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View project ClonicalClonerr Ecommerce Store on GitHub"
        >
          <div data-aos="zoom-in" data-aos-delay="400">
            <Projectcard
              srcimg="/w2.png"
              desc="An almost production-ready Next.js ecommerce store with Clerk authentication and Stripe payments. Built using TailwindCSS, Lenis, and DaisyUI."
              title="ClonicalClonerr — Ecommerce Store"
            />
          </div>
        </a>

        {/* Project 3 */}
        <a
          href="#"
          aria-label="View my Portfolio project details"
        >
          <div data-aos="zoom-in" data-aos-delay="600">
            <Projectcard
              srcimg="/w3.png"
              desc="A portfolio website developed to present my skills. Built using TailwindCSS, Lenis, GSAP, AOS, Next.js, and Anime.js for enhanced interactivity and smooth animations."
              title="ClonicalClone — My Portfolio"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Project;
