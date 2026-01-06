import React from "react";
import BlurText from "../../components/BlurText";
import { VscGithubInverted } from "react-icons/vsc";

import { BsDiscord } from "react-icons/bs";
import { MdAttachEmail } from "react-icons/md";

import { FaLinkedinIn } from "react-icons/fa";

const Homes = () => {
  return (
    <section className="w-full flex gap-1 items-center justify-center mt-15 px-4">
      <main className="w-full max-w-270 h-auto bg-black  rounded-[45px] shadow-[38px_53px_86px_-42px_rgba(255,255,255,0.06),inset_22px_27px_128px_-46px_rgba(255,255,255,0.16)] sm:p-15">
        <div className="flex gap-15 flex-col lg:flex-row">
          <div className="lg:w-1/2 w-full ">
            <img
              src="/lg1.png"
              alt="Jatin Singh"
              className=" h-full  bg-black object-center object-cover " // Adjust size as necessary
            />
          </div>
          <div className="lg:w-1/2 w-full scale-[0.9] sm:scale-[1]">
            <div className="flex justify-center items-center h-30 mt-10 w-full text-center">
              {" "}
              {/* Added this wrapper */}
              <BlurText
                delay={250}
                text="Hi! It's me Jatin Singh"
                className="text-4xl w-full font-sans font-semibold text-center justify-center"
              />

            </div>
            <h2 className="text-[18px] text-zinc-300 self-center text-center">
              Frontend Developer • UI/UX Designer • Freelancer
            </h2>

            <p className=" text-center mt-4 ">
              Frontend developer crafting minimal, black-themed web experiences.
              Experience in UI/UX Design and backend too.
            </p>


            <div className="flex gap-3 mt-6 text-lg w-full justify-center">
              <a
                href="https://github.com/yourusername"
                target="_blank"
                className="flex p-3 w-12 bg-black justify-center items-center gap-3 transition duration-300 ease-in-out shadow-[5px_5px_10px_-5px_rgb(255,255,255,0.2),inset_5px_5px_10px_-3px_rgb(255,255,255,0.2)] hover:shadow-[5px_5px_10px_-4px_rgb(255,255,255,0.2),inset_5px_5px_10px_2px_rgb(255,255,255,0.2)] rounded-full"
              >
                <VscGithubInverted />
              </a>
              <a
                href="https://discord.com/users/yourusername"
                target="_blank"
                className="flex p-3 w-12 bg-black justify-center items-center gap-3 transition duration-300 ease-in-out shadow-[5px_5px_10px_-5px_rgb(255,255,255,0.2),inset_5px_5px_10px_-3px_rgb(255,255,255,0.2)] hover:shadow-[5px_5px_10px_-4px_rgb(255,255,255,0.2),inset_5px_5px_10px_2px_rgb(255,255,255,0.2)] rounded-full"
              >
                <BsDiscord />
              </a>

              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                className="flex p-3 w-12 bg-black justify-center items-center gap-3 transition duration-300 ease-in-out shadow-[5px_5px_10px_-5px_rgb(255,255,255,0.2),inset_5px_5px_10px_-3px_rgb(255,255,255,0.2)] hover:shadow-[5px_5px_10px_-4px_rgb(255,255,255,0.2),inset_5px_5px_10px_2px_rgb(255,255,255,0.2)] rounded-full"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="mailto:youremail@gmail.com"
                className="flex p-3 w-12 bg-black justify-center items-center gap-3 transition duration-300 ease-in-out shadow-[5px_5px_10px_-5px_rgb(255,255,255,0.2),inset_5px_5px_10px_-3px_rgb(255,255,255,0.2)] hover:shadow-[5px_5px_10px_-4px_rgb(255,255,255,0.2),inset_5px_5px_10px_2px_rgb(255,255,255,0.2)] rounded-full"
              >
                {" "}
                <MdAttachEmail />
              </a>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-18 w-full justify-center scale-[0.9] sm:scale-[1]">
          <a
            href="#projects"
            className="px-12 py-4 text-nowrap flex justify-center items-center
            bg-black text-white rounded-3xl hover:bg-gray-800 shadow-[20px_10px_37px_-20px_rgba(255,255,255,0.38),inset_0px_10px_49px_0px_rgba(255,255,255,0.1)] transition-shadow duration-[300ms] hover:shadow-[20px_10px_37px_-18px_rgba(255,255,255,0.38),inset_0px_10px_49px_7px_rgba(255,255,255,0.66)]"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-12 py-4  text-nowrap flex justify-center items-center rounded-3xl shadow-[20px_10px_37px_-20px_rgba(255,255,255,0.33),inset_0px_10px_49px_-6px_rgba(255,255,255,0.1)] transition-shadow duration-[300ms] hover:shadow-[27px_16px_47px_-22px_rgba(255,255,255,0.43),inset_0px_10px_76px_-6px_rgba(255,255,255,0.1)] hover:text-white "
          >
            Contact Me
          </a>
        </div>
      </main>
    </section>
  );
};

export default Homes;
