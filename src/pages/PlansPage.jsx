import React, { useState } from "react";
import { 
  PiCheckBold,
  PiAppleLogoFill,
  PiCreditCardFill,
  PiPaypalLogoFill
} from "react-icons/pi";

export default function BummpsWebPlansPage() {
  const [billingCycle, setBillingCycle] = useState("annual");
  const [selectedPrivilege, setSelectedPrivilege] = useState("12months");
  const [paymentMethod, setPaymentMethod] = useState("apple");

  return (
    <div className="bg-[#0B0B0D] min-h-screen text-white font-sans px-4 sm:px-8 py-10 flex flex-col items-center">
      
      {/* 1. Header & Toggle Section */}
      <div className="text-center max-w-xl mx-auto mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-3">
          Elevate Your Journey
        </h1>
        <p className="text-neutral-400 text-sm sm:text-base">
          Unlock the full potential of meaningful connections with our elite membership tiers.
        </p>

        {/* Pill Toggle Button */}
        <div className="mt-8 inline-flex items-center p-1 rounded-full bg-[#18181B] border border-neutral-800 shadow-inner">
          <button
            type="button"
            onClick={() => setBillingCycle("monthly")}
            className={`px-8 py-2.5 rounded-full text-xs font-extrabold tracking-wider transition-all duration-300 ${
              billingCycle === "monthly"
                ? "bg-[#E5B248] text-black shadow-md"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            MONTHLY
          </button>
          <button
            type="button"
            onClick={() => setBillingCycle("annual")}
            className={`px-8 py-2.5 rounded-full text-xs font-extrabold tracking-wider transition-all duration-300 flex items-center gap-2 ${
              billingCycle === "annual"
                ? "bg-[#E5B248] text-black shadow-md"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <span>ANNUAL</span>
            <span className="bg-neutral-900 text-[#E5B248] text-[9px] px-2 py-0.5 rounded-full border border-[#E5B248]/40 font-black">
              SAVE 40%
            </span>
          </button>
        </div>
      </div>

      {/* 2. Main Web Layout (Left Content + Right Checkout Summary) */}
      <div className="max-w-7xl w-full grid lg:grid-cols-12 gap-8 items-start mb-16">
        
        {/* LEFT COLUMN: Main Plan + Select Your Privilege */}
        <div className="lg:col-span-8">
          
          {/* Main Gold Card */}
          <div className="bg-[#121215] border border-[#E5B248]/40 rounded-3xl p-8 sm:p-10 shadow-[0_0_40px_rgba(229,178,72,0.1)] relative overflow-hidden">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <span className="text-[10px] font-bold tracking-widest text-[#E5B248] uppercase">
                  ENHANCED EXPERIENCE
                </span>
                <h2 className="text-3xl font-bold text-white mt-1">Gold</h2>
              </div>
              <div className="flex items-baseline gap-1 bg-[#18181C] px-5 py-3 rounded-2xl border border-neutral-800">
                <span className="text-3xl font-extrabold text-[#E5B248]">
                  {billingCycle === "annual" ? "$14.99" : "$29.99"}
                </span>
                <span className="text-xs text-neutral-400 font-medium">/mo</span>
              </div>
            </div>

            {/* Checklist */}
            <div className="grid sm:grid-cols-2 gap-4 py-4 border-y border-neutral-800/80 my-6">
              {[
                "Unlimited Likes",
                "See Who Liked You",
                "1 Profile Boost per week",
                "Travel Mode enabled",
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm">
                  <div className="w-5 h-5 rounded-full bg-[#E5B248]/20 text-[#E5B248] flex items-center justify-center text-xs shrink-0">
                    <PiCheckBold />
                  </div>
                  <span className="text-neutral-200 font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* Privilege Selection Options */}
            <div className="mt-6">
              <span className="text-[10px] font-extrabold tracking-widest text-neutral-400 uppercase block mb-4">
                SELECT YOUR PRIVILEGE
              </span>

              <div className="grid sm:grid-cols-2 gap-4">
                {/* Option 1: 12 Months */}
                <div 
                  onClick={() => setSelectedPrivilege("12months")}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                    selectedPrivilege === "12months"
                      ? "bg-[#18181C] border-[#E5B248] shadow-[0_0_20px_rgba(229,178,72,0.15)]"
                      : "bg-[#141417] border-neutral-800 hover:border-neutral-700"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold text-[#E5B248] uppercase tracking-wider">BEST VALUE</span>
                    <span className="bg-[#E5B248] text-black text-[9px] font-black px-2 py-0.5 rounded-full">SAVE 50%</span>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-bold text-white">12 Months</h3>
                    <p className="text-xs text-neutral-400">$14.99 / mo</p>
                  </div>
                  <div className="mt-4 text-2xl font-extrabold text-white">$179.88</div>
                </div>

                {/* Option 2: 1 Month */}
                <div 
                  onClick={() => setSelectedPrivilege("1month")}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                    selectedPrivilege === "1month"
                      ? "bg-[#18181C] border-[#E5B248] shadow-[0_0_20px_rgba(229,178,72,0.15)]"
                      : "bg-[#141417] border-neutral-800 hover:border-neutral-700"
                  }`}
                >
                  <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">STANDARD</span>
                  <div className="mt-4">
                    <h3 className="text-lg font-bold text-white">1 Month</h3>
                    <p className="text-xs text-neutral-400">Standard access</p>
                  </div>
                  <div className="mt-4 text-2xl font-extrabold text-white">$29.99</div>
                </div>
              </div>
            </div>

            <button className="w-full mt-8 py-4 rounded-full bg-[#E5B248] hover:bg-[#d4a23b] text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#E5B248]/20">
              SUBSCRIBE NOW
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN: Payment Method & Order Summary */}
        <div className="lg:col-span-4 bg-[#121215] border border-neutral-800 rounded-3xl p-6 sm:p-8 sticky top-6">
          <span className="text-[10px] font-extrabold tracking-widest text-neutral-400 uppercase block mb-4">
            PAYMENT METHOD
          </span>

          {/* Payment Methods */}
          <div className="space-y-3 mb-8">
            <button
              type="button"
              onClick={() => setPaymentMethod("apple")}
              className={`w-full p-3.5 rounded-2xl border flex items-center gap-3 font-semibold text-xs transition-all ${
                paymentMethod === "apple"
                  ? "border-[#E5B248] bg-[#18181C] text-white"
                  : "border-neutral-800 bg-[#141417] text-neutral-400"
              }`}
            >
              <PiAppleLogoFill className="text-xl text-white" />
              <span>Apple Pay</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod("card")}
              className={`w-full p-3.5 rounded-2xl border flex items-center gap-3 font-semibold text-xs transition-all ${
                paymentMethod === "card"
                  ? "border-[#E5B248] bg-[#18181C] text-white"
                  : "border-neutral-800 bg-[#141417] text-neutral-400"
              }`}
            >
              <PiCreditCardFill className="text-xl text-neutral-300" />
              <span>Credit Card</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod("paypal")}
              className={`w-full p-3.5 rounded-2xl border flex items-center gap-3 font-semibold text-xs transition-all ${
                paymentMethod === "paypal"
                  ? "border-[#E5B248] bg-[#18181C] text-white"
                  : "border-neutral-800 bg-[#141417] text-neutral-400"
              }`}
            >
              <PiPaypalLogoFill className="text-xl text-blue-400" />
              <span>PayPal</span>
            </button>
          </div>

          {/* Order Summary Box */}
          <div className="bg-[#18181C] border border-neutral-800 rounded-2xl p-5">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <span className="text-xs font-bold text-white">Gold Annual Plan</span>
              <span className="text-[10px] font-bold text-[#E5B248] bg-[#E5B248]/10 px-2 py-0.5 rounded-full border border-[#E5B248]/30">
                MOST POPULAR
              </span>
            </div>

            <div className="mt-4 space-y-2 text-xs text-neutral-400">
              <div className="flex justify-between">
                <span>Membership Fee</span>
                <span className="text-white">$359.88</span>
              </div>
              <div className="flex justify-between text-[#E5B248]">
                <span>Annual Discount (50%)</span>
                <span>-$180.00</span>
              </div>
              <div className="flex justify-between">
                <span>Tax / Service</span>
                <span className="text-white">$0.00</span>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-neutral-800 flex justify-between items-baseline">
              <span className="text-xs font-bold text-white">TOTAL DUE TODAY</span>
              <span className="text-2xl font-extrabold text-white">
                {selectedPrivilege === "12months" ? "$179.88" : "$29.99"}
              </span>
            </div>

            <ul className="mt-5 space-y-2 text-xs text-neutral-300">
              <li className="flex items-center gap-2">
                <PiCheckBold className="text-[#E5B248]" />
                <span>Unlimited curations & matches</span>
              </li>
              <li className="flex items-center gap-2">
                <PiCheckBold className="text-[#E5B248]" />
                <span>Personal concierge enabled</span>
              </li>
              <li className="flex items-center gap-2">
                <PiCheckBold className="text-[#E5B248]" />
                <span>VIP access to premium features</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}