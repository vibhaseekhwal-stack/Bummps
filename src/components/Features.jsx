import { motion } from "framer-motion";
import {
  PiSparkleFill,
  PiShieldCheckFill,
  PiChatCircleTextFill,
  PiSlidersHorizontalFill, 
  PiMapPinFill,
  PiRobotFill,
} from "react-icons/pi";
import { features } from "../data";

const icons = {
  match: PiSparkleFill,
  verified: PiShieldCheckFill,
  chat: PiChatCircleTextFill,
  filters: PiSlidersHorizontalFill, 
  nearby: PiMapPinFill,
  ai: PiRobotFill,
};

export default function Features() {
  return (
    <section
      id="features"
      className="pt-2 pb-2 sm:pt-4 sm:pb-4 lg:pt-6 lg:pb-6 bg-[#121214] text-white overflow-hidden font-sans"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 font-sans">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto font-sans">
          <span className="inline-block text-xs font-bold tracking-[0.2em] text-[#DAB25A] bg-[#DAB25A]/10 border border-[#DAB25A]/30 px-3.5 py-1.5 rounded-full backdrop-blur-md">
            Why bummps
          </span>

          <h2 className="mt-4 font-sans font-bold text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            Built for{" "}
            <span className="font-sans font-bold text-[#DAB25A] bg-gradient-to-r from-[#DAB25A] via-[#F3E5AB] to-[#DAB25A] bg-clip-text text-transparent">
              better connections
            </span>
          </h2>

          <p className="mt-3 text-neutral-300 text-base sm:text-lg leading-relaxed font-normal font-sans">
            Everything you need to discover, match, and meet your right person seamlessly.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 font-sans">
          {features.map((f, i) => {
            const Icon = icons[f.icon] || PiSparkleFill;

            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative h-full"
              >
                {/* Background Glow */}
                <div 
                  className="absolute -inset-0.5 bg-gradient-to-r from-[#DAB25A]/30 to-[#F3E5AB]/10 rounded-3xl blur-md opacity-0 group-hover:opacity-100 transition duration-500" 
                  aria-hidden="true" 
                />

                {/* Card Container */}
                <div className="relative h-full rounded-3xl border border-[#DAB25A]/20 bg-neutral-900/50 p-6 sm:p-8 backdrop-blur-xl flex flex-col justify-between transition-all duration-300 group-hover:bg-neutral-900/80 group-hover:border-[#DAB25A]/50 group-hover:-translate-y-1.5 shadow-xl">

                  <div>
                    {/* Icon + Number */}
                    <div className="flex items-center justify-between">
                      <div className="grid h-12 w-12 sm:h-14 sm:w-14 place-items-center rounded-2xl bg-neutral-950 border border-[#DAB25A]/30 text-[#DAB25A] text-xl sm:text-2xl shadow-inner group-hover:bg-[#DAB25A] group-hover:text-black group-hover:shadow-[0_0_20px_rgba(218,178,90,0.4)] transition-all duration-300">
                        <Icon />
                      </div>

                      <span className="font-sans text-xl sm:text-2xl font-bold text-neutral-600 group-hover:text-[#DAB25A]/60 transition-colors">
                        0{i + 1}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="mt-5 sm:mt-6 font-sans font-bold text-xl sm:text-2xl text-white group-hover:text-[#DAB25A] transition-colors">
                      {f.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-2.5 sm:mt-3 text-neutral-300 text-sm sm:text-base leading-relaxed font-light sm:font-normal font-sans">
                      {f.desc}
                    </p>
                  </div>

                  {/* Corner Accent Decorator */}
                  <div className="mt-4 sm:mt-6 pt-3 border-t border-white/5 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#DAB25A]" />
                    <span className="text-[11px] font-semibold tracking-wider text-neutral-400 uppercase font-sans">
                      Bummps Exclusive
                    </span>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}