import { useState } from "react";
import { motion } from "framer-motion";
import {
  PiUserBold,
  PiHeartFill,
  PiSparkleFill,
  PiEnvelopeSimpleBold,
  PiLockSimpleBold,
  PiEyeBold,
  PiEyeSlashBold,
  PiShieldCheckBold,
} from "react-icons/pi";
import { HiOutlineArrowRight } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import logoImg from "../assets/img.png";

// Shared Logo Component
export function BummpsLogo({ className = "h-8" }) {
  return (
    <div className={`flex items-center select-none ${className}`}>
      <img
        src={logoImg}
        alt="Bummps Logo"
        className="h-full w-auto object-contain shrink-0"
      />
    </div>
  );
}

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Fake Register/Setup Delay
    setTimeout(() => {
      localStorage.setItem("token", "dummy-jwt-token-12345");
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: form.email,
          name: form.fullName || "New User",
        })
      );

      setLoading(false);
      
      // Redirect to Home Page
      navigate("/");
    }, 500);
  };

  const inputStyle =
    "w-full rounded-2xl border border-white/10 bg-neutral-950/60 py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-neutral-500 focus:border-[#DAB25A] focus:outline-none focus:ring-1 focus:ring-[#DAB25A] transition-all duration-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&:-webkit-autofill]:[transition:background-color_9999s_ease-in-out_0s] [&:-webkit-autofill]:[-webkit-text-fill-color:white]";

  return (
    <section className="font-sans relative min-h-screen w-full bg-[#121214] text-white flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden select-none py-16 sm:py-24">
      {/* Background Radial Glow Spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-100 bg-gradient-to-tr from-[#DAB25A]/15 via-[#F3E5AB]/5 to-transparent blur-[160px] rounded-full pointer-events-none" />

      {/* Main Split Glass Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-5xl overflow-hidden rounded-4xl bg-gradient-to-b from-neutral-900/90 to-neutral-950/90 border border-[#DAB25A]/20 backdrop-blur-2xl shadow-2xl grid grid-cols-1 lg:grid-cols-12 font-sans"
      >
        {/* Left Side: Branding Hero Showcase */}
        <div className="hidden lg:flex lg:col-span-5 relative flex-col justify-between p-10 bg-neutral-900/30 border-r border-white/10 backdrop-blur-2xl">
          <div className="absolute inset-0 bg-[#DAB25A]/5 blur-2xl pointer-events-none" />

          <div className="relative z-10">
            <BummpsLogo className="h-10" />
          </div>

          <div className="relative z-10 my-auto py-12">
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#DAB25A] uppercase bg-[#DAB25A]/10 border border-[#DAB25A]/30 px-3.5 py-1.5 rounded-full backdrop-blur-md shadow-[0_0_15px_rgba(218,178,90,0.15)] mb-6">
              <PiSparkleFill className="text-xs text-[#DAB25A]" /> Real Connections
            </span>

            <h2 className="font-sans text-3xl font-extrabold leading-tight text-white">
              Find your{" "}
              <span className="font-sans font-extrabold bg-gradient-to-r from-[#DAB25A] via-[#F3E5AB] to-[#DAB25A] bg-clip-text text-transparent">
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
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center font-sans">
          <div className="lg:hidden flex justify-center mb-6">
            <BummpsLogo className="h-9" />
          </div>

          <div className="max-w-md mx-auto w-full">
            <h1 className="font-sans text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Create{" "}
              <span className="font-sans font-extrabold bg-gradient-to-r from-[#DAB25A] via-[#F3E5AB] to-[#DAB25A] bg-clip-text text-transparent">
                Account.
              </span>
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-neutral-300">
              Begin your journey to finding meaningful connections today.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4 font-sans">
              {/* Full Name */}
              <div>
                <label htmlFor="user_fullName" className="text-xs font-semibold uppercase tracking-wider text-neutral-300 block mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <PiUserBold className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#DAB25A] text-lg z-10" />
                  <input
                    id="user_fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    required
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={inputStyle}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="user_reg_email" className="text-xs font-semibold uppercase tracking-wider text-neutral-300 block mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <PiEnvelopeSimpleBold className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#DAB25A] text-lg z-10" />
                  <input
                    id="user_reg_email"
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
                <label htmlFor="user_reg_password" className="text-xs font-semibold uppercase tracking-wider text-neutral-300 block mb-2">
                  Password
                </label>
                <div className="relative">
                  <PiLockSimpleBold className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#DAB25A] text-lg z-10" />
                  <input
                    id="user_reg_password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
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

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="mt-2 w-full rounded-full bg-[#DAB25A] hover:bg-[#c49e48] text-black font-bold text-xs sm:text-sm uppercase tracking-wider py-4 shadow-[0_4px_25px_rgba(218,178,90,0.4)] transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed outline-none"
              >
                {loading ? (
                  <span>Creating Account...</span>
                ) : (
                  <>
                    <span>Create Account</span>
                    <HiOutlineArrowRight className="text-base" />
                  </>
                )}
              </button>
            </form>

            <p className="mt-8 text-center text-xs text-neutral-400">
              Already have an account?{" "}
              <Link to="/login" className="font-bold text-[#DAB25A] hover:underline focus:outline-none">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}