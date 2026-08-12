import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { PiHeartFill, PiSparkleFill } from "react-icons/pi";
import { HiOutlineArrowRight } from "react-icons/hi";
import { img } from "../data";

const hearts = [
  { left: "8%", size: 18, delay: 0, dur: 7 },
  { left: "22%", size: 12, delay: 1.5, dur: 9 },
  { left: "78%", size: 20, delay: 0.6, dur: 8 },
  { left: "88%", size: 14, delay: 2.2, dur: 6.5 },
  { left: "50%", size: 10, delay: 3, dur: 10 },
];

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#121214] text-white pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20 font-['Plus_Jakarta_Sans',sans-serif]"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[#DAB25A]/15 blur-[120px] animate-pulse" />
        <div className="absolute top-1/2 -right-32 h-96 w-96 rounded-full bg-[#DAB25A]/10 blur-[140px] animate-pulse [animation-delay:2s]" />
      </div>

      <div className="pointer-events-none absolute inset-0 hidden sm:block">
        {hearts.map((h, i) => (
          <motion.span
            key={i}
            className="absolute bottom-0 text-[#DAB25A]/20 drop-shadow-[0_0_8px_rgba(218,178,90,0.3)]"
            style={{ left: h.left }}
            animate={{ y: [0, -650], opacity: [0.8, 0] }}
            transition={{
              duration: h.dur,
              delay: h.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <PiHeartFill style={{ fontSize: h.size * 2 }} />
          </motion.span>
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          <div className="lg:col-span-7 flex flex-col items-center text-center lg:items-start lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-[#DAB25A]/30 bg-[#DAB25A]/10 px-4 py-2 text-xs sm:text-sm font-medium text-[#DAB25A] backdrop-blur-xl shadow-[0_0_15px_rgba(218,178,90,0.1)]"
            >
              <PiSparkleFill className="text-[#DAB25A] text-base shrink-0" />
              <span>Rated the #1 premium dating app of 2026</span>
            </motion.div>

            {/* MAIN HERO HEADING WITH MATCHING THEME STYLING */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-5 font-['Playfair_Display',serif] font-bold text-3xl sm:text-5xl lg:text-6xl leading-[1.15] text-white tracking-tight"
            >
              Find someone{" "}
              <span className="italic font-normal text-[#DAB25A] bg-gradient-to-r from-[#DAB25A] via-[#F3E5AB] to-[#DAB25A] bg-clip-text text-transparent">
                worth
              </span>{" "}
              <br className="hidden sm:block" /> the story.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-5 max-w-lg text-base sm:text-lg text-neutral-300 leading-relaxed font-normal"
            >
              Bummps pairs thoughtful matching with verified, real people — so
              every conversation has a real chance of becoming something.
              No games, no ghosting, just genuine connection.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-7 flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <button
                onClick={() => navigate("/register")}
                className="group relative overflow-hidden bg-[#DAB25A] hover:bg-[#c49e48] text-black font-semibold uppercase tracking-wider px-8 py-4 rounded-full shadow-[0_4px_20px_rgba(218,178,90,0.3)] flex items-center justify-center gap-2 text-sm transition-all duration-300 active:scale-95 cursor-pointer"
              >
                <span>Join Free Today</span>
                <HiOutlineArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="mt-10 grid grid-cols-3 gap-3 sm:gap-4 w-full max-w-md"
            >
              {[
                { value: "12M+", label: "Members" },
                { value: "98%", label: "Success" },
                { value: "180+", label: "Countries" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-[#DAB25A]/20 bg-neutral-800/50 px-3 py-4 text-center backdrop-blur-xl shadow-lg hover:border-[#DAB25A]/40 transition-colors"
                >
                  <p className="font-['Playfair_Display',serif] text-xl sm:text-2xl font-semibold text-[#DAB25A]">
                    {s.value}
                  </p>
                  <p className="text-[11px] sm:text-xs text-neutral-400 mt-1 uppercase tracking-wider font-medium">
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="lg:col-span-5 relative flex justify-center items-center mt-6 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-72 sm:w-80 lg:w-[340px] h-[420px] sm:h-[480px] lg:h-[500px]"
            >
              <div className="absolute inset-0 rounded-[2.5rem] border border-[#DAB25A]/20 bg-neutral-800/60 backdrop-blur-md shadow-2xl rotate-6 translate-x-3 opacity-40" />
              <div className="absolute inset-0 rounded-[2.5rem] border border-[#DAB25A]/30 bg-neutral-800/80 backdrop-blur-md shadow-2xl -rotate-6 -translate-x-2 opacity-70" />

              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-[2.5rem] overflow-hidden border border-[#DAB25A]/60 shadow-[0_10px_40px_rgba(0,0,0,0.5)] bg-neutral-900 p-2 backdrop-blur-xl"
              >
                <div className="relative h-full w-full overflow-hidden rounded-[2rem]">
                  <img
                    src={img.heroCouple}
                    alt="Hero showcase"
                    className="h-full w-full object-cover"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}