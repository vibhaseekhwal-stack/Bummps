import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  PiCheckCircleFill, 
  PiSparkleBold,
  PiAppleLogoFill,
  PiCreditCardFill,
  PiPaypalLogoFill,
  PiCheckBold
} from "react-icons/pi";

export default function BummpsPlansPage() {
  const [billingCycle, setBillingCycle] = useState("annual");
  const [selectedPrivilege, setSelectedPrivilege] = useState("12months");
  const [paymentMethod, setPaymentMethod] = useState("apple");

  return (
    <section className="relative min-h-screen bg-[#121214] text-white overflow-hidden font-['Plus_Jakarta_Sans',sans-serif] select-none py-10 sm:py-14 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      
      {/* Background Radial Glow (Identical to Contact component) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[300px] sm:h-[400px] bg-gradient-to-tr from-[#DAB25A]/15 via-[#F3E5AB]/5 to-transparent blur-[160px] rounded-full pointer-events-none" />

      {/* 1. Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-[#DAB25A]/30 bg-[#DAB25A]/10 px-3.5 py-1 text-[11px] font-bold text-[#DAB25A] mb-4 shadow-[0_0_15px_rgba(218,178,90,0.15)]"
        >
          <PiSparkleBold />
          <span>Membership Tiers</span>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="font-['Playfair_Display',serif] font-bold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight"
        >
          Elevate Your{" "}
          <span className="italic font-normal text-[#DAB25A] bg-gradient-to-r from-[#DAB25A] via-[#F3E5AB] to-[#DAB25A] bg-clip-text text-transparent">
            Journey.
          </span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-3 text-neutral-300 text-sm sm:text-base font-normal max-w-xl mx-auto leading-relaxed"
        >
          Unlock the full potential of meaningful connections with our elite membership tiers.
        </motion.p>

        {/* Toggle Controls */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-8 inline-flex items-center p-1 rounded-full bg-neutral-900/80 border border-[#DAB25A]/30 backdrop-blur-xl shadow-2xl"
        >
          <button
            type="button"
            onClick={() => setBillingCycle("monthly")}
            className={`px-6 sm:px-8 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
              billingCycle === "monthly"
                ? "bg-[#DAB25A] text-black shadow-[0_0_20px_rgba(218,178,90,0.3)]"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setBillingCycle("annual")}
            className={`px-6 sm:px-8 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 ${
              billingCycle === "annual"
                ? "bg-[#DAB25A] text-black shadow-[0_0_20px_rgba(218,178,90,0.3)]"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <span>Annual</span>
            <span className="bg-neutral-950 text-[#DAB25A] text-[9px] px-2 py-0.5 rounded-full border border-[#DAB25A]/40 font-black">
              Save 40%
            </span>
          </button>
        </motion.div>
      </div>

      {/* 2. Main Grid Layout */}
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-start relative z-10">
        
        {/* LEFT COLUMN: Gold Plan Card & Select Your Privilege */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-7 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 bg-neutral-900/40 border border-[#DAB25A]/20 backdrop-blur-xl shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#DAB25A]/10 rounded-full blur-2xl pointer-events-none" />

          {/* Title & Price Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 relative z-10">
            <div>
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#DAB25A] uppercase">
                ENHANCED EXPERIENCE
              </span>
              <h3 className="font-['Playfair_Display',serif] text-3xl sm:text-4xl font-bold text-white mt-1">
                Gold
              </h3>
            </div>
            <div className="flex items-baseline gap-1 bg-neutral-900/90 px-5 py-3 rounded-2xl border border-[#DAB25A]/30 backdrop-blur-md">
              <span className="font-['Playfair_Display',serif] text-3xl font-bold text-[#DAB25A]">
                {billingCycle === "annual" ? "$14.99" : "$29.99"}
              </span>
              <span className="text-xs text-neutral-400 font-medium">/mo</span>
            </div>
          </div>

          {/* Checklist */}
          <div className="grid sm:grid-cols-2 gap-4 py-5 border-y border-[#DAB25A]/10 my-6 relative z-10">
            {[
              "Unlimited Likes",
              "See Who Liked You",
              "1 Profile Boost per week",
              "Travel Mode enabled",
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm">
                <div className="p-1 rounded-full bg-[#DAB25A]/10 border border-[#DAB25A]/30 text-[#DAB25A] shrink-0">
                  <PiCheckCircleFill className="text-base" />
                </div>
                <span className="text-neutral-200 font-medium">{feature}</span>
              </div>
            ))}
          </div>

          {/* Select Your Privilege Section */}
          <div className="mt-6 relative z-10">
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-3">
              SELECT YOUR PRIVILEGE
            </label>

            <div className="grid sm:grid-cols-2 gap-4">
              {/* Option 1: 12 Months */}
              <div 
                onClick={() => setSelectedPrivilege("12months")}
                className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                  selectedPrivilege === "12months"
                    ? "bg-neutral-900/90 border-[#DAB25A] shadow-[0_0_20px_rgba(218,178,90,0.15)]"
                    : "bg-neutral-900/40 border-[#DAB25A]/20 hover:border-[#DAB25A]/50"
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold text-[#DAB25A] uppercase tracking-wider">BEST VALUE</span>
                  <span className="bg-[#DAB25A] text-black text-[9px] font-black px-2 py-0.5 rounded-full shadow-md">SAVE 50%</span>
                </div>
                <div className="mt-4">
                  <h4 className="font-['Playfair_Display',serif] text-lg font-bold text-white">12 Months</h4>
                  <p className="text-xs text-neutral-400">$14.99 / mo</p>
                </div>
                <div className="mt-4 font-['Playfair_Display',serif] text-2xl font-bold text-[#DAB25A]">$179.88</div>
              </div>

              {/* Option 2: 1 Month */}
              <div 
                onClick={() => setSelectedPrivilege("1month")}
                className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                  selectedPrivilege === "1month"
                    ? "bg-neutral-900/90 border-[#DAB25A] shadow-[0_0_20px_rgba(218,178,90,0.15)]"
                    : "bg-neutral-900/40 border-[#DAB25A]/20 hover:border-[#DAB25A]/50"
                }`}
              >
                <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">STANDARD</span>
                <div className="mt-4">
                  <h4 className="font-['Playfair_Display',serif] text-lg font-bold text-white">1 Month</h4>
                  <p className="text-xs text-neutral-400">Standard access</p>
                </div>
                <div className="mt-4 font-['Playfair_Display',serif] text-2xl font-bold text-white">$29.99</div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button className="w-full mt-8 py-3.5 sm:py-4 rounded-full font-bold uppercase tracking-wider text-xs sm:text-sm bg-[#DAB25A] hover:bg-[#c49e48] text-black shadow-[0_4px_25px_rgba(218,178,90,0.3)] transition-all duration-300 active:scale-95 cursor-pointer flex items-center justify-center gap-2 outline-none">
            SUBSCRIBE NOW
          </button>
        </motion.div>

        {/* RIGHT COLUMN: Payment Method & Order Summary */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-5 rounded-2xl sm:rounded-3xl p-6 sm:p-8 bg-neutral-900/40 border border-[#DAB25A]/20 backdrop-blur-xl shadow-xl flex flex-col justify-between relative overflow-hidden"
        >
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-4">
              PAYMENT METHOD
            </label>

            {/* Payment Method Selector Buttons */}
            <div className="space-y-3 mb-6">
              <button
                type="button"
                onClick={() => setPaymentMethod("apple")}
                className={`w-full p-3.5 rounded-2xl border flex items-center gap-3 font-semibold text-xs transition-all duration-300 ${
                  paymentMethod === "apple"
                    ? "border-[#DAB25A] bg-neutral-900/90 text-white shadow-[0_0_15px_rgba(218,178,90,0.15)]"
                    : "border-[#DAB25A]/20 bg-neutral-900/60 text-neutral-400 hover:text-white"
                }`}
              >
                <PiAppleLogoFill className="text-xl text-white" />
                <span>Apple Pay</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`w-full p-3.5 rounded-2xl border flex items-center gap-3 font-semibold text-xs transition-all duration-300 ${
                  paymentMethod === "card"
                    ? "border-[#DAB25A] bg-neutral-900/90 text-white shadow-[0_0_15px_rgba(218,178,90,0.15)]"
                    : "border-[#DAB25A]/20 bg-neutral-900/60 text-neutral-400 hover:text-white"
                }`}
              >
                <PiCreditCardFill className="text-xl text-neutral-300" />
                <span>Credit Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("paypal")}
                className={`w-full p-3.5 rounded-2xl border flex items-center gap-3 font-semibold text-xs transition-all duration-300 ${
                  paymentMethod === "paypal"
                    ? "border-[#DAB25A] bg-neutral-900/90 text-white shadow-[0_0_15px_rgba(218,178,90,0.15)]"
                    : "border-[#DAB25A]/20 bg-neutral-900/60 text-neutral-400 hover:text-white"
                }`}
              >
                <PiPaypalLogoFill className="text-xl text-blue-400" />
                <span>PayPal</span>
              </button>
            </div>

            {/* Receipt Summary Box */}
            <div className="bg-neutral-900/60 border border-[#DAB25A]/20 rounded-2xl p-5 backdrop-blur-md">
              <div className="flex items-center justify-between pb-3 border-b border-[#DAB25A]/10">
                <span className="font-['Playfair_Display',serif] text-sm font-bold text-white">Gold Annual Plan</span>
                <span className="text-[10px] font-bold text-[#DAB25A] bg-[#DAB25A]/10 px-2.5 py-0.5 rounded-full border border-[#DAB25A]/30">
                  MOST POPULAR
                </span>
              </div>

              <div className="mt-4 space-y-2.5 text-xs text-neutral-400">
                <div className="flex justify-between">
                  <span>Membership Fee</span>
                  <span className="text-white font-medium">$359.88</span>
                </div>
                <div className="flex justify-between text-[#DAB25A]">
                  <span>Annual Discount (50%)</span>
                  <span>-$180.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax / Service</span>
                  <span className="text-white font-medium">$0.00</span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-[#DAB25A]/10 flex justify-between items-baseline">
                <span className="text-xs font-bold text-white tracking-wider uppercase">TOTAL DUE TODAY</span>
                <span className="font-['Playfair_Display',serif] text-3xl font-bold text-[#DAB25A]">
                  {selectedPrivilege === "12months" ? "$179.88" : "$29.99"}
                </span>
              </div>

              <ul className="mt-5 space-y-2 text-xs text-neutral-300 border-t border-[#DAB25A]/10 pt-4">
                <li className="flex items-center gap-2">
                  <PiCheckBold className="text-[#DAB25A]" />
                  <span>Unlimited curations & matches</span>
                </li>
                <li className="flex items-center gap-2">
                  <PiCheckBold className="text-[#DAB25A]" />
                  <span>Personal concierge enabled</span>
                </li>
                <li className="flex items-center gap-2">
                  <PiCheckBold className="text-[#DAB25A]" />
                  <span>VIP access to premium features</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}