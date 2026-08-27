import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PiArrowRightBold,
  PiBriefcaseFill,
  PiCheckCircleFill,
  PiEnvelopeSimpleFill,
  PiGlobeHemisphereWestFill,
  PiLockKeyFill,
  PiPaperPlaneTiltFill,
  PiShieldCheckFill,
  PiSparkleBold,
  PiTrendUpBold,
  PiUserFill,
  PiCaretDownBold,
} from "react-icons/pi";

export default function InvestorPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isRangeOpen, setIsRangeOpen] = useState(false);

  const rangeRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    investmentRange: "",
    message: "",
  });

  const investmentOptions = [
    { value: "under-25k", label: "Under $25,000" },
    { value: "25k-100k", label: "$25,000 – $100,000" },
    { value: "100k-500k", label: "$100,000 – $500,000" },
    { value: "500k-1m", label: "$500,000 – $1 Million" },
    { value: "1m-plus", label: "$1 Million+" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (rangeRef.current && !rangeRef.current.contains(event.target)) {
        setIsRangeOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Investor Enquiry:", formData);

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      investmentRange: "",
      message: "",
    });
  };

  const selectedRange =
    investmentOptions.find(
      (item) => item.value === formData.investmentRange
    )?.label || "Select investment range";

  const inputStyle =
    "investor-input w-full h-11 sm:h-12 rounded-xl sm:rounded-2xl border border-neutral-800 bg-[#171719] px-4 text-xs sm:text-sm text-white placeholder:text-neutral-500 outline-none focus:border-[#DAB25A]/60 focus:ring-1 focus:ring-[#DAB25A]/60 focus:shadow-[0_0_20px_rgba(218,178,90,0.1)] transition-all duration-300";

  const autofillStyles = `
    .investor-input:-webkit-autofill,
    .investor-input:-webkit-autofill:hover,
    .investor-input:-webkit-autofill:focus,
    .investor-input:-webkit-autofill:active {
      -webkit-text-fill-color: #ffffff !important;
      -webkit-box-shadow: 0 0 0 1000px #171719 inset !important;
      box-shadow: 0 0 0 1000px #171719 inset !important;
      background-color: #171719 !important;
      caret-color: #ffffff !important;
      transition: background-color 9999s ease-in-out 0s;
    }
  `;

  return (
    <div className="bg-[#121214] text-white font-sans min-h-screen">
      <style>{autofillStyles}</style>

      <section className="relative pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-10 bg-[#121214] overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-[#DAB25A]/5 blur-[150px] rounded-full pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold tracking-[0.18em] text-[#DAB25A] uppercase bg-[#DAB25A]/10 border border-[#DAB25A]/30 px-3 py-1.5 rounded-full"
            >
              <PiSparkleBold />
              Investment Opportunities
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="mt-4 font-extrabold text-2xl sm:text-4xl lg:text-5xl tracking-tight leading-tight"
            >
              Invest in the{" "}
              <span className="text-[#DAB25A] bg-gradient-to-r from-[#DAB25A] via-[#F3E5AB] to-[#DAB25A] bg-clip-text text-transparent">
                Future of Connection.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mt-3 text-neutral-300 text-xs sm:text-sm leading-relaxed"
            >
              BUMMPS is building a premium social experience designed around
              meaningful connections, privacy, discovery, and a growing global
              community.
            </motion.p>
          </div>

          <div className="mt-8 sm:mt-10 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-7 lg:gap-8 items-stretch">
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-5 h-full rounded-2xl sm:rounded-3xl p-5 sm:p-7 bg-neutral-900/60 border border-neutral-800 hover:border-[#DAB25A]/40 backdrop-blur-xl shadow-xl relative overflow-hidden transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#DAB25A]/10 blur-3xl rounded-full pointer-events-none" />

              <div className="relative z-10 h-full flex flex-col">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#DAB25A]/30 bg-[#DAB25A]/10 px-3 py-1 text-[10px] font-semibold text-[#DAB25A]">
                    <PiSparkleBold />
                    Why BUMMPS
                  </span>

                  <h2 className="mt-3 text-xl sm:text-2xl font-bold tracking-tight leading-snug">
                    Be part of our next chapter.
                  </h2>

                  <p className="text-xs text-neutral-400 mt-2.5 leading-relaxed">
                    We are open to conversations with investors who believe in
                    the future of premium social networking and want to explore
                    opportunities with BUMMPS.
                  </p>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex gap-3">
                    <div className="w-9 h-9 shrink-0 rounded-lg bg-[#DAB25A]/10 border border-[#DAB25A]/20 flex items-center justify-center">
                      <PiTrendUpBold className="text-[#DAB25A] text-lg" />
                    </div>

                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-white">
                        Growth Opportunity
                      </h3>

                      <p className="mt-0.5 text-[11px] text-neutral-400 leading-relaxed">
                        Explore opportunities in a premium and scalable social
                        networking platform.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-9 h-9 shrink-0 rounded-lg bg-[#DAB25A]/10 border border-[#DAB25A]/20 flex items-center justify-center">
                      <PiGlobeHemisphereWestFill className="text-[#DAB25A] text-lg" />
                    </div>

                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-white">
                        Global Vision
                      </h3>

                      <p className="mt-0.5 text-[11px] text-neutral-400 leading-relaxed">
                        Built with a vision to connect people and communities
                        across markets worldwide.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-9 h-9 shrink-0 rounded-lg bg-[#DAB25A]/10 border border-[#DAB25A]/20 flex items-center justify-center">
                      <PiBriefcaseFill className="text-[#DAB25A] text-lg" />
                    </div>

                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-white">
                        Strategic Partnerships
                      </h3>

                      <p className="mt-0.5 text-[11px] text-neutral-400 leading-relaxed">
                        We welcome strategic investors and partners who can
                        contribute capital, expertise, or market access.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-800/80">
                  <div className="p-3.5 rounded-xl bg-neutral-950/60 border border-neutral-800">
                    <span className="text-[9px] font-semibold uppercase tracking-wider text-[#DAB25A]">
                      Investor Relations
                    </span>

                    <p className="mt-1.5 text-xs sm:text-sm font-semibold text-white flex items-center gap-2">
                      <PiEnvelopeSimpleFill className="text-[#DAB25A] shrink-0" />

                      <span className="break-all">
                        BIGBUMMPS@gmail.com
                      </span>
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 text-[10px] text-neutral-500">
                  <PiLockKeyFill className="text-[#DAB25A]" />

                  <span>
                    Your enquiry details are handled privately.
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 h-full rounded-2xl sm:rounded-3xl p-5 sm:p-7 lg:p-8 bg-neutral-900/60 border border-neutral-800 hover:border-[#DAB25A]/40 backdrop-blur-xl shadow-xl transition-all duration-300"
            >
              {!submitted ? (
                <form
                  onSubmit={handleSubmit}
                  className="h-full flex flex-col"
                >
                  <div className="mb-5">
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#DAB25A]">
                      Investor Enquiry
                    </span>

                    <h2 className="mt-1.5 text-xl sm:text-2xl font-bold">
                      Let's start a conversation.
                    </h2>

                    <p className="mt-1.5 text-[11px] sm:text-xs text-neutral-400">
                      Share a few details and our team will get back to you.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-semibold uppercase tracking-wider text-neutral-300 block mb-1.5">
                          Full Name
                        </label>

                        <div className="relative">
                          <PiUserFill className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#DAB25A] text-base z-10" />

                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            autoComplete="name"
                            placeholder="Your full name"
                            className={`${inputStyle} pl-10`}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-semibold uppercase tracking-wider text-neutral-300 block mb-1.5">
                          Email Address
                        </label>

                        <div className="relative">
                          <PiEnvelopeSimpleFill className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#DAB25A] text-base z-10" />

                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            autoComplete="email"
                            placeholder="you@example.com"
                            className={`${inputStyle} pl-10`}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-semibold uppercase tracking-wider text-neutral-300 block mb-1.5">
                          Phone Number
                        </label>

                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          autoComplete="tel"
                          placeholder="+91 98765 43210"
                          className={inputStyle}
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-semibold uppercase tracking-wider text-neutral-300 block mb-1.5">
                          Company / Organization
                        </label>

                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          autoComplete="organization"
                          placeholder="Company name"
                          className={inputStyle}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-semibold uppercase tracking-wider text-neutral-300 block mb-1.5">
                        Investment Range
                      </label>

                      <div ref={rangeRef} className="relative">
                        <button
                          type="button"
                          onClick={() => setIsRangeOpen(!isRangeOpen)}
                          className={`w-full h-11 sm:h-12 rounded-xl sm:rounded-2xl border bg-[#171719] px-4 text-xs sm:text-sm text-left flex items-center justify-between transition-all duration-300 ${
                            isRangeOpen
                              ? "border-[#DAB25A]/60 ring-1 ring-[#DAB25A]/60 shadow-[0_0_20px_rgba(218,178,90,0.1)]"
                              : "border-neutral-800 hover:border-[#DAB25A]/40"
                          }`}
                        >
                          <span
                            className={
                              formData.investmentRange
                                ? "text-white"
                                : "text-neutral-500"
                            }
                          >
                            {selectedRange}
                          </span>

                          <PiCaretDownBold
                            className={`text-[#DAB25A] text-base transition-transform duration-300 ${
                              isRangeOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        <AnimatePresence>
                          {isRangeOpen && (
                            <motion.div
                              initial={{
                                opacity: 0,
                                y: -8,
                              }}
                              animate={{
                                opacity: 1,
                                y: 0,
                              }}
                              exit={{
                                opacity: 0,
                                y: -8,
                              }}
                              transition={{
                                duration: 0.18,
                              }}
                              className="absolute z-50 left-0 right-0 mt-2 rounded-xl sm:rounded-2xl border border-neutral-800 bg-[#121214] p-1.5 shadow-2xl overflow-hidden"
                            >
                              {investmentOptions.map((option) => {
                                const isSelected =
                                  formData.investmentRange === option.value;

                                return (
                                  <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => {
                                      setFormData((prev) => ({
                                        ...prev,
                                        investmentRange: option.value,
                                      }));

                                      setIsRangeOpen(false);
                                    }}
                                    className={`w-full rounded-lg sm:rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-left transition-all duration-200 flex items-center justify-between ${
                                      isSelected
                                        ? "bg-[#DAB25A] text-black font-bold"
                                        : "text-neutral-300 hover:bg-[#DAB25A]/10 hover:text-[#DAB25A]"
                                    }`}
                                  >
                                    <span>{option.label}</span>

                                    {isSelected && (
                                      <PiCheckCircleFill className="text-black text-base" />
                                    )}
                                  </button>
                                );
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-semibold uppercase tracking-wider text-neutral-300 block mb-1.5">
                        Message
                      </label>

                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={3}
                        placeholder="Tell us about your investment interest, background, or partnership idea..."
                        className="w-full rounded-xl sm:rounded-2xl border border-neutral-800 bg-[#171719] px-4 py-3 text-xs sm:text-sm text-white placeholder:text-neutral-500 focus:border-[#DAB25A]/60 focus:outline-none focus:ring-1 focus:ring-[#DAB25A]/60 focus:shadow-[0_0_20px_rgba(218,178,90,0.1)] transition-all duration-300 resize-none"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-full font-bold uppercase tracking-wider text-[10px] sm:text-xs bg-[#DAB25A] hover:bg-[#c49e48] text-black shadow-[0_4px_20px_rgba(218,178,90,0.2)] transition-all duration-300 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Submit Investment Enquiry</span>

                      <PiPaperPlaneTiltFill className="text-sm" />

                      <PiArrowRightBold className="text-xs" />
                    </button>

                    <p className="mt-2 text-center text-[9px] text-neutral-600">
                      By submitting this form, you agree to be contacted by
                      BUMMPS regarding your investment enquiry.
                    </p>
                  </div>
                </form>
              ) : (
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.96,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  className="h-full min-h-[380px] flex flex-col items-center justify-center text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-[#DAB25A]/10 border border-[#DAB25A]/30 flex items-center justify-center">
                    <PiCheckCircleFill className="text-[#DAB25A] text-4xl" />
                  </div>

                  <h2 className="mt-5 text-2xl font-bold">
                    Enquiry Received
                  </h2>

                  <p className="mt-2 max-w-md text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    Thank you for your interest in BUMMPS. Our team will review
                    your enquiry and contact you using the details provided.
                  </p>

                  <div className="mt-5 rounded-xl border border-[#DAB25A]/20 bg-[#DAB25A]/5 px-5 py-3">
                    <p className="text-[9px] uppercase tracking-wider text-neutral-500 font-bold">
                      Investor Relations
                    </p>

                    <p className="mt-1 text-xs font-semibold text-[#DAB25A]">
                      BIGBUMMPS@gmail.com
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-5 px-5 py-2.5 rounded-full border border-[#DAB25A]/30 text-[#DAB25A] text-[10px] font-bold uppercase tracking-wider hover:bg-[#DAB25A]/10 transition-all"
                  >
                    Submit Another Enquiry
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>

          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
              delay: 0.25,
            }}
            className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-[10px] sm:text-[11px] text-neutral-500"
          >
            <div className="flex items-center gap-2">
              <PiShieldCheckFill className="text-[#DAB25A]" />
              <span>Private Investor Enquiries</span>
            </div>

            <div className="flex items-center gap-2">
              <PiLockKeyFill className="text-[#DAB25A]" />
              <span>Secure Information Handling</span>
            </div>

            <div className="flex items-center gap-2">
              <PiCheckCircleFill className="text-[#DAB25A]" />
              <span>Direct Team Follow-up</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}