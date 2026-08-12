import React from "react";
import { motion } from "framer-motion";
import {
    PiSparkleFill,
    PiCheckCircleFill,
    PiShieldCheckFill,
    PiUsersThreeFill,
    PiChatCircleTextFill,
    PiCompassFill,
    PiSlidersHorizontalFill,
    PiRobotFill,
    PiEyeSlashFill,
    PiUserCheckFill,
    PiLightningFill,
} from "react-icons/pi";

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

function GoldBadge({ children }) {
    return (
        <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#DAB25A] uppercase bg-[#DAB25A]/10 border border-[#DAB25A]/30 px-3.5 py-1.5 rounded-full backdrop-blur-md">
            <PiSparkleFill className="text-[#DAB25A]" /> {children}
        </span>
    );
}

const philosophyCards = [
    {
        title: "Curated Community",
        desc: "Our platform gathers individuals who are exhausted by superficial swiping and actively seeking intentional relationships.",
    },
    {
        title: "100% Verified Profiles",
        desc: "Every profile undergoes automated and manual checks to ensure you never encounter bots or fraudulent accounts.",
    },
    {
        title: "Privacy Control",
        desc: "Your privacy is our priority. You retain complete authority over your details, visibility, and interaction settings.",
    },
    {
        title: "Intentional Dating",
        desc: "We prioritize core compatibility and shared values over endless swiping to respect your time and emotional energy.",
    },
    {
        title: "Quality Over Quantity",
        desc: "Instead of overwhelming you with irrelevant profiles, we recommend only those that match your core lifestyle.",
    },
    {
        title: "Zero Pressure Space",
        desc: "Bummps provides a calm, premium environment where you can connect naturally without social anxiety.",
    },
    {
        title: "Authentic Expression",
        desc: "Showcase your true self through smart prompts and voice notes designed to highlight your personality.",
    },
    {
        title: "Long-Term Value",
        desc: "We encourage meaningful bonds, mutual respect, and genuine long-term companionship rather than casual hookups.",
    },
    {
        title: "Respectful Communication",
        desc: "Strict community guidelines ensure every interaction remains polite, welcoming, and safe for all members.",
    },
];

const featureCards = [
    {
        icon: PiUsersThreeFill,
        title: "Meaningful Matches",
        desc: "Connect with individuals who share your core values and are genuinely looking for serious commitment.",
    },
    {
        icon: PiShieldCheckFill,
        title: "End-to-End Safety",
        desc: "Real-time human moderation combined with strict ID checks keeps your digital environment entirely secure.",
    },
    {
        icon: PiChatCircleTextFill,
        title: "Smart Icebreakers",
        desc: "Say goodbye to dry openers. Interactive prompts help spark natural, engaging conversations instantly.",
    },
    {
        icon: PiCompassFill,
        title: "Guided Discovery",
        desc: "Locate verified members near you who align seamlessly with your lifestyle and relationship goals.",
    },
    {
        icon: PiSlidersHorizontalFill,
        title: "Advanced Preferences",
        desc: "Utilize precise filter criteria to ensure you are only presented with accurate and relevant matches.",
    },
    {
        icon: PiRobotFill,
        title: "Smart AI Compatibility",
        desc: "Intelligent algorithms analyze your communication style and interests to suggest ideal companions.",
    },
    {
        icon: PiLightningFill,
        title: "Instant Chemistry Check",
        desc: "Gauge mutual interest right from the start through voice snippets and engaging icebreaker games.",
    },
    {
        icon: PiEyeSlashFill,
        title: "Private Photo Vault",
        desc: "Keep your personal photos hidden until you feel fully comfortable sharing them with your match.",
    },
    {
        icon: PiUserCheckFill,
        title: "Real Identity Badge",
        desc: "Live selfie verification grants a verified badge, completely eliminating catfishing and imposter profiles.",
    },
];

const safetyCards = [
    {
        title: "Identity Protection",
        desc: "Your sensitive personal details and precise location coordinates are never exposed to third parties.",
    },
    {
        title: "Zero Bot Tolerance",
        desc: "Strict automated filters immediately eliminate spam accounts, guaranteeing interactions with real humans only.",
    },
    {
        title: "Incognito Profile Mode",
        desc: "Control your visibility by blurring photos or hiding your profile entirely until you decide to reveal it.",
    },
    {
        title: "Instant Block & Report",
        desc: "Flag inappropriate behavior with a single tap for immediate action by our 24/7 active moderation team.",
    },
    {
        title: "Screenshot Protection",
        desc: "In-app security restrictions prevent unauthorized screen captures of your private messages and photos.",
    },
    {
        title: "Safe Date Guidelines",
        desc: "Access safety advice and emergency check-in features designed to keep your offline meetups secure.",
    },
    {
        title: "Data Encryption Standard",
        desc: "Your messages, media, and personal account information are protected using industry-grade encryption.",
    },
    {
        title: "Strict Content Moderation",
        desc: "Automated AI systems and human reviewers swiftly ban abusive behavior, hate speech, and spamming.",
    },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen w-full bg-[#121214] text-white font-['Plus_Jakarta_Sans',sans-serif] pt-28 sm:pt-36 lg:pt-40 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-[#DAB25A]/5 blur-[180px] pointer-events-none" />

            <div className="max-w-7xl mx-auto w-full relative z-10 space-y-20">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    transition={{ duration: 0.5 }}
                >
                    <div className="text-center max-w-3xl mx-auto">
                        <GoldBadge>OUR PHILOSOPHY</GoldBadge>

                        <h1 className="mt-4 font-['Playfair_Display',serif] font-bold text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
                            The Philosophy Behind{" "}
                            <span className="italic font-normal text-[#DAB25A] bg-gradient-to-r from-[#DAB25A] via-[#F3E5AB] to-[#DAB25A] bg-clip-text text-transparent">
                                Bummps
                            </span>
                        </h1>

                        <p className="mt-3 text-neutral-300 text-base sm:text-lg leading-relaxed font-normal">
                            Redefining how real humans discover, connect, and build authentic relationships in a modern digital space.
                        </p>
                    </div>

                    <div className="mt-8 max-w-5xl mx-auto space-y-4 text-neutral-300 text-sm sm:text-base leading-relaxed font-normal text-center sm:text-left">
                        <p>
                            Modern dating platforms have transformed romance into an endless game where match counts rise while meaningful conversations disappear. Bummps was engineered specifically to solve this frustration and restore intent to online matchmaking.
                        </p>
                        <p>
                            We believe everyone deserves a space free from fake profiles, spam, and superficial distractions. At Bummps, every member is welcomed into an environment defined by mutual respect, dignity, and personal privacy.
                        </p>
                        <p>
                            By placing authenticity above superficiality, our verified ecosystem connects you with partners who are genuinely invested in building serious, respectful, and long-lasting relationships.
                        </p>
                    </div>

                    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 border-t border-neutral-800/80 pt-8">
                        {philosophyCards.map((c) => (
                            <div
                                key={c.title}
                                className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-[#DAB25A]/40 transition-all duration-300"
                            >
                                <h3 className="font-semibold text-[#DAB25A] text-base flex items-center gap-2">
                                    <PiCheckCircleFill className="text-[#DAB25A] shrink-0 text-lg" />
                                    {c.title}
                                </h3>
                                <p className="mt-2.5 text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">
                                    {c.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeUp}
                    transition={{ duration: 0.5 }}
                    className="border-t border-neutral-800/80 pt-16"
                >
                    <div className="text-center max-w-3xl mx-auto">
                        <GoldBadge>OUR PLATFORM EXPERIENCE</GoldBadge>

                        <h2 className="mt-4 font-['Playfair_Display',serif] font-bold text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
                            Engineered for{" "}
                            <span className="italic font-normal text-[#DAB25A] bg-gradient-to-r from-[#DAB25A] via-[#F3E5AB] to-[#DAB25A] bg-clip-text text-transparent">
                                genuine human connection
                            </span>
                        </h2>

                        <p className="mt-3 text-neutral-300 text-base sm:text-lg leading-relaxed font-normal">
                            Discover thoughtfully crafted tools designed to make your dating journey smooth, engaging, and purposeful.
                        </p>
                    </div>

                    <div className="mt-8 max-w-5xl mx-auto space-y-4 text-neutral-300 text-sm sm:text-base leading-relaxed font-normal text-center sm:text-left">
                        <p>
                            Bummps goes beyond traditional algorithmic matching to create a platform that fosters organic communication. Instead of overwhelming users with gimmicks, we focus on making interactions feel natural and fluid.
                        </p>
                        <p>
                            Every feature is designed to save you time and connect you directly with individuals who align with your mindset. From guided icebreakers to precise search filters, our tools eliminate awkwardness and empower confident first steps.
                        </p>
                        <p>
                            Here, every match serves as the gateway to a real conversation. By replacing generic hellos with interactive prompts and shared interests, we ensure your dialogues start on an engaging note from day one.
                        </p>
                    </div>

                    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 border-t border-neutral-800/80 pt-8">
                        {featureCards.map((f) => (
                            <div
                                key={f.title}
                                className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-[#DAB25A]/40 transition-all duration-300"
                            >
                                <h3 className="font-semibold text-[#DAB25A] text-base flex items-center gap-2">
                                    <PiCheckCircleFill className="text-[#DAB25A] shrink-0 text-lg" />
                                    {f.title}
                                </h3>
                                <p className="mt-2.5 text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">
                                    {f.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeUp}
                    transition={{ duration: 0.5 }}
                    className="border-t border-neutral-800/80 pt-16"
                >
                    <div className="text-center max-w-3xl mx-auto">
                        <GoldBadge>TRUST & SECURITY</GoldBadge>

                        <h2 className="mt-4 font-['Playfair_Display',serif] font-bold text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
                            Your safety and peace of mind{" "}
                            <span className="italic font-normal text-[#DAB25A] bg-gradient-to-r from-[#DAB25A] via-[#F3E5AB] to-[#DAB25A] bg-clip-text text-transparent">
                                come first
                            </span>
                        </h2>

                        <p className="mt-3 text-neutral-300 text-base sm:text-lg leading-relaxed font-normal">
                            Safety is not an optional feature at Bummps; it is the foundational standard that guides our entire infrastructure.
                        </p>
                    </div>

                    <div className="mt-8 max-w-5xl mx-auto space-y-4 text-neutral-300 text-sm sm:text-base leading-relaxed font-normal text-center sm:text-left">
                        <p>
                            Navigating online dating requires trust, yet fake profiles and privacy risks often compromise user confidence. Bummps bridges this gap by enforcing strict safety measures across every layer of the platform.
                        </p>
                        <p>
                            Our multi-step authentication process guarantees that every profile represents a real individual. Through live facial checks, identity verification, and round-the-clock moderation, we maintain an authentic community free from bots.
                        </p>
                        <p>
                            Your sensitive personal data, exact location coordinates, and private photos remain completely under your control. With custom visibility settings, you can explore potential matches comfortably and at your own pace.
                        </p>
                    </div>

                    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 border-t border-neutral-800/80 pt-8">
                        {safetyCards.map((s) => (
                            <div
                                key={s.title}
                                className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-[#DAB25A]/40 transition-all duration-300"
                            >
                                <h3 className="font-semibold text-[#DAB25A] text-base flex items-center gap-2">
                                    <PiCheckCircleFill className="text-[#DAB25A] shrink-0 text-lg" />
                                    {s.title}
                                </h3>
                                <p className="mt-2.5 text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">
                                    {s.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}