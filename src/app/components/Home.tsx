"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { BsGithub, BsDiscord, BsWikipedia, BsYoutube } from "react-icons/bs";
import Typewriter from "typewriter-effect";
import Image from "next/image";
import "../globals.css";

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true, // animates only once
    });
  }, []);

  return (
    <div
      id="Home"
      className="w-full mt-10 flex justify-center items-center z-0 max-lg:items-center max-lg:justify-center"
    >
      <main
        className="flex w-[87%] overflow-hidden rounded-[60px] bg-black gap-2 
                   bg-opacity-60 backdrop-blur-md flex-col z-1 min-lg:h-120 h-170"
        data-aos="fade-up"
      >
        <div
          className="size-full flex bg-transparent rounded-[60px] 
                     md:shadow-[inset_69px_-69px_1004px_-250px_rgb(255,255,255),_inset_-69px_-69px_1004px_-290px_rgb(255,255,255),_inset_69px_69px_1004px_-300px_rgb(255,255,255)] 
                     [@media(min-width:1500px)]:shadow-none gap-2 z-2 
                     bg-opacity-60 backdrop-blur-md flex-col min-lg:flex-row border-1 border-white"
          data-aos="zoom-in"
        >
          {/* LEFT SIDE TEXT */}
          <div
            className="min-lg:w-1/2 h-full justify-center flex max-lg:bg-black 
                       flex-col px-21 max-sm:p-0 max-lg:items-center max-lg:justify-center 
                       max-lg:text-center max-lg:order-2 mt-10 min-lg:mt-0"
            data-aos="fade-right"
          >
            <h2 className="text-3xl max-sm:text-xl max-sm:w-full">
              Hi, It&apos;s Me
            </h2>
            <h1 className="text-[50px] max-sm:text-3xl max-sm:w-full">
              Jatin Singh
            </h1>

            <h1
              className="flex gap-2 text-2xl max-sm:w-full max-sm:text-xl 
                         max-sm:text-center max-sm:justify-center max-sm:items-center"
            >
              I&apos;m a{" "}
              <Typewriter
                options={{
                  strings: [
                    "Web Developer",
                    "Web 3.0 Enthusiast",
                    "Crypto Enthusiast",
                    "Web App Developer",
                    "Content Writer",
                    "Copywriter",
                    "Video Editor",
                    "Security Advisor",
                    "UI/UX Designer",
                    "Vibe Coder",
                    "Logo Designer",
                    "Typer",
                  ],
                  autoStart: true,
                  loop: true,
                }}
              />
            </h1>

            <p
              className="!mt-6 p-2"
              data-aos="fade-up"
              data-aos-delay="200"
              aria-label="Short introduction about my services"
            >
              I build fast, modern, and fully custom websites or apps with clean
              design and unlimited revisions.
            </p>

            {/* Social Icons */}
            <div
              className="flex justify-center items-center text-[22px] border-1 
                         border-white p-3 rounded-full w-[210px] gap-6 !mt-6 !mb-4"
              data-aos="fade-up"
              data-aos-delay="300"
              aria-label="Social media links"
            >
              <a
                href="https://www.youtube.com/@ClonicalClone"
                title="YouTube"
                aria-label="Visit my YouTube channel"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsYoutube
                  className="hover:text-gray-300 !transition !duration-300 hover:scale-115"
                  aria-hidden="true"
                />
              </a>
              <a
                href="https://en.wikipedia.org/wiki/User:ClonicalClone"
                title="Wikipedia"
                aria-label="My Wikipedia profile"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsWikipedia
                  className="hover:text-gray-300 !transition !duration-300 hover:scale-115"
                  aria-hidden="true"
                />
              </a>
              <a
                href="https://discord.gg/FvBZfqy6Vg"
                title="Discord"
                aria-label="Join my Discord server"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsDiscord
                  className="hover:text-gray-300 !transition !duration-300 hover:scale-115"
                  aria-hidden="true"
                />
              </a>
              <a
                href="https://github.com/ClonicalClone"
                title="Github"
                aria-label="Visit my GitHub profile"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsGithub
                  className="hover:text-gray-300 !transition !duration-300 hover:scale-115"
                  aria-hidden="true"
                />
              </a>
            </div>

            {/* Hire Me Button */}
            <a
              className="w-70 bg-black p-3 border-1 border-white rounded-full 
                         border-l-2 border-r-2 bx1 !transition-all !duration-500 flex items-center justify-center text-center"
              href="#Contact"
              aria-label="Hire me section link"
              title="Hire Me"
            >
              Hire Me
            </a>
          </div>

          {/* RIGHT SIDE IMAGE */}
          <div
            className="min-lg:w-1/2 max-lg:bg-black border-l-[0.1px] border-[rgb(255,255,255,0.04)] 
                       h-full justify-center max-lg:items-center max-lg:justify-center  
                       max-lg:order-1 flex items-center flex-col overflow-hidden min-lg:rounded-[60px]"
            data-aos="fade-left"
          >
            <Image
              width={2000}
              height={2000}
              alt="Portfolio hero illustration"
              src="/n.png"
              className="scale-140 z-1"
              priority
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
