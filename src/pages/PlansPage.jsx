import { useState } from "react";
import { motion } from "framer-motion";
import {
    PiCheckCircleFill,
    PiCrownFill,
    PiLightningFill,
    PiHeartFill,
    PiInstagramLogoFill,
    PiTwitterLogoFill,
    PiLinkedinLogoFill,
    PiXCircleFill,
    PiStarFill,
    PiArrowRightBold,
    PiSparkleFill,
} from "react-icons/pi";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar"; // Shared Navbar component
import logoImg from "../assets/logo.png";
import { pricingPlans } from "../data";

export default function Planspage() {
    const [billingCycle, setBillingCycle] = useState("monthly");

    const comparisonFeatures = [
        { name: "Profile Visibility & Reach", free: "Standard", gold: "Priority Boost", vip: "Top Tier Featured" },
        { name: "Direct Messaging", free: "Limited", gold: "Unlimited", vip: "Unlimited + Read Receipts" },
        { name: "Verified VIP Badge", free: false, gold: true, vip: true },
        { name: "Dedicated Concierge Support", free: false, gold: false, vip: true },
        { name: "Advanced Privacy Filters", free: false, gold: true, vip: true },
        { name: "Incognito Browsing Mode", free: false, gold: false, vip: true },
    ];

    return (
        <div className="bg-[#121214] text-white font-['Plus_Jakarta_Sans',sans-serif] select-none min-h-screen flex flex-col justify-between">
            {/* Global Shared Navbar */}
            <Navbar />

            {/* Main Section */}
            <section
                id="pricing"
                className="relative pt-24 sm:pt-32 lg:pt-36 pb-16 sm:pb-24 bg-[#121214] text-white overflow-hidden"
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-gradient-to-tr from-[#DAB25A]/15 via-[#F3E5AB]/5 to-transparent blur-[160px] rounded-full pointer-events-none" />

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Header */}
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

                        {/* Billing Switcher */}
                        <div className="mt-8 inline-flex items-center p-1 rounded-full bg-neutral-900 border border-[#DAB25A]/20 backdrop-blur-xl">
                            <button
                                type="button"
                                onClick={() => setBillingCycle("monthly")}
                                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                                    billingCycle === "monthly"
                                        ? "bg-[#DAB25A] text-black shadow-[0_0_15px_rgba(218,178,90,0.3)]"
                                        : "text-neutral-400 hover:text-white"
                                }`}
                            >
                                Monthly Billing
                            </button>
                            <button
                                type="button"
                                onClick={() => setBillingCycle("yearly")}
                                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 ${
                                    billingCycle === "yearly"
                                        ? "bg-[#DAB25A] text-black shadow-[0_0_15px_rgba(218,178,90,0.3)]"
                                        : "text-neutral-400 hover:text-white"
                                }`}
                            >
                                <span>Annual Billing</span>
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-950 text-[#DAB25A] border border-[#DAB25A]/40 font-black">
                                    Save 20%
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Cards Grid */}
                    <div className="mt-12 sm:mt-16 grid md:grid-cols-3 gap-8 items-center">
                        {pricingPlans.map((plan, i) => (
                            <motion.div
                                key={plan.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.5, delay: i * 0.15 }}
                                className={`relative rounded-[2rem] p-8 sm:p-9 flex flex-col justify-between transition-all duration-500 backdrop-blur-2xl group ${
                                    plan.popular
                                        ? "bg-gradient-to-b from-neutral-900/90 to-neutral-950/90 border-2 border-[#DAB25A] shadow-[0_0_50px_rgba(218,178,90,0.25)] md:-translate-y-4 z-10"
                                        : "bg-neutral-900/30 border border-[#DAB25A]/20 hover:border-[#DAB25A]/60 hover:bg-neutral-900/60 shadow-2xl"
                                }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-[#DAB25A] text-black text-[11px] font-extrabold px-5 py-1.5 rounded-full shadow-[0_4px_20px_rgba(218,178,90,0.6)] tracking-widest uppercase">
                                        <PiCrownFill className="text-sm" /> MOST POPULAR
                                    </div>
                                )}

                                <div>
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

                                    <div className="mt-6 pt-6 border-t border-white/10 flex items-baseline gap-1.5">
                                        <span className="font-['Playfair_Display',serif] font-bold text-3xl sm:text-4xl text-[#DAB25A]">
                                            ${billingCycle === "yearly" && plan.price !== "0" ? Math.floor(plan.price * 0.8) : plan.price}
                                        </span>
                                        <span className="text-neutral-400 text-xs sm:text-sm uppercase tracking-wider font-semibold">
                                            /{plan.period}
                                        </span>
                                    </div>

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

                                <div className="mt-10 pt-6 border-t border-white/10">
                                    <button
                                        type="button"
                                        className={`w-full py-4 rounded-full font-bold uppercase tracking-wider text-xs sm:text-sm transition-all duration-300 active:scale-95 cursor-pointer ${
                                            plan.popular
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

                    {/* Premium Feature Comparison Table */}
                    <div className="mt-24">
                        <div className="text-center max-w-xl mx-auto mb-10">
                            <span className="text-[11px] font-bold tracking-[0.25em] text-[#DAB25A] uppercase bg-[#DAB25A]/10 border border-[#DAB25A]/25 px-3.5 py-1 rounded-full backdrop-blur-md">
                                Matrix Breakdown
                            </span>
                            <h3 className="mt-3 font-['Playfair_Display',serif] text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                                Compare Plan <span className="text-[#DAB25A] italic font-normal">Features</span>
                            </h3>
                            <p className="text-xs sm:text-sm text-neutral-400 mt-2">
                                Choose the tier that matches your personal networking goals.
                            </p>
                        </div>

                        {/* Table Container Card */}
                        <div className="rounded-3xl border border-white/10 bg-neutral-900/30 backdrop-blur-2xl p-4 sm:p-6 lg:p-8 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-full bg-[#DAB25A]/5 blur-3xl pointer-events-none" />

                            <div className="overflow-x-auto relative z-10">
                                <table className="w-full text-left border-collapse min-w-[650px]">
                                    <thead>
                                        <tr className="border-b border-white/10 text-xs font-bold uppercase tracking-wider text-neutral-400">
                                            <th className="py-5 px-6 w-1/4 text-neutral-300">Features</th>
                                            <th className="py-5 px-6 text-center w-1/4">Basic Tier</th>
                                            <th className="py-5 px-6 text-center w-1/4 bg-neutral-900/80 border-x border-t border-[#DAB25A]/30 rounded-t-2xl text-[#DAB25A]">
                                                <div className="flex items-center justify-center gap-1.5">
                                                    <PiCrownFill className="text-sm" />
                                                    <span>Gold Tier</span>
                                                </div>
                                            </th>
                                            <th className="py-5 px-6 text-center w-1/4 text-white">VIP Tier</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5 text-xs sm:text-sm">
                                        {comparisonFeatures.map((row, idx) => {
                                            const isLast = idx === comparisonFeatures.length - 1;
                                            return (
                                                <tr key={idx} className="hover:bg-neutral-800/20 transition-colors">
                                                    <td className="py-4 px-6 font-semibold text-neutral-300">{row.name}</td>
                                                    <td className="py-4 px-6 text-center text-neutral-400">
                                                        {typeof row.free === "boolean" ? (
                                                            row.free ? (
                                                                <PiCheckCircleFill className="text-lg text-[#DAB25A] mx-auto" />
                                                            ) : (
                                                                <PiXCircleFill className="text-lg text-neutral-600/80 mx-auto" />
                                                            )
                                                        ) : (
                                                            row.free
                                                        )}
                                                    </td>
                                                    <td
                                                        className={`py-4 px-6 text-center font-semibold text-white bg-neutral-900/80 border-x border-[#DAB25A]/30 ${
                                                            isLast ? "border-b rounded-b-2xl" : ""
                                                        }`}
                                                    >
                                                        {typeof row.gold === "boolean" ? (
                                                            row.gold ? (
                                                                <PiCheckCircleFill className="text-lg text-[#DAB25A] drop-shadow-[0_0_8px_rgba(218,178,90,0.5)] mx-auto" />
                                                            ) : (
                                                                <PiXCircleFill className="text-lg text-neutral-600/80 mx-auto" />
                                                            )
                                                        ) : (
                                                            <span className="text-[#DAB25A] font-bold">{row.gold}</span>
                                                        )}
                                                    </td>
                                                    <td className="py-4 px-6 text-center font-semibold text-neutral-200">
                                                        {typeof row.vip === "boolean" ? (
                                                            row.vip ? (
                                                                <PiCheckCircleFill className="text-lg text-[#DAB25A] mx-auto" />
                                                            ) : (
                                                                <PiXCircleFill className="text-lg text-neutral-600/80 mx-auto" />
                                                            )
                                                        ) : (
                                                            <span className="text-white font-bold">{row.vip}</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Bottom CTA Banner */}
                    <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-neutral-900/40 border border-[#DAB25A]/20 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left relative overflow-hidden">
                        <div className="space-y-2 max-w-xl z-10">
                            <div className="flex items-center justify-center md:justify-start gap-1 text-[#DAB25A] mb-2">
                                <PiStarFill />
                                <PiStarFill />
                                <PiStarFill />
                                <PiStarFill />
                                <PiStarFill />
                            </div>
                            <h4 className="font-['Playfair_Display',serif] text-2xl font-bold text-white">
                                Ready to experience premium connections?
                            </h4>
                            <p className="text-xs sm:text-sm text-neutral-300">
                                Upgrade today and gain immediate access to verified profiles with top privacy assurance.
                            </p>
                        </div>

                        <Link
                            to="/contact"
                            className="px-8 py-4 rounded-full font-bold uppercase tracking-wider text-xs sm:text-sm bg-[#DAB25A] text-black shadow-[0_0_25px_rgba(218,178,90,0.3)] hover:bg-[#c49e48] transition-all flex items-center gap-2 z-10 shrink-0"
                        >
                            <span>Claim Access</span>
                            <PiArrowRightBold />
                        </Link>
                    </div>
                </div>
            </section>

           
        </div>
    );
}