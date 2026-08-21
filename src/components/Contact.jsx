import { useState } from "react";
import { motion } from "framer-motion";
import {
  PiPaperPlaneTiltFill,
  PiCheckCircleFill,
  PiMapPinFill,
  PiPhoneFill,
  PiEnvelopeSimpleFill,
  PiUserBold,
  PiPhoneBold,
  PiEnvelopeSimpleBold,
  PiChatTextBold,
  PiShieldCheckBold,
  PiClockBold,
  PiSparkleBold,
} from "react-icons/pi";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const inputStyle =
    "w-full rounded-2xl border border-[#DAB25A]/20 bg-neutral-900/60 py-3.5 sm:py-4 pl-11 sm:pl-12 pr-4 text-xs sm:text-sm text-white placeholder:text-neutral-500 focus:border-[#DAB25A] focus:outline-none focus:ring-1 focus:ring-[#DAB25A] focus:shadow-[0_0_20px_rgba(218,178,90,0.15)] transition-all duration-300 [&:-webkit-autofill]:[transition:background-color_9999s_ease-in-out_0s] [&:-webkit-autofill]:[-webkit-text-fill-color:white]";

  return (
    <section
      id="contact"
      className="relative pt-4 sm:pt-5 pb-8 sm:pb-12 lg:pb-14 bg-[#121214] text-white overflow-hidden font-sans select-none"
    >
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[300px] sm:h-[400px] bg-gradient-to-tr from-[#DAB25A]/15 via-[#F3E5AB]/5 to-transparent blur-[160px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 font-sans">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-sans font-bold text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight"
          >
            Let's start a conversation with{" "}
            <span className="font-sans font-bold text-[#DAB25A] bg-gradient-to-r from-[#DAB25A] via-[#F3E5AB] to-[#DAB25A] bg-clip-text text-transparent">
              bummps.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-2.5 text-neutral-300 text-sm sm:text-base font-normal max-w-xl mx-auto leading-relaxed"
          >
            Have a question, feedback, or media inquiry? We're here to help you 24/7.
          </motion.p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-stretch font-sans">

          {/* LEFT SIDE: Info Deck */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 rounded-2xl sm:rounded-3xl p-6 sm:p-8 bg-neutral-900/40 border border-[#DAB25A]/20 backdrop-blur-xl shadow-xl flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 sm:w-40 h-32 sm:h-40 bg-[#DAB25A]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-6 sm:space-y-8 relative z-10">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#DAB25A]/30 bg-[#DAB25A]/10 px-3 py-1 text-[11px] font-bold text-[#DAB25A] mb-3 sm:mb-4">
                  <PiSparkleBold />
                  <span>Always Active</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                  Let's build meaningful connections together.
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 mt-2 leading-relaxed">
                  Send us a message and our support team will respond within 24 hours guaranteed.
                </p>
              </div>

              <div className="space-y-3.5 sm:space-y-4 pt-4 border-t border-[#DAB25A]/10">
                <div className="flex items-center gap-3.5 sm:gap-4">
                  <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-[#DAB25A]/10 border border-[#DAB25A]/30 text-[#DAB25A] text-lg sm:text-xl shrink-0">
                    <PiMapPinFill />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Headquarters</p>
                    <p className="text-xs sm:text-sm font-bold text-white">128 Rosewood Ave, San Francisco, CA</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 sm:gap-4">
                  <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-[#DAB25A]/10 border border-[#DAB25A]/30 text-[#DAB25A] text-lg sm:text-xl shrink-0">
                    <PiPhoneFill />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Call Us Direct</p>
                    <p className="text-xs sm:text-sm font-bold text-white">+1 (800) 555-0142</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 sm:gap-4">
                  <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-[#DAB25A]/10 border border-[#DAB25A]/30 text-[#DAB25A] text-lg sm:text-xl shrink-0">
                    <PiEnvelopeSimpleFill />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Email Support</p>
                    <p className="text-xs sm:text-sm font-bold text-white">hello@bummps.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 sm:pt-6 border-t border-[#DAB25A]/10 mt-6 sm:mt-8 flex items-center justify-between text-[11px] sm:text-xs text-neutral-400 relative z-10">
              <span className="flex items-center gap-1.5"><PiShieldCheckBold className="text-[#DAB25A]" /> Encrypted Data</span>
              <span className="flex items-center gap-1.5"><PiClockBold className="text-[#DAB25A]" /> 24/7 Monitored</span>
            </div>
          </motion.div>

          {/* RIGHT SIDE: Interactive Form Card */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="lg:col-span-7 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 bg-neutral-900/40 border border-[#DAB25A]/20 backdrop-blur-xl shadow-xl space-y-4 sm:space-y-6 flex flex-col justify-between"
          >
            <div className="space-y-4 sm:space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-neutral-300 block mb-1.5 sm:mb-2">
                    Your Name
                  </label>
                  <div className="relative">
                    <PiUserBold className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#DAB25A] text-base sm:text-lg z-10" />
                    <input id="name" type="text" required placeholder="John Doe" className={inputStyle} />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wider text-neutral-300 block mb-1.5 sm:mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <PiPhoneBold className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#DAB25A] text-base sm:text-lg z-10" />
                    <input id="phone" type="tel" placeholder="+1 (555) 000-0000" className={inputStyle} />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-neutral-300 block mb-1.5 sm:mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <PiEnvelopeSimpleBold className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#DAB25A] text-base sm:text-lg z-10" />
                  <input id="email" type="email" required placeholder="you@example.com" className={inputStyle} />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-neutral-300 block mb-1.5 sm:mb-2">
                  Your Message
                </label>
                <div className="relative">
                  <PiChatTextBold className="pointer-events-none absolute left-4 top-3.5 sm:top-4 text-[#DAB25A] text-base sm:text-lg z-10" />
                  <textarea
                    id="message"
                    required
                    rows={4}
                    placeholder="Tell us what's on your mind..."
                    className="w-full rounded-2xl border border-[#DAB25A]/20 bg-neutral-900/60 py-3.5 sm:py-4 pl-11 sm:pl-12 pr-4 text-xs sm:text-sm text-white placeholder:text-neutral-500 focus:border-[#DAB25A] focus:outline-none focus:ring-1 focus:ring-[#DAB25A] focus:shadow-[0_0_20px_rgba(218,178,90,0.15)] transition-all duration-300 resize-none"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 sm:py-4 rounded-full font-bold uppercase tracking-wider text-xs sm:text-sm bg-[#DAB25A] hover:bg-[#c49e48] text-black shadow-[0_4px_25px_rgba(218,178,90,0.3)] transition-all duration-300 active:scale-95 cursor-pointer flex items-center justify-center gap-2 outline-none mt-4"
            >
              {submitted ? (
                <>
                  <PiCheckCircleFill className="text-lg sm:text-xl" />
                  <span>Message Sent ✓</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <PiPaperPlaneTiltFill className="text-sm sm:text-base" />
                </>
              )}
            </button>
          </motion.form>

        </div>
      </div>
    </section>
  );
}