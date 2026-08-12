import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PiPlusBold, PiQuestionFill, PiEnvelopeSimpleFill } from "react-icons/pi";
import { faqs } from "../data";

function FaqItem({ item, index, isOpen, onToggle }) {
  const formattedIndex = String(index + 1).padStart(2, "0");

  return (
    <div
      className={`relative rounded-2xl sm:rounded-3xl border transition-all duration-300 backdrop-blur-xl overflow-hidden ${isOpen
        ? "border-[#DAB25A]/60 bg-neutral-900/80 shadow-[0_10px_30px_rgba(218,178,90,0.12)]"
        : "border-[#DAB25A]/20 bg-neutral-900/40 hover:border-[#DAB25A]/40 hover:bg-neutral-900/60"
        }`}
    >
      {isOpen && (
        <div className="absolute top-0 left-0 bottom-0 w-1 bg-[#DAB25A]" />
      )}

      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-3 sm:gap-4 px-4 sm:px-6 py-4 sm:py-5 text-left cursor-pointer"
      >
        <div className="flex items-center gap-2.5 sm:gap-4">
          <span
            className={`font-['Playfair_Display',serif] text-sm sm:text-base font-bold transition-colors ${isOpen ? "text-[#DAB25A]" : "text-neutral-500"
              }`}
          >
            {formattedIndex}
          </span>
          <span className="font-semibold text-sm sm:text-base text-white">
            {item.q}
          </span>
        </div>

        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`shrink-0 grid h-7 w-7 sm:h-8 sm:w-8 place-items-center rounded-full transition-colors ${isOpen
            ? "bg-[#DAB25A] text-black shadow-[0_0_12px_rgba(218,178,90,0.4)]"
            : "bg-neutral-800 text-neutral-300 hover:text-white"
            }`}
        >
          <PiPlusBold className="text-xs sm:text-sm" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-4 sm:px-6 pb-4 sm:pb-5 pt-1.5 sm:pt-2 border-t border-[#DAB25A]/10 ml-6 sm:ml-9">
              <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed font-normal">
                {item.a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-8 sm:py-12 lg:py-14 bg-[#121214] text-white overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="grid lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-start">

          {/* Left Side Content */}
          <div className="lg:col-span-5 flex flex-col justify-between lg:sticky lg:top-20">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#DAB25A] uppercase bg-[#DAB25A]/10 border border-[#DAB25A]/30 px-3 py-1 rounded-full backdrop-blur-md">
                <PiQuestionFill className="text-[#DAB25A] text-xs sm:text-sm" /> FAQ
              </span>

              <h2 className="mt-3 sm:mt-4 font-['Playfair_Display',serif] font-bold text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
                Got questions? <br className="hidden sm:inline" />
                We've got{" "}
                <span className="italic font-normal text-[#DAB25A] bg-gradient-to-r from-[#DAB25A] via-[#F3E5AB] to-[#DAB25A] bg-clip-text text-transparent">
                  answers.
                </span>
              </h2>

              <p className="mt-3 text-neutral-300 text-sm sm:text-base leading-relaxed font-normal">
                Everything you need to know about Bummps, matching, and safety. Can't find the answer you're looking for?
              </p>
            </div>

            {/* Support / Help Box on Left */}
            <div className="mt-6 sm:mt-8 p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#DAB25A]/30 bg-neutral-900/60 backdrop-blur-xl relative overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#DAB25A]/10 blur-2xl rounded-full pointer-events-none" />

              <div className="flex items-center gap-3.5 sm:gap-4">
                <span className="grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-xl sm:rounded-2xl bg-[#DAB25A] text-black shrink-0 text-xl sm:text-2xl font-bold shadow-[0_0_15px_rgba(218,178,90,0.3)]">
                  <PiEnvelopeSimpleFill />
                </span>
                <div>
                  <h3 className="font-semibold text-white text-sm sm:text-base">Still need help?</h3>
                  <p className="text-xs text-neutral-400 mt-0.5">We're here for you 24/7</p>
                </div>
              </div>

              <a
                href="#contact"
                className="mt-4 sm:mt-5 inline-block text-center w-full bg-[#DAB25A] hover:bg-[#c49e48] text-black font-bold uppercase tracking-wider py-2.5 sm:py-3 rounded-full shadow-md text-xs transition-all duration-300 active:scale-95 cursor-pointer"
              >
                Contact Support
              </a>
            </div>
          </div>

          {/* Right Side: Accordion List */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-4">
            {faqs.map((item, i) => (
              <FaqItem
                key={item.q}
                index={i}
                item={item}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}