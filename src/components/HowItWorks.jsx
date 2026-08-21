import { motion } from "framer-motion";
import {
  PiUserPlusFill,
  PiIdentificationCardFill,
  PiMagnifyingGlassFill,
  PiChatCircleDotsFill,
  PiCoffeeFill,
  PiSparkleFill,
} from "react-icons/pi";
import { steps } from "../data";

const icons = [
  PiUserPlusFill,
  PiIdentificationCardFill,
  PiMagnifyingGlassFill,
  PiChatCircleDotsFill,
  PiCoffeeFill,
];

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-[#121214] pt-2 pb-14 sm:pt-4 sm:pb-20 lg:pt-6 lg:pb-24 text-white font-sans">

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#DAB25A]/30 bg-[#DAB25A]/10 px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-[#DAB25A] uppercase backdrop-blur-md">
            <PiSparkleFill /> The Bummps Journey
          </span>
          <h2 className="mt-4 font-serif text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            Seamlessly{" "}
            <span className="italic font-normal text-[#DAB25A] bg-gradient-to-r from-[#DAB25A] via-[#F3E5AB] to-[#DAB25A] bg-clip-text text-transparent">
              interwoven.
            </span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400">
            An effortless flow designed for intentional relationships.
          </p>
        </div>

        {/* Floating Ribbon Horizontal Layout */}
        <div className="relative mt-6 sm:mt-10">

          {/* Animated Connecting Ribbon Path (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 -translate-y-1/2 pointer-events-none z-0" aria-hidden="true">
            <svg
              className="w-full h-32 overflow-visible"
              viewBox="0 0 1000 100"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M 0 50 Q 125 0, 250 50 T 500 50 T 750 50 T 1000 50"
                stroke="#DAB25A"
                strokeWidth="2"
                strokeDasharray="6 6"
                className="opacity-30"
              />
            </svg>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-4 relative z-10">
            {steps.map((s, i) => {
              const Icon = icons[i];
              const isFloatingUp = i % 2 === 0;

              return (
                <motion.div
                  key={s.title || i}
                  initial={{ opacity: 0, y: isFloatingUp ? -30 : 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  className={`flex flex-col items-center ${
                    isFloatingUp ? "lg:-translate-y-10" : "lg:translate-y-10"
                  }`}
                >
                  {/* Glass Capsule Card */}
                  <div className="group relative w-full rounded-[2.5rem] border border-[#DAB25A]/20 bg-neutral-900/50 p-6 sm:p-7 backdrop-blur-2xl transition-all duration-500 hover:border-[#DAB25A]/70 hover:shadow-[0_15px_40px_rgba(218,178,90,0.2)] hover:-translate-y-2">

                    {/* Glowing Icon Sphere */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-neutral-950 border border-[#DAB25A]/30 text-[#DAB25A] text-xl sm:text-2xl group-hover:bg-[#DAB25A] group-hover:text-black transition-all duration-500 shadow-[0_0_20px_rgba(218,178,90,0.15)]">
                        {Icon && <Icon />}
                      </div>

                      {/* Pulse Indicator Point */}
                      <span className="h-2 w-2 rounded-full bg-[#DAB25A]/40 group-hover:bg-[#DAB25A] group-hover:shadow-[0_0_10px_#DAB25A] transition-all" />
                    </div>

                    {/* Step Title & Desc */}
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-[#DAB25A] transition-colors">
                      {s.title}
                    </h3>
                    <p className="mt-2.5 text-xs text-neutral-300 leading-relaxed font-light">
                      {s.desc}
                    </p>

                    {/* Subtle Bottom Accent Line */}
                    <div className="mt-5 h-[1.5px] w-full bg-[#DAB25A]/20 group-hover:bg-[#DAB25A] transition-all duration-500" />
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}