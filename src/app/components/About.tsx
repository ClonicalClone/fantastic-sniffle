"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation speed
      easing: "ease-in-out",
      once: true, // animate only once
    });
  }, []);

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="md:pl-30 pt-50 md:pr-25 flex flex-col items-center justify-center 
                 text-center min-h-screen overflow-hidden md:justify-start md:items-start md:text-start"
    >
      {/* Heading */}
      <header>
        <h1
          id="about-heading"
          className="text-3xl text-white"
          data-aos="fade-down"
        >
          About Me
        </h1>
        <div
          role="presentation"
          aria-hidden="true"
          className="w-50 h-1 bg-white mt-4 rounded-full mb-15"
          data-aos="fade-right"
        ></div>
      </header>

      {/* Container */}
      <div
        className="container flex flex-col gap-8 mt-10 text-gray-300 bg-black"
        data-aos="zoom-in"
      >
        <article
          aria-label="About Jatin Singh - frontend developer"
          className="leading-loose text-center md:p-20 pt-20 pb-20 p-7 w-full text-xl rounded-4xl shadow-[0px_-15px_50px_-35px_white] shadow-white"
        >
          <h2 className="text-3xl pb-20" data-aos="fade-up">
            Hello! It&apos;s me Jatin Singh,
          </h2>

          <p
            className="text-zinc-300 hover:text-white !transition-all !duration-700 cursor-pointer p-3"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            I&apos;m a passionate frontend developer who loves building all kinds
            of web applications. I strive to turn your imagination and ideas
            into fully functional digital realities.
          </p>

          <p
            className="mt-20 text-zinc-300 hover:text-white !transition-all !duration-700 cursor-pointer"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            I’m a self-taught developer with over 3 years of experience, working
            on part-time projects while continuously learning and building
            applications.
            <br />
            <br />
            It didn&apos;t start because I was forced, but because I was
            passionate and curious towards creating best quality code for
            everyone.
          </p>

          <p
            className="mt-10 rounded-4xl text-zinc-300 hover:text-white cursor-pointer hover:shadow-[0px_0px_110px_-60px_white] p-12 !transition-all !duration-700 border-l-2 border-b-2 border-white"
            data-aos="fade-up"
            data-aos-delay="300"
            aria-label="Experience working on projects"
          >
            I have worked on various projects, from simple websites to complex
            web applications, and I am always eager to learn new technologies
            and improve my skills.
          </p>

          <p
            className="mt-10 rounded-4xl text-zinc-300 hover:text-white cursor-pointer hover:shadow-[0px_0px_110px_-80px_white] p-13 !transition-all !duration-700 border-r-2 border-t-2 border-white"
            data-aos="fade-up"
            data-aos-delay="400"
            aria-label="Collaboration and design philosophy"
          >
            I believe in the power of collaboration and communication, and I am
            always open to feedback and suggestions.
            <br />
            <br />
            My goal is to create web applications that are both functional and
            beautifully designed.
          </p>

          <p
            className="mt-15 pt-7 rounded-4xl text-zinc-300 hover:text-white cursor-pointer hover:shadow-[0px_0px_110px_-80px_white] p-12 !transition-all !duration-700 border-l-2 border-r-2 border-white"
            data-aos="fade-up"
            data-aos-delay="500"
            aria-label="Invitation to connect"
          >
            If you have a project in mind or just want to chat about web
            development,
            <br /> feel free to reach out!
            <br />
            <br />
            Even if just for a small random talk.
          </p>
        </article>
      </div>
    </section>
  );
};

export default About;
