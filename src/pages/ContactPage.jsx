import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PiPaperPlaneTiltFill,
  PiCheckCircleFill,
  PiUserBold,
  PiPhoneBold,
  PiEnvelopeSimpleBold,
  PiChatTextBold,
  PiShieldCheckBold,
  PiClockBold,
  PiSparkleFill,
  PiCaretDownBold,
  PiLightningFill,
} from "react-icons/pi";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Custom Dropdown State
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({
    label: "General Inquiry",
    value: "general",
  });

  const dropdownRef = useRef(null);

  const categories = [
    { label: "General Inquiry", value: "general" },
    { label: "Member VIP Support", value: "membership" },
    { label: "Trust & Safety Escalation", value: "safety" },
    { label: "Brand Partnerships", value: "partnerships" },
  ];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    }, 1200);
  };

  const inputStyle =
    "w-full rounded-2xl border border-neutral-800 bg-neutral-900/60 py-3.5 sm:py-4 pl-11 sm:pl-12 pr-4 text-xs sm:text-sm text-white placeholder:text-neutral-500 focus:border-[#DAB25A]/60 focus:outline-none focus:ring-1 focus:ring-[#DAB25A]/60 focus:shadow-[0_0_20px_rgba(218,178,90,0.1)] transition-all duration-300 [&:-webkit-autofill]:[transition:background-color_9999s_ease-in-out_0s] [&:-webkit-autofill]:[-webkit-text-fill-color:white]";

  return (
    <div className="bg-[#121214] text-white font-sans select-none min-h-screen flex flex-col justify-between">
      {/* Main Contact Section */}
      <section
        id="contact"
        className="relative pt-24 sm:pt-32 lg:pt-36 pb-10 sm:pb-16 bg-[#121214] text-white overflow-hidden"
      >
        {/* Background Glow Spotlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#DAB25A]/5 blur-[180px] rounded-full pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#DAB25A] uppercase bg-[#DAB25A]/10 border border-[#DAB25A]/30 px-3.5 py-1.5 rounded-full backdrop-blur-md">
              <PiSparkleFill className="text-xs" /> Direct Support Line
            </span>

            <h2 className="mt-5 font-serif font-bold text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
              Let's start a conversation with{" "}
              <span className="italic font-normal text-[#DAB25A] bg-gradient-to-r from-[#DAB25A] via-[#F3E5AB] to-[#DAB25A] bg-clip-text text-transparent">
                Bummps.
              </span>
            </h2>

            <p className="mt-4 text-neutral-300 text-sm sm:text-base font-normal leading-relaxed">
              Connect directly with our core concierge team for fast, confidential assistance.
            </p>
          </div>

          {/* Contact Content Grid */}
          <div className="mt-10 sm:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-stretch">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-5 rounded-2xl sm:rounded-3xl p-6 sm:p-8 bg-neutral-900/60 border border-neutral-800 hover:border-[#DAB25A]/40 backdrop-blur-xl shadow-2xl flex flex-col justify-between relative overflow-hidden transition-all duration-300"
            >
              <div className="space-y-6 sm:space-y-8 relative z-10">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#DAB25A]/30 bg-[#DAB25A]/10 px-3 py-1 text-[11px] font-semibold text-[#DAB25A] mb-3">
                    <PiLightningFill />
                    <span>Instant Reach Desk</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                    Let's build meaningful connections together.
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 mt-3 leading-relaxed">
                    Send us a message and our support team will respond within 24 hours guaranteed.
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-neutral-800/80">
                  <div className="p-4 rounded-2xl bg-neutral-950/60 border border-neutral-800 space-y-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#DAB25A]">
                      Global Support Desk
                    </span>
                    <p className="text-sm font-semibold text-white">support@bummps.com</p>
                    <p className="text-xs text-neutral-400">Available 24 hours a day, 7 days a week.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-neutral-950/60 border border-neutral-800 space-y-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#DAB25A]">
                      Direct Phone Line
                    </span>
                    <p className="text-sm font-semibold text-white">+1 (800) 555-0142 / +91 98765 43210</p>
                    <p className="text-xs text-neutral-400">Mon - Sat, 9:00 AM - 9:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 sm:pt-6 border-t border-neutral-800/80 mt-6 sm:mt-8 flex items-center justify-between text-[11px] sm:text-xs text-neutral-400 relative z-10">
                <span className="flex items-center gap-1.5"><PiShieldCheckBold className="text-[#DAB25A]" /> Encrypted Data</span>
                <span className="flex items-center gap-1.5"><PiClockBold className="text-[#DAB25A]" /> 24/7 Monitored</span>
              </div>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              onSubmit={handleSubmit}
              className="lg:col-span-7 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 bg-neutral-900/60 border border-neutral-800 hover:border-[#DAB25A]/40 backdrop-blur-xl shadow-2xl space-y-4 sm:space-y-6 flex flex-col justify-between transition-all duration-300"
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-neutral-300 block mb-1.5 sm:mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <PiEnvelopeSimpleBold className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#DAB25A] text-base sm:text-lg z-10" />
                      <input id="email" type="email" required placeholder="you@example.com" className={inputStyle} />
                    </div>
                  </div>

                  {/* Custom Styled Dropdown */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300 block mb-1.5 sm:mb-2">
                      Inquiry Category
                    </label>
                    <div className="relative" ref={dropdownRef}>
                      <PiEnvelopeSimpleBold className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#DAB25A] text-base sm:text-lg z-10" />

                      <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className={`w-full rounded-2xl border bg-neutral-900/60 py-3.5 sm:py-4 pl-11 sm:pl-12 pr-10 text-xs sm:text-sm text-left text-white transition-all duration-300 flex items-center justify-between ${
                          isDropdownOpen
                            ? "border-[#DAB25A]/60 ring-1 ring-[#DAB25A]/60 shadow-[0_0_20px_rgba(218,178,90,0.1)]"
                            : "border-neutral-800 hover:border-[#DAB25A]/40"
                        }`}
                      >
                        <span>{selectedCategory.label}</span>
                        <PiCaretDownBold
                          className={`text-[#DAB25A] text-base transition-transform duration-300 ${
                            isDropdownOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Dropdown Options List */}
                      <AnimatePresence>
                        {isDropdownOpen && (
                          <motion.ul
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute z-50 mt-2 w-full rounded-2xl border border-neutral-800 bg-[#121214] p-1.5 shadow-2xl backdrop-blur-2xl overflow-hidden"
                          >
                            {categories.map((item) => (
                              <li key={item.value}>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedCategory(item);
                                    setIsDropdownOpen(false);
                                  }}
                                  className={`w-full rounded-xl px-4 py-2.5 text-xs sm:text-sm text-left transition-all duration-200 flex items-center justify-between ${
                                    selectedCategory.value === item.value
                                      ? "bg-[#DAB25A] text-black font-bold"
                                      : "text-neutral-300 hover:bg-[#DAB25A]/15 hover:text-[#DAB25A]"
                                  }`}
                                >
                                  <span>{item.label}</span>
                                  {selectedCategory.value === item.value && (
                                    <PiCheckCircleFill className="text-base text-black" />
                                  )}
                                </button>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
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
                      className="w-full rounded-2xl border border-neutral-800 bg-neutral-900/60 py-3.5 sm:py-4 pl-11 sm:pl-12 pr-4 text-xs sm:text-sm text-white placeholder:text-neutral-500 focus:border-[#DAB25A]/60 focus:outline-none focus:ring-1 focus:ring-[#DAB25A]/60 focus:shadow-[0_0_20px_rgba(218,178,90,0.1)] transition-all duration-300 resize-none"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 sm:py-4 rounded-full font-bold uppercase tracking-wider text-xs sm:text-sm bg-[#DAB25A] hover:bg-[#c49e48] text-black shadow-[0_4px_20px_rgba(218,178,90,0.2)] transition-all duration-300 active:scale-95 cursor-pointer flex items-center justify-center gap-2 outline-none mt-4 disabled:opacity-60"
              >
                {loading ? (
                  <span>Sending Message...</span>
                ) : submitted ? (
                  <>
                    <PiCheckCircleFill className="text-lg sm:text-xl" />
                    <span>Message Sent Successfully ✓</span>
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
    </div>
  );
}