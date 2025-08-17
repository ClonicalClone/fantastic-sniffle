'use client';

import { useEffect, useRef, useState } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";

import { BsLinkedin, BsDiscord, BsGithub, BsWikipedia } from "react-icons/bs";
import { SiGmail } from "react-icons/si";
import { TbBrandFiverr } from "react-icons/tb";
import ReCAPTCHA from 'react-google-recaptcha';

const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

const Contacts = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const invisibleRef = useRef<ReCAPTCHA | null>(null);
  const [loading, setLoading] = useState(false);

  const SendMessage = async () => {
    const nameInput = document.querySelector('input[placeholder="Name"]') as HTMLInputElement | null;
    const emailInput = document.querySelector('input[placeholder="Email"]') as HTMLInputElement | null;
    const messageTextarea = document.querySelector('textarea[placeholder="Message"]') as HTMLTextAreaElement | null;

    const name = nameInput?.value || "";
    const email = emailInput?.value || "";
    const message = messageTextarea?.value || "";

    if (!name || !email || !message) {
      alert("Please fill in all fields");
      return;
    }

    let token;
    try {
      if (invisibleRef.current) {
        token = await invisibleRef.current.executeAsync();
        invisibleRef.current.reset();
        console.log("reCAPTCHA token obtained");
      }
    } catch (err) {
      console.error("Invisible reCAPTCHA failed:", err);
      alert("reCAPTCHA verification failed.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ name, email, message, token })
      });

      // Check if the response is ok before trying to parse JSON
      if (!res.ok) {
        console.error("Response not ok:", res.status, res.statusText);

        // Try to get error details
        let errorMessage = "Something went wrong";
        try {
          const errorText = await res.text();
          console.error("Error response:", errorText);

          // Try to parse as JSON if possible
          try {
            const errorData = JSON.parse(errorText);
            errorMessage = errorData.error || errorMessage;
          } catch {
            // If it's HTML (404 page), show a more helpful message
            if (errorText.includes("404") || errorText.includes("This page could not be found")) {
              errorMessage = "Email service is not available. Please try again later or contact directly via email.";
            }
          }
        } catch {
          errorMessage = `Server error (${res.status})`;
        }

        alert("❌ " + errorMessage);
        return;
      }

      const result = await res.json();
      console.log("Success:", result);
      alert("✅ Message sent successfully!");

      // Clear the form
      const nameField = document.querySelector('input[placeholder="Name"]') as HTMLInputElement | null;
      if (nameField) nameField.value = "";
      const emailField = document.querySelector('input[placeholder="Email"]') as HTMLInputElement | null;
      if (emailField) emailField.value = "";
      const messageField = document.querySelector('textarea[placeholder="Message"]') as HTMLTextAreaElement | null;
      if (messageField) messageField.value = "";

    } catch (error) {
      console.error("Client error:", error);
      if (error instanceof Error && error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        alert("❌ Network error. Please check your connection and try again.");
      } else {
        alert("❌ Something went wrong. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div id="Contact" className='md:pl-30 md:pt-50 pt-20 w-full h-400 justify-center text-center md:text-left '>
        <h1 className='text-3xl' data-aos="fade-down">Contacts</h1>
        <div className='w-full flex justify-center items-center md:justify-start md:items-start mb-20' data-aos="fade-right">
          <div className='w-50 h-2 bg-white mt-3 rounded-full'></div>
        </div>

        <section id="contact" className="min-h-screen flex flex-col justify-center w-full items-center ">
          <h2 className="text-4xl mb-8 font-bold" data-aos="zoom-in">Let&apos;s Build Something Great</h2>
          <p className="text-zinc-400 mb-12" data-aos="fade-up">Have a project in mind or just want to chat?</p>

          <div className="flex flex-col lg:flex-row justify-center md:gap-30 w-full items-center pt-20">
            {/* Contact Form */}
            <section className="flex gap-6 flex-col lg:w-1/2 items-center w-full h-200" data-aos="fade-right">
              <h1 className="text-3xl">Message Me:</h1>
              <div className="flex flex-col justify-center px-5 gap-6">
                <input type="text" placeholder="Name" className="p-3 rounded-md w-full bg-zinc-950 text-white shadow-[0px_0px_100px_-20px_white] transition-all duration-1500 hover:ring-white" data-aos="fade-up" />
                <input type="email" placeholder="Email" className="p-3 rounded-md w-full bg-zinc-950 text-white shadow-[0px_0px_40px_-25px_white] transition-all duration-1500 hover:ring-white" data-aos="fade-up" data-aos-delay="100" />
                <textarea placeholder="Message" className="p-4 rounded-md w-full bg-zinc-950 text-white h-32 !shadow-[400px_0px_300px_-35px_white,400px_-300px_300px_-35px_white,inset_-100px_70px_100px_-170px_white] transition-all duration-1500 hover:ring-white" data-aos="fade-up" data-aos-delay="200"></textarea>

                <ReCAPTCHA ref={invisibleRef} sitekey={siteKey} size="invisible" className="invisible" />

                <div className="ml-1 text-sm text-zinc-400" data-aos="fade-up" data-aos-delay="300">
                  This site is protected by reCAPTCHA and the Google
                  <a href="https://policies.google.com/privacy"> Privacy Policy</a> and
                  <a href="https://policies.google.com/terms"> Terms of Service</a> apply.
                </div>

                <button
                  className="bg-black text-white rounded-4xl px-2 py-4 text-xl border-1 border-white 
                             hover:scale-105 transition-all duration-600 
                             hover:shadow-[0px_0px_100px_-20px_white,inset_0px_0px_140px_white,0px_0px_50px_-10px_white]
                             hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={SendMessage}
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </div>
            </section>

            {/* Social Links */}
            <section className="flex gap-6 flex-col lg:w-1/2 h-200 w-full items-center" data-aos="fade-left">
              <h1 className="text-3xl">Social Links:</h1>
              <div className="flex flex-col justify-center px-5 gap-5">
                <a href="https://github.com/ClonicalClone" data-aos="fade-left" data-aos-delay="100"><div className="flex gap-5 px-5 py-3 border-1 border-white rounded-3xl w-70 items-center justify-center hover:scale-105 hover:shadow-[inset_0px_0px_140px_white,0px_0px_50px_-10px_white] hover:text-black transition-all duration-500"><BsGithub className="text-2xl" /><h1>Github</h1></div></a>
                <a href="https://en.wikipedia.org/wiki/User:ClonicalClone" data-aos="fade-left" data-aos-delay="200"><div className="flex gap-5 px-5 py-3 border-1 border-white rounded-3xl w-70 items-center justify-center hover:scale-105 hover:shadow-[inset_0px_0px_140px_white,0px_0px_50px_-10px_white] hover:text-black transition-all duration-500"><BsWikipedia className="text-2xl" /><h1>Wikipedia</h1></div></a>
                <a href="https://discord.gg/FvBZfqy6Vg" data-aos="fade-left" data-aos-delay="300"><div className="flex gap-5 px-5 py-3 border-1 border-white rounded-3xl w-70 items-center justify-center hover:scale-105 hover:shadow-[inset_0px_0px_140px_white,0px_0px_50px_-10px_white] hover:text-black transition-all duration-500"><BsDiscord className="text-2xl" /><h1>Discord</h1></div></a>
                <a href="https://www.fiverr.com/s/pdgxmbl" data-aos="fade-left" data-aos-delay="400"><div className="flex gap-5 px-5 py-3 border-1 border-white rounded-3xl w-70 items-center justify-center hover:scale-105 hover:shadow-[inset_0px_0px_140px_white,0px_0px_50px_-10px_white] hover:text-black transition-all duration-500"><TbBrandFiverr className="text-2xl" /><h1>Fiverr</h1></div></a>
                <a href="https://www.linkedin.com/in/jatin-singh-990703355/" data-aos="fade-left" data-aos-delay="500"><div className="flex gap-5 px-5 py-3 border-1 border-white rounded-3xl w-70 items-center justify-center hover:scale-105 hover:shadow-[inset_0px_0px_140px_white,0px_0px_50px_-10px_white] hover:text-black transition-all duration-500"><BsLinkedin className="text-2xl" /><h1>LinkedIn</h1></div></a>
                <a href="mailto:clonicalclone@gmail.com" data-aos="fade-left" data-aos-delay="600"><div className="flex gap-5 px-5 py-3 border-1 border-white rounded-3xl w-70 items-center justify-center hover:scale-105 hover:shadow-[inset_0px_0px_140px_white,0px_0px_50px_-10px_white] hover:text-black transition-all duration-500"><SiGmail className="text-2xl " /><h1>Email</h1></div></a>
              </div>
            </section>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contacts;