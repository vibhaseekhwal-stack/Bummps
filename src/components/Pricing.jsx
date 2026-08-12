import { motion } from "framer-motion";
import { PiCheckCircleFill, PiSparkleFill, PiCrownFill, PiLightningFill } from "react-icons/pi";
import { pricingPlans } from "../data";

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="relative pt-3 pb-10 sm:pt-4 sm:pb-16 bg-[#121214] text-white overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]"
    >
      {/* Background Radial Glow Spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-gradient-to-tr from-[#DAB25A]/15 via-[#F3E5AB]/5 to-transparent blur-[160px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] text-[#DAB25A] uppercase bg-[#DAB25A]/10 border border-[#DAB25A]/30 px-4 py-1.5 rounded-full backdrop-blur-md shadow-[0_0_15px_rgba(218,178,90,0.15)]">
            <PiSparkleFill className="text-xs" /> Premium Access
          </span>

          <h2 className="mt-4 font-['Playfair_Display',serif] font-bold text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            Plans built for{" "}
            <span className="italic font-normal text-[#DAB25A] bg-gradient-to-r from-[#DAB25A] via-[#F3E5AB] to-[#DAB25A] bg-clip-text text-transparent">
              meaningful
            </span>{" "}
            connections.
          </h2>

          <p className="mt-3 text-neutral-300 text-sm sm:text-base font-normal">
            Start free, upgrade whenever you're ready to unlock ultimate visibility.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="mt-10 sm:mt-12 grid md:grid-cols-3 gap-8 items-center">
          {pricingPlans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`relative rounded-[2rem] p-8 sm:p-9 flex flex-col justify-between transition-all duration-500 backdrop-blur-2xl group ${plan.popular
                ? "bg-gradient-to-b from-neutral-900/90 to-neutral-950/90 border-2 border-[#DAB25A] shadow-[0_0_50px_rgba(218,178,90,0.25)] md:-translate-y-4 z-10"
                : "bg-neutral-900/30 border border-[#DAB25A]/20 hover:border-[#DAB25A]/60 hover:bg-neutral-900/60 shadow-2xl"
                }`}
            >
              {/* Popular Badge (Gradient Removed) */}
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-[#DAB25A] text-black text-[11px] font-extrabold px-5 py-1.5 rounded-full shadow-[0_4px_20px_rgba(218,178,90,0.6)] tracking-widest uppercase">
                  <PiCrownFill className="text-sm" /> MOST POPULAR
                </div>
              )}

              <div>
                {/* Header Title */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-['Playfair_Display',serif] font-bold text-xl sm:text-2xl text-white group-hover:text-[#DAB25A] transition-colors">
                      {plan.name}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-neutral-400 font-normal">
                      {plan.tagline}
                    </p>
                  </div>

                  {plan.popular && (
                    <span className="p-2.5 rounded-2xl bg-[#DAB25A]/10 border border-[#DAB25A]/30 text-[#DAB25A]">
                      <PiLightningFill className="text-xl" />
                    </span>
                  )}
                </div>

                {/* Price Display */}
                <div className="mt-6 pt-6 border-t border-white/10 flex items-baseline gap-1.5">
                  <span className="font-['Playfair_Display',serif] font-bold text-3xl sm:text-4xl text-[#DAB25A]">
                    ${plan.price}
                  </span>
                  <span className="text-neutral-400 text-xs sm:text-sm uppercase tracking-wider font-semibold">
                    /{plan.period}
                  </span>
                </div>

                {/* Features List */}
                <ul className="mt-8 space-y-3.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <div className="mt-0.5 p-0.5 rounded-full bg-[#DAB25A]/10 border border-[#DAB25A]/30 text-[#DAB25A] shrink-0">
                        <PiCheckCircleFill className="text-base" />
                      </div>
                      <span className="text-neutral-300 font-normal leading-snug">
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="mt-10 pt-6 border-t border-white/10">
                <button
                  className={`w-full py-4 rounded-full font-bold uppercase tracking-wider text-xs sm:text-sm transition-all duration-300 active:scale-95 cursor-pointer ${plan.popular
                    ? "bg-[#DAB25A] hover:bg-[#c49e48] text-black shadow-[0_4px_25px_rgba(218,178,90,0.4)]"
                    : "border border-[#DAB25A]/40 bg-neutral-900/50 hover:bg-[#DAB25A] text-[#DAB25A] hover:text-black hover:border-[#DAB25A]"
                    }`}
                >
                  {plan.cta}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}