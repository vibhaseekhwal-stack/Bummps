import { useState } from "react";
import { motion } from "framer-motion";
import {
    PiHeartFill,
    PiSparkleFill,
    PiEnvelopeSimpleBold,
    PiLockSimpleBold,
    PiEyeBold,
    PiEyeSlashBold,
    PiWarningCircleBold,
    PiShieldCheckBold,
    PiCheckCircleFill,
} from "react-icons/pi";
import { HiOutlineArrowRight } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/Apis/auth";
import logoImg from "../assets/logo.png";

// Exact fonts matching Contact Page & Hero
const displayFont = { fontFamily: '"Playfair_Display", "Playfair Display", serif' };
const bodyFont = { fontFamily: '"Plus_Jakarta_Sans", sans-serif' };

function BummpsLogo({ className = "h-9" }) {
    return (
        <div className={`flex items-center gap-2.5 select-none ${className}`}>
            <img
                src={logoImg}
                alt="Bummps Logo"
                className="h-full w-auto object-contain drop-shadow-[0_0_10px_rgba(218,178,90,0.3)]"
            />
            <span style={displayFont} className="text-2xl font-bold tracking-tight text-white">
                bummps<span className="text-[#DAB25A]">.</span>
            </span>
        </div>
    );
}

export default function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        setLoading(true);

        try {
            const res = await login(form);

            if (res.data?.token) {
                localStorage.setItem("token", res.data.token);
            }

            if (res.data?.user) {
                localStorage.setItem("user", JSON.stringify(res.data.user));
            }

            setLoading(false);
navigate("/feed");
        } catch (err) {
            setErrorMsg(err.response?.data?.message || "Invalid email or password.");
            setLoading(false);
        }
    };

    // Contact page exact match input styling
    const inputStyle =
        "w-full rounded-2xl border border-white/10 bg-neutral-950/60 py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-neutral-500 focus:border-[#DAB25A] focus:outline-none focus:ring-1 focus:ring-[#DAB25A] transition-all duration-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&:-webkit-autofill]:[transition:background-color_9999s_ease-in-out_0s] [&:-webkit-autofill]:[-webkit-text-fill-color:white]";

    return (
        <section
            style={bodyFont}
            className="relative min-h-screen w-full bg-[#121214] text-white flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden select-none py-16 sm:py-24"
        >
            {/* Background Radial Glow Spotlight - Same as Contact Page */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-100 bg-linear-to-tr from-[#DAB25A]/15 via-[#F3E5AB]/5 to-transparent blur-[160px] rounded-full pointer-events-none" />

            {/* Main Split Glass Container */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full max-w-5xl overflow-hidden rounded-4xl bg-linear-to-b from-neutral-900/90 to-neutral-950/90 border border-[#DAB25A]/20 backdrop-blur-2xl shadow-2xl grid grid-cols-1 lg:grid-cols-12"
            >
                {/* Left Side: Branding Hero Showcase (Desktop) */}
                <div className="hidden lg:flex lg:col-span-5 relative flex-col justify-between p-10 bg-neutral-900/30 border-r border-white/10 backdrop-blur-2xl">
                    <div className="absolute inset-0 bg-[#DAB25A]/5 blur-2xl pointer-events-none" />

                    <div className="relative z-10">
                        <BummpsLogo className="h-10" />
                    </div>

                    <div className="relative z-10 my-auto py-12">
                        <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#DAB25A] uppercase bg-[#DAB25A]/10 border border-[#DAB25A]/30 px-3.5 py-1.5 rounded-full backdrop-blur-md shadow-[0_0_15px_rgba(218,178,90,0.15)] mb-6">
                            <PiSparkleFill className="text-xs text-[#DAB25A]" /> Real Connections
                        </span>

                        <h2 style={displayFont} className="text-3xl font-bold leading-tight text-white">
                            Find your{" "}
                            <span className="italic font-normal text-#DAB25A bg-linear-to-r from-[#DAB25A] via-[#F3E5AB] to-[#DAB25A] bg-clip-text text-transparent">
                                perfect
                            </span>{" "}
                            match today.
                        </h2>
                        <p className="mt-4 text-sm text-neutral-300 leading-relaxed font-normal">
                            Experience modern dating with verified profiles, intelligent matching, and seamless privacy.
                        </p>

                        <div className="mt-8 flex items-center gap-4 rounded-2xl border border-white/10 bg-neutral-950/60 p-4 backdrop-blur-md">
                            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#DAB25A]/10 border border-[#DAB25A]/30 text-[#DAB25A]">
                                <PiHeartFill className="text-2xl" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-white uppercase tracking-wider">100% Verified Profiles</p>
                                <p className="text-[11px] text-neutral-400 mt-0.5">Safe and authentic conversations</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 flex items-center gap-2 text-xs text-neutral-400">
                        <PiShieldCheckBold className="text-[#DAB25A] text-base" />
                        <span>Encrypted & Safe Authentication</span>
                    </div>
                </div>

                {/* Right Side: Form Content */}
                <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center">
                    <div className="lg:hidden flex justify-center mb-6">
                        <BummpsLogo className="h-9" />
                    </div>

                    <div className="max-w-md mx-auto w-full">
                        <h1 style={displayFont} className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                            Welcome{" "}
                            <span className="italic font-normal text-#DAB25A bg-linear-to-r from-[#DAB25A] via-[#F3E5AB] to-[#DAB25A] bg-clip-text text-transparent">
                                back.
                            </span>
                        </h1>
                        <p className="mt-2 text-xs sm:text-sm text-neutral-300">
                            Please enter your details to sign in to your account.
                        </p>

                        {errorMsg && (
                            <motion.div
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-6 flex items-center gap-2.5 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs text-red-400"
                            >
                                <PiWarningCircleBold className="text-base shrink-0" />
                                <span>{errorMsg}</span>
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
                            {/* Email */}
                            <div>
                                <label htmlFor="user_login_email" className="text-xs font-semibold uppercase tracking-wider text-neutral-300 block mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <PiEnvelopeSimpleBold className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#DAB25A] text-lg z-10" />
                                    <input
                                        id="user_login_email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="you@example.com"
                                        className={inputStyle}
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label htmlFor="user_login_password" className="text-xs font-semibold uppercase tracking-wider text-neutral-300 block">
                                        Password
                                    </label>
                                    <a
                                        href="#forgot-password"
                                        className="text-xs font-semibold text-[#DAB25A] hover:underline focus:outline-none"
                                    >
                                        Forgot Password?
                                    </a>
                                </div>
                                <div className="relative">
                                    <PiLockSimpleBold className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#DAB25A] text-lg z-10" />
                                    <input
                                        id="user_login_password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="current-password"
                                        required
                                        value={form.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className={`${inputStyle} pr-11`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((v) => !v)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#DAB25A] transition-colors cursor-pointer z-10 focus:outline-none"
                                    >
                                        {showPassword ? <PiEyeSlashBold className="text-lg" /> : <PiEyeBold className="text-lg" />}
                                    </button>
                                </div>
                            </div>

                            {/* Submit Button matching Contact Page Action Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="mt-2 w-full rounded-full bg-[#DAB25A] hover:bg-[#c49e48] text-black font-bold text-xs sm:text-sm uppercase tracking-wider py-4 shadow-[0_4px_25px_rgba(218,178,90,0.4)] transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed outline-none"
                            >
                                {loading ? (
                                    <span>Logging in...</span>
                                ) : (
                                    <>
                                        <span>Log In</span>
                                        <HiOutlineArrowRight className="text-base" />
                                    </>
                                )}
                            </button>
                        </form>

                        <p className="mt-8 text-center text-xs text-neutral-400">
                            Don&apos;t have an account?{" "}
                            <Link to="/register" className="font-bold text-[#DAB25A] hover:underline focus:outline-none">
                                Create an account
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>

          
        </section>
    );
}