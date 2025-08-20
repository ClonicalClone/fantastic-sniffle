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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const SendMessage = async () => {
    const { name, email, message } = formData;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      alert("Please fill in all fields");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      alert("Please enter a valid email address");
      return;
    }

    setLoading(true);
    console.log("🚀 Starting message send process...");

    let token = '';
    
    // Only try reCAPTCHA if we have a site key
    if (siteKey && invisibleRef.current) {
      try {
        console.log("🔒 Executing reCAPTCHA...");
        const recaptchaPromise = invisibleRef.current.executeAsync();
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('reCAPTCHA timeout')), 5000)
        );
        
        token = await Promise.race([recaptchaPromise, timeoutPromise]) as string;
        invisibleRef.current.reset();
        console.log("✅ reCAPTCHA token obtained");
      } catch (err) {
        console.error("❌ reCAPTCHA failed:", err);
        alert("reCAPTCHA verification failed. Please try again.");
        setLoading(false);
        return;
      }
    } else {
      console.log("⚠️ reCAPTCHA not configured - proceeding without token");
    }

    try {
      console.log("📤 Sending email request...");
      
      // Use Promise.race with a manual timeout instead of AbortController
      const fetchPromise = fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Cache-Control": "no-cache"
        },
        body: JSON.stringify({ 
          name: name.trim(), 
          email: email.trim(), 
          message: message.trim(), 
          token: token || 'no-token'
        })
        // Removed signal to avoid abort conflicts
      });

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Request timeout')), 30000) // 30 second timeout
      );

      const res = await Promise.race([fetchPromise, timeoutPromise]);
      console.log(`📨 Response received: ${res.status} ${res.statusText}`);

      // Check if the response is ok before trying to parse JSON
      if (!res.ok) {
        console.error("❌ Response not ok:", res.status, res.statusText);
        
        let errorMessage = "Something went wrong";
        try {
          const contentType = res.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const errorData = await res.json();
            errorMessage = errorData.error || `Server error (${res.status})`;
          } else {
            const errorText = await res.text();
            console.log("Error response text:", errorText);
            if (errorText.includes("404") || errorText.includes("This page could not be found")) {
              errorMessage = "API endpoint not found. Please check your deployment.";
            } else if (errorText.includes("500")) {
              errorMessage = "Server error. Please try again later.";
            } else {
              errorMessage = `Server error (${res.status})`;
            }
          }
        } catch (parseError) {
          console.error("Error parsing error response:", parseError);
          errorMessage = `Server error (${res.status})`;
        }
        
        alert("❌ " + errorMessage);
        return;
      }

      const result = await res.json();
      console.log("✅ Success:", result);
      alert("✅ Message sent successfully!");
      
      // Clear the form
      setFormData({
        name: '',
        email: '',
        message: ''
      });

    } catch (error) {
      console.error("❌ Error:", error);
      
      if (error instanceof Error) {
        if (error.message.includes('timeout') || error.message.includes('Request timeout')) {
          alert("❌ Request timed out. The server might be slow. Please try again or contact directly via email.");
        } else if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
          alert("❌ Network error. Please check your internet connection and try again.");
        } else {
          alert(`❌ Error: ${error.message}. Please try again later.`);
        }
      } else {
        alert("❌ Something went wrong. Please try again later.");
      }
    } finally {
      setLoading(false);
      console.log("🏁 Message send process completed");
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
                
                {siteKey && (
                  <ReCAPTCHA 
                    ref={invisibleRef} 
                    sitekey={siteKey} 
                    size="invisible" 
                    className="invisible" 
                  />
                )}
                
                {siteKey && (
                  <div className="ml-1 text-sm text-zinc-400" data-aos="fade-up" data-aos-delay="300">
                    This site is protected by reCAPTCHA and the Google{' '}
                    <a href="https://policies.google.com/privacy">Privacy Policy</a> and{' '}
                    <a href="https://policies.google.com/terms">Terms of Service</a> apply.
                  </div>
                )}
                
                <button 
                  className="bg-black text-white rounded-4xl px-2 py-4 text-xl border-1 border-white hover:scale-105 transition-all duration-600 hover:shadow-[0px_0px_100px_-20px_white,inset_0px_0px_140px_white,0px_0px_50px_-10px_white] hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" 
                  onClick={SendMessage} 
                  disabled={loading}
                  type="button"
                  aria-label="Send message"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </div>
            </section>

            {/* Social Links */}
            <section className="flex gap-6 flex-col lg:w-1/2 h-200 w-full items-center" data-aos="fade-left">
              <h1 className="text-3xl">Social Links:</h1>
              <div className="flex flex-col justify-center px-5 gap-5">
                <a href="https://github.com/ClonicalClone" data-aos="fade-left" data-aos-delay="100">
                  <div className="flex gap-5 px-5 py-3 border-1 border-white rounded-3xl w-70 items-center justify-center hover:scale-105 hover:shadow-[inset_0px_0px_140px_white,0px_0px_50px_-10px_white] hover:text-black transition-all duration-500">
                    <BsGithub className="text-2xl" /><h1>Github</h1>
                  </div>
                </a>
                <a href="https://en.wikipedia.org/wiki/User:ClonicalClone" data-aos="fade-left" data-aos-delay="200">
                  <div className="flex gap-5 px-5 py-3 border-1 border-white rounded-3xl w-70 items-center justify-center hover:scale-105 hover:shadow-[inset_0px_0px_140px_white,0px_0px_50px_-10px_white] hover:text-black transition-all duration-500">
                    <BsWikipedia className="text-2xl" /><h1>Wikipedia</h1>
                  </div>
                </a>
                <a href="https://discord.gg/FvBZfqy6Vg" data-aos="fade-left" data-aos-delay="300">
                  <div className="flex gap-5 px-5 py-3 border-1 border-white rounded-3xl w-70 items-center justify-center hover:scale-105 hover:shadow-[inset_0px_0px_140px_white,0px_0px_50px_-10px_white] hover:text-black transition-all duration-500">
                    <BsDiscord className="text-2xl" /><h1>Discord</h1>
                  </div>
                </a>
                <a href="https://www.fiverr.com/s/pdgxmbl" data-aos="fade-left" data-aos-delay="400">
                  <div className="flex gap-5 px-5 py-3 border-1 border-white rounded-3xl w-70 items-center justify-center hover:scale-105 hover:shadow-[inset_0px_0px_140px_white,0px_0px_50px_-10px_white] hover:text-black transition-all duration-500">
                    <TbBrandFiverr className="text-2xl" /><h1>Fiverr</h1>
                  </div>
                </a>
                <a href="https://www.linkedin.com/in/jatin-singh-990703355/" data-aos="fade-left" data-aos-delay="500">
                  <div className="flex gap-5 px-5 py-3 border-1 border-white rounded-3xl w-70 items-center justify-center hover:scale-105 hover:shadow-[inset_0px_0px_140px_white,0px_0px_50px_-10px_white] hover:text-black transition-all duration-500">
                    <BsLinkedin className="text-2xl" /><h1>LinkedIn</h1>
                  </div>
                </a>
                <a href="mailto:clonicalclone@gmail.com" data-aos="fade-left" data-aos-delay="600">
                  <div className="flex gap-5 px-5 py-3 border-1 border-white rounded-3xl w-70 items-center justify-center hover:scale-105 hover:shadow-[inset_0px_0px_140px_white,0px_0px_50px_-10px_white] hover:text-black transition-all duration-500">
                    <SiGmail className="text-2xl " /><h1>Email</h1>
                  </div>
                </a>
              </div>
            </section>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contacts;