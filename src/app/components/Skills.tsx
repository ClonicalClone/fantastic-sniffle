'use client'
import { BsArrowRightShort } from "react-icons/bs"; 
import React, { useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";

type CtrProps = {
  params: {
    name: string;
  };
};

const Ctr = ({ params }: CtrProps) => {
  return (
    <div
      className='pl-7 pr-7 pt-3 pb-3 bg-black rounded-2xl border-zinc-900 
                 text-zinc-800 border-1 hover:scale-105 !transition-all 
                 duration-500 hover:shadow-[0px_0px_100px_-15px_white,
                 inset_0px_0px_200px_-100px_white,inset_5px_5px_10px_0px_black,
                 -5px_-5px_10px_0px_rgb(220,220,220,0.2)]
                 hover:cursor-pointer hover:border-white hover:text-white 
                 transform-3d perspective-distant'
      data-aos="zoom-in"
      data-aos-duration="800"
    >
      {params.name}
    </div>
  );
};

const Skills = () => {
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <div 
      id="Skills" 
      className='md:pl-30 pt-50 md:pr-25 flex flex-col items-center gap-8 
                 justify-center text-center min-h-screen overflow-hidden 
                 md:justify-start md:items-start md:text-start'
    >
      <h1 className='text-3xl text-white' data-aos="fade-up">Skills</h1>
      <div className='w-50 h-1 bg-white rounded-full mb-15 -mt-5' data-aos="fade-right"></div>

      <h2 className='text-2xl font-semibold text-white text-center p-10 rounded-4xl 
                     shadow-[0px_0px_50px_-35px_white] bg-black'
          data-aos="zoom-in">
        Why Choose Me?
      </h2>

      <div className='text-lg leading-relaxed text-center md:pl-30 md:pr-30 
                    shadow-white md:p-20 pt-20 pb-20 p-7 rounded-4xl 
                    shadow-[0px_0px_50px_-35px_white]'>
        <h1 className='text-zinc-500 hover:text-white !transition-all duration-700 cursor-pointer p-3 leading-loose' data-aos="fade-up">
          I don&apos;t just build websites — I craft modern, aesthetic, and fully functional web apps tailored to your needs...
        </h1>
        <br /><br />
        <h1 className='text-zinc-500 hover:text-white !transition-all duration-700 cursor-pointer p-3 leading-loose' data-aos="fade-up" data-aos-delay="200">
          My promise: top-tier quality at the most affordable price, with unlimited revisions...
        </h1>
      </div>

      <p className='md:p-20 pt-20 pb-20 p-7 md:pl-30 md:pr-30 text-xl rounded-4xl leading-9 
                    shadow-[0px_15px_50px_-35px_white] shadow-white text-zinc-500 
                    hover:text-white !transition-all duration-700 cursor-pointer'
          data-aos="fade-up" data-aos-delay="300">
        In addition to those, I also specialize in Web App development, Copywriting, Typing, Video Editing, Security Advising, UI/UX Design, Logo Design, and more...
      </p>

      <div className='p-20 rounded-4xl shadow-[0px_0px_50px_-35px_white]'>
        <h1 className='text-zinc-500 hover:text-white !transition-all duration-700 cursor-pointer flex items-center'
            data-aos="fade-right">
          My Skills &nbsp;&nbsp;&nbsp; <BsArrowRightShort />
        </h1>
        <div className="box1 flex flex-wrap gap-4 mt-4 justify-center items-center sm:items-start sm:justify-start">
          <Ctr params={{name: "HTML"}} />
          <Ctr params={{name: "CSS"}} />
          <Ctr params={{name: "JavaScript"}} />
          <Ctr params={{name: "React"}} />
          <Ctr params={{name: "Vite"}} />
          <Ctr params={{name: "Next.js"}} />
          <Ctr params={{name: "Git"}} />
          <Ctr params={{name: "Github"}} />
          <Ctr params={{name: "Linux"}} />
          <Ctr params={{name: "Python"}} />
          <Ctr params={{name: "Typescript"}} />
          <Ctr params={{name: "Bash"}} />
        </div>

        <h1 className='mt-12 text-zinc-500 hover:text-white !transition-all duration-700 cursor-pointer flex items-center'
            data-aos="fade-right" data-aos-delay="200">
          Others &nbsp;&nbsp;&nbsp; <BsArrowRightShort />
        </h1>
        <div className="box1 flex flex-wrap gap-4 mt-4 justify-center items-center sm:items-start sm:justify-start">
          <Ctr params={{name: "Wix"}} />
          <Ctr params={{name: "Figma"}} />
          <Ctr params={{name: "SSR"}} />
          <Ctr params={{name: "Stripe Payment"}} />
          <Ctr params={{name: "Canva"}} />
          <Ctr params={{name: "Adobe InDesign"}} />
          <Ctr params={{name: "React Icons"}} />
          <Ctr params={{name: "Remix Icons"}} />
        </div>

        <h1 className='mt-12 text-zinc-500 hover:text-white !transition-all duration-700 cursor-pointer flex items-center'
            data-aos="fade-right" data-aos-delay="400">
          AI Tools I use &nbsp;&nbsp;&nbsp; <BsArrowRightShort />
        </h1>
        <div className="box1 flex flex-wrap gap-4 mt-4 justify-center items-center sm:items-start sm:justify-start">
          <Ctr params={{name: "ChatGPT"}} />
          <Ctr params={{name: "Gemini"}} />
          <Ctr params={{name: "Claude"}} />
          <Ctr params={{name: "Copilot"}} />
          <Ctr params={{name: "Replit"}} />
          <Ctr params={{name: "Bolt.new"}} />
          <Ctr params={{name: "Lovable AI"}} />
          <Ctr params={{name: "Llama"}} />
          <Ctr params={{name: "Gamma Ai"}} />
          <Ctr params={{name: "DeepSeek"}} />
          <Ctr params={{name: "Perplexity"}} />
          <Ctr params={{name: "Midjourney"}} />
          <Ctr params={{name: "Leonardo AI"}} />
          <Ctr params={{name: "Runway"}} />
          <Ctr params={{name: "Writesonic"}} />
        </div>
      </div>
    </div>
  );
};

export default Skills;
