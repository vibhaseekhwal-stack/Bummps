import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PiHeartFill, PiSparkleFill } from "react-icons/pi";
import { img } from "../data";
import Counter from "./Counter";

export default function About() {
  const navigate = useNavigate();

  return (
    <section
      id="about"
      className="relative pt-0 pb-20 sm:pt-4 sm:pb-20 bg-[#121214] text-white overflow-hidden font-sans"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10 font-sans">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">

          {/* Left Side Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 relative flex justify-center"
          >
            <div className="relative w-full max-w-md">

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative rounded-[2.5rem] p-2 border border-[#DAB25A]/20 bg-neutral-900 shadow-xl hover:border-[#DAB25A]/50 transition-all duration-300"
              >
                <div className="rounded-[2rem] overflow-hidden relative group">
                  <img
                    src={img.aboutMain}
                    alt="Couple walking together and chatting on a casual date"
                    className="w-full h-[420px] sm:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
              </motion.div>

              <div className="absolute -bottom-4 right-6 bg-neutral-950 border border-[#DAB25A]/30 px-4 py-2 rounded-full flex items-center gap-2 shadow-2xl">
                <PiSparkleFill className="text-[#DAB25A] text-xs" />
                <span className="text-[11px] font-bold text-[#DAB25A] uppercase tracking-widest font-sans">
                  Verified & Secure
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Side Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#DAB25A] uppercase bg-[#DAB25A]/10 border border-[#DAB25A]/30 px-3.5 py-1.5 rounded-full font-sans">
                <PiHeartFill className="text-[#DAB25A]" /> About bummps
              </span>
            </motion.div>

            {/* Figma Display Heading - Playfair Display */}
            <h2 className="font-serif font-bold text-2xl sm:text-4xl lg:text-5xl text-white leading-tight tracking-tight">
              Dating, minus the{" "}
              <span className="italic font-normal text-[#DAB25A] bg-linear-to-r from-[#DAB25A] via-[#F3E5AB] to-[#DAB25A] bg-clip-text text-transparent font-serif">
                noise.
              </span>
            </h2>

            {/* Figma Body Text - Plus Jakarta Sans */}
            <p className="font-sans text-neutral-300 text-base sm:text-lg leading-relaxed font-light sm:font-normal">
              We built Bummps because dating apps had become a chore — endless
              swiping, fake profiles, conversations that go nowhere. Bummps
              slows things down: fewer, better matches, verified people, and
              tools that actually help you get to a real first date.
            </p>

            <p className="font-sans text-neutral-300/80 text-sm sm:text-base leading-relaxed font-light sm:font-normal">
              Since 2019, we've helped millions of people move from a first
              message to a real relationship, guided by matching that
              improves the more you use it.
            </p>

            {/* Counter Section */}
            <div className="pt-2 grid grid-cols-2 gap-6 max-w-sm">
              <div className="border-l-2 border-[#DAB25A] pl-4 transition-all duration-300 hover:border-[#F3E5AB]">
                <p className="font-serif text-3xl sm:text-4xl font-bold text-[#DAB25A]">
                  <Counter value={12} suffix="M+" />
                </p>
                <p className="font-sans text-xs sm:text-sm text-neutral-400 mt-1 uppercase tracking-wider font-medium">
                  Happy members
                </p>
              </div>

              <div className="border-l-2 border-[#DAB25A] pl-4 transition-all duration-300 hover:border-[#F3E5AB]">
                <p className="font-serif text-3xl sm:text-4xl font-bold text-[#DAB25A]">
                  <Counter value={7} suffix=" yrs" />
                </p>
                <p className="font-sans text-xs sm:text-sm text-neutral-400 mt-1 uppercase tracking-wider font-medium">
                  Building connections
                </p>
              </div>
            </div>

            {/* Button */}
            <div className="pt-2">
              <button
                onClick={() => navigate("/about-page")}
                className="font-sans bg-[#DAB25A] hover:bg-[#c49e48] text-black font-bold uppercase tracking-wider px-8 py-4 rounded-full shadow-[0_4px_20px_rgba(218,178,90,0.3)] transition-all duration-300 active:scale-95 cursor-pointer text-sm"
              >
                Learn Our Story
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}