import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  PiCheckCircleFill,
  PiSparkleBold,
  PiArrowRightBold,
  PiLockKeyFill,
  PiShieldCheckFill,
} from "react-icons/pi";

import img from "../assets/2.png";

export default function BummpsPlansPage() {
  const [selectedPlan, setSelectedPlan] = useState("bummpsPlus");
  const [billingCycle, setBillingCycle] = useState("monthly");

  const plans = [
    {
      id: "bummps",
      name: "bummps.",
      tagline: "Essential starter access for casual networking.",
      price: "$9.99",
      features: [
        "Up to ~25 swipes per day",
        "Basic matching & chat",
        "Verified profiles only",
      ],
      isPopular: false,
    },
    {
      id: "bummpsPlus",
      name: "bummps Plus",
      tagline: "The optimal mix of reach and high-priority matching.",
      price: "$19.99",
      features: [
        "Up to ~75 swipes per day",
        "Priority visibility in discovery",
        "Advanced search & location filters",
        "Unlimited direct messaging",
        "Verified profiles only",
      ],
      isPopular: true,
    },
    {
      id: "bummpsPro",
      name: "bummps Pro",
      tagline: "Full luxury experience with global reach & maximum status.",
      price: "$29.99",
      features: [
        "Unlimited swipes without daily cap",
        "Passport mode — match anywhere globally",
        "5 Super Bummps included every month",
        "Maximum profile boost & top placement",
        "Priority customer concierge support",
        "Advanced analytics & profile insights",
      ],
      isPopular: false,
    },
  ];

  return (
    <section className="relative pt-28 sm:pt-32 lg:pt-36 pb-8 sm:pb-12 lg:pb-14 bg-[#121214] text-white overflow-hidden font-sans select-none min-h-screen flex flex-col justify-between">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[300px] sm:h-[400px] bg-gradient-to-tr from-[#DAB25A]/15 via-[#F3E5AB]/5 to-transparent blur-[160px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
        {/* HEADER SECTION */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#DAB25A]/30 bg-[#DAB25A]/10 px-3 py-1 text-[11px] font-bold text-[#DAB25A] mb-3 sm:mb-4"
          >
            <PiSparkleBold />
            <span>Membership Experience</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-sans font-extrabold text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight"
          >
            Elevate Your{" "}
            <span className="font-sans font-extrabold text-[#DAB25A] bg-gradient-to-r from-[#DAB25A] via-[#F3E5AB] to-[#DAB25A] bg-clip-text text-transparent">
              Journey.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-2.5 text-neutral-300 text-sm sm:text-base font-normal max-w-xl mx-auto leading-relaxed"
          >
            Select an elite tier crafted to give you unparalleled reach,
            priority status, and global connections.
          </motion.p>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-6 sm:mt-8 inline-flex items-center p-1.5 rounded-full bg-neutral-900/60 border border-[#DAB25A]/20 backdrop-blur-xl shadow-xl"
          >
            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 sm:px-7 py-2 sm:py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                billingCycle === "monthly"
                  ? "bg-[#DAB25A] text-black shadow-[0_4px_25px_rgba(218,178,90,0.3)]"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle("annual")}
              className={`px-6 sm:px-7 py-2 sm:py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                billingCycle === "annual"
                  ? "bg-[#DAB25A] text-black shadow-[0_4px_25px_rgba(218,178,90,0.3)]"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <span>Annual</span>
              <span className="bg-[#121214] text-[#DAB25A] text-[9px] px-2 py-0.5 rounded-full border border-[#DAB25A]/40 font-black">
                Save 40%
              </span>
            </button>
          </motion.div>
        </div>

        {/* MAIN GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-stretch font-sans">
          {/* LEFT SIDE: Tier Cards */}
          <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-5">
            {plans.map((plan) => {
              const isSelected = selectedPlan === plan.id;
              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`relative rounded-2xl sm:rounded-3xl p-6 sm:p-7 transition-all duration-300 cursor-pointer backdrop-blur-xl border ${
                    isSelected
                      ? "bg-neutral-900/60 border-[#DAB25A] shadow-[0_0_20px_rgba(218,178,90,0.15)] ring-1 ring-[#DAB25A]"
                      : "bg-neutral-900/40 border-[#DAB25A]/20 hover:border-[#DAB25A]/50"
                  }`}
                >
                  {plan.isPopular && (
                    <div className="absolute -top-3 right-6 bg-[#DAB25A] text-black text-[10px] font-extrabold uppercase tracking-widest px-3.5 py-1 rounded-full shadow-[0_4px_15px_rgba(218,178,90,0.3)]">
                      MOST POPULAR
                    </div>
                  )}

                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl sm:text-[20px] font-bold text-[#DAB25A] font-sans flex items-center gap-2">
                        <img
                          src={img}
                          alt="bummps"
                          className="h-7 sm:h-8 w-auto mb-3 object-contain"
                        />

                        {plan.id === "bummpsPlus" && <span >Plus</span>}
                        {plan.id === "bummpsPro" && <span>Pro</span>}
                      </h3>
                      <p className="text-xs text-neutral-400 mt-1 max-w-xs leading-relaxed">
                        {plan.tagline}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl sm:text-3xl font-bold text-white font-sans tracking-tight">
                        {plan.price}
                      </span>
                      <span className="text-xs text-neutral-400 font-medium ml-1">
                        /mo
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-y-2 gap-x-4 pt-4 border-t border-[#DAB25A]/10 text-xs text-neutral-300">
                    {plan.features.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <PiCheckCircleFill className="text-[#DAB25A] text-sm shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                    {plan.features.length > 3 && (
                      <span className="text-[11px] font-bold text-[#DAB25A]">
                        +{plan.features.length - 3} more privileges
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* RIGHT SIDE: Summary Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 bg-neutral-900/40 border border-[#DAB25A]/20 backdrop-blur-xl shadow-xl flex flex-col justify-between min-h-[420px] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 sm:w-40 h-32 sm:h-40 bg-[#DAB25A]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between pb-4 border-b border-[#DAB25A]/10">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                  Selected Tier
                </span>
                <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 font-medium">
                  <PiLockKeyFill className="text-[#DAB25A]" />
                  <span>Instant Activation</span>
                </div>
              </div>

              <div className="mt-5 mb-6">
                <span className="text-[11px] font-bold text-[#DAB25A] bg-[#DAB25A]/10 border border-[#DAB25A]/30 px-3 py-1 rounded-full inline-block mb-3">
                  {billingCycle === "annual"
                    ? "Annual Billing (40% Off)"
                    : "Monthly Flexible"}
                </span>
                <h3 className="text-2xl sm:text-[26px] font-sans font-bold text-[#DAB25A] tracking-wide flex items-center gap-2">
                  <img
                    src={img}
                    alt="bummps"
                    className="h-9 sm:h-10 w-auto object-contain mb-2"
                  />

                  {selectedPlan === "bummpsPlus" && <span>Plus</span>}
                  {selectedPlan === "bummpsPro" && <span>Pro</span>}
                </h3>
              </div>

              <div className="space-y-3 mb-8">
                <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                  Included Privileges:
                </p>
                {plans
                  .find((p) => p.id === selectedPlan)
                  ?.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 text-xs sm:text-sm text-neutral-200"
                    >
                      <PiCheckCircleFill className="text-[#DAB25A] text-lg shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
              </div>
            </div>

            <div className="pt-6 border-t border-[#DAB25A]/10 relative z-10">
              <div className="flex justify-between items-baseline mb-5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                  TOTAL DUE TODAY
                </span>
                <span className="font-sans text-3xl sm:text-4xl font-bold text-[#DAB25A] tracking-tight">
                  {plans.find((p) => p.id === selectedPlan)?.price}
                </span>
              </div>

              <button
                type="button"
                className="w-full py-3.5 sm:py-4 rounded-full font-bold uppercase tracking-wider text-xs sm:text-sm bg-[#DAB25A] hover:bg-[#c49e48] text-black shadow-[0_4px_25px_rgba(218,178,90,0.3)] transition-all duration-300 active:scale-95 cursor-pointer flex items-center justify-center gap-2 outline-none"
              >
                <PiShieldCheckFill className="text-lg sm:text-xl" />
                <span>Continue to Upgrade</span>
                <PiArrowRightBold className="text-sm" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
