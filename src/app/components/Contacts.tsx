/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { BsLinkedin, BsDiscord, BsGithub } from 'react-icons/bs';
import { SiGmail } from 'react-icons/si';

import HCaptcha from "@hcaptcha/react-hcaptcha";


// TypeScript support for ALTCHA custom element


const Contacts = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    token: '',
  });

  

  // handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // on hCaptcha verify
  const handleCaptchaVerify = (token: string) => {
    setFormData((prev) => ({ ...prev, token })); // ✅ save token
  };

  // send message
  const SendMessage = async () => {
    const { name, email, message, token } = formData;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      alert("Please fill in all fields");
      return;
    }

    if (!token) {
      alert("Please complete the CAPTCHA challenge.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, token }),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(`❌ ${result.error || "Something went wrong"}`);
        return;
      }

      alert("✅ Message sent successfully!");
      setFormData({ name: "", email: "", message: "", token: "" });
    } catch (error) {
      console.error(error);
      alert("❌ Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  


  return (
    <div id="Contact" className="md:pl-30 md:pt-50 pt-20 w-full h-400 justify-center text-center md:text-left">
      <h1 className="text-3xl" data-aos="fade-down">
        Contacts
      </h1>
      <div className="w-full flex justify-center items-center md:justify-start md:items-start mb-20" data-aos="fade-right">
        <div className="w-50 h-2 bg-white mt-3 rounded-full"></div>
      </div>

      <section id="contact" className="min-h-screen flex flex-col justify-center w-full items-center">
        <h2 className="text-4xl mb-8 font-bold" data-aos="zoom-in">
          Let&#39;s Build Something Great
        </h2>
        <p className="text-zinc-400 mb-12" data-aos="fade-up">
          Have a project in mind or just want to chat?
        </p>

        <div className="flex flex-col lg:flex-row justify-center md:gap-30 w-full items-center pt-20">
          {/* Contact Form */}
          <section className="flex gap-6 flex-col lg:w-1/2 items-center w-full h-200" data-aos="fade-right">
            <h1 className="text-3xl">Message Me:</h1>
            <div className="flex flex-col justify-center px-5 gap-6">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                className="p-3 rounded-md w-full bg-zinc-950 text-white shadow-[0px_0px_100px_-20px_white] transition-all duration-1500 hover:ring-white"
                data-aos="fade-up"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="p-3 rounded-md w-full bg-zinc-950 text-white shadow-[0px_0px_40px_-25px_white] transition-all duration-1500 hover:ring-white"
                data-aos="fade-up"
                data-aos-delay="100"
              />
              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleInputChange}
                className="p-4 rounded-md w-full bg-zinc-950 text-white h-32 !shadow-[400px_0px_300px_-35px_white,400px_-300px_300px_-35px_white,inset_-100px_70px_100px_-170px_white] transition-all duration-1500 hover:ring-white"
                data-aos="fade-up"
                data-aos-delay="200"
              ></textarea>

              <HCaptcha
                sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY!}
                onVerify={handleCaptchaVerify}
                theme="dark"
              />


              <button
                className="bg-black text-white rounded-4xl px-2 py-4 text-xl border-1 border-white hover:scale-105 transition-all duration-600 hover:shadow-[0px_0px_100px_-20px_white,inset_0px_0px_140px_white,0px_0px_50px_-10px_white] hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={SendMessage}
                disabled={loading}
                type="button"
                aria-label="Send message"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </section>

          {/* Social Links */}
          <section className="flex gap-6 flex-col lg:w-1/2 h-200 w-full items-center" data-aos="fade-left">
            <h1 className="text-3xl">Social Links:</h1>
            <div className="flex flex-col justify-center px-5 gap-5">
              <a href="https://github.com/ClonicalClone" data-aos="fade-left" data-aos-delay="100">
                <div className="flex gap-5 px-5 py-3 border-1 border-white rounded-3xl w-70 items-center justify-center hover:scale-105 hover:shadow-[inset_0px_0px_140px_white,0px_0px_50px_-10px_white] hover:text-black transition-all duration-500">
                  <BsGithub className="text-2xl" />
                  <h1>Github</h1>
                </div>
              </a>

              <a href="https://discord.gg/FvBZfqy6Vg" data-aos="fade-left" data-aos-delay="300">
                <div className="flex gap-5 px-5 py-3 border-1 border-white rounded-3xl w-70 items-center justify-center hover:scale-105 hover:shadow-[inset_0px_0px_140px_white,0px_0px_50px_-10px_white] hover:text-black transition-all duration-500">
                  <BsDiscord className="text-2xl" />
                  <h1>Discord</h1>
                </div>
              </a>

              <a href="https://www.linkedin.com/in/jatin-singh-990703355/" data-aos="fade-left" data-aos-delay="300">
                <div className="flex gap-5 px-5 py-3 border-1 border-white rounded-3xl w-70 items-center justify-center hover:scale-105 hover:shadow-[inset_0px_0px_140px_white,0px_0px_50px_-10px_white] hover:text-black transition-all duration-500">
                  <BsLinkedin className="text-2xl" />
                  <h1>Linked In</h1>
                </div>
              </a>

              <a href="mailto:clonicalclone@gmail.com" data-aos="fade-left" data-aos-delay="600">
                <div className="flex gap-5 px-5 py-3 border-1 border-white rounded-3xl w-70 items-center justify-center hover:scale-105 hover:shadow-[inset_0px_0px_140px_white,0px_0px_50px_-10px_white] hover:text-black transition-all duration-500">
                  <SiGmail className="text-2xl" />
                  <h1>clonicalclone@gmail.com</h1>
                </div>
              </a>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default Contacts;
