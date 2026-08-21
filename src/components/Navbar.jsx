import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX, HiArrowLeft } from "react-icons/hi";
import { PiSparkleFill } from "react-icons/pi";
import { useNavigate, useLocation, Link } from "react-router-dom";
import BummpsLogo from "./BummpsLogo";

const publicNavLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Success Stories", to: "/success-stories" },
  { label: "Plans", to: "/our-plans" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "unset";
      document.body.style.touchAction = "auto";
    }

    return () => {
      document.body.style.overflow = "unset";
      document.body.style.touchAction = "auto";
    };
  }, [open]);

  const handleLogoClick = (e) => {
    e.preventDefault();
    setOpen(false);

    if (location.pathname === "/") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      navigate("/");
    }
  };

  const handleLogin = () => {
    setOpen(false);
    navigate("/login");
  };

  const handleRegister = () => {
    setOpen(false);
    navigate("/register");
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full font-sans transition-all duration-300 select-none border-b ${
          scrolled
            ? "border-[#DAB25A]/30 bg-[#121214]/95 backdrop-blur-2xl py-3 shadow-[0_10px_30px_rgba(0,0,0,0.9)]"
            : "border-[#DAB25A]/20 bg-[#121214]/80 backdrop-blur-xl py-4 sm:py-5"
        }`}
      >
        <div
          className="absolute top-0 left-0 right-0 h-full bg-gradient-to-r from-[#DAB25A]/10 via-transparent to-[#DAB25A]/10 blur-xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="w-full px-5 sm:px-8 lg:px-12 relative z-10 flex items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            onClick={handleLogoClick}
            className="z-50 cursor-pointer transition-transform hover:scale-105 active:scale-95"
          >
            <BummpsLogo className="h-8 sm:h-9" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 font-sans">
            {publicNavLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-xs uppercase tracking-widest font-semibold text-neutral-300 hover:text-[#DAB25A] transition-colors cursor-pointer relative group py-1"
              >
                {link.label}

                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#DAB25A] shadow-[0_0_8px_#DAB25A] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3.5 font-sans">
            <button
              onClick={handleLogin}
              className="border border-[#DAB25A]/30 bg-neutral-900/80 hover:bg-[#DAB25A]/20 hover:border-[#DAB25A] text-white font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-full transition-all duration-300 active:scale-95 cursor-pointer"
            >
              Log In
            </button>

            <button
              onClick={handleRegister}
              className="bg-[#DAB25A] hover:bg-[#c49e48] text-black text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-full transition-all duration-300 active:scale-95 cursor-pointer shadow-[0_4px_20px_rgba(218,178,90,0.35)] flex items-center gap-1.5"
            >
              <PiSparkleFill className="text-sm" />
              <span>Sign Up</span>
            </button>
          </div>

          {/* Mobile Menu */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden grid h-10 w-10 place-items-center rounded-full border border-[#DAB25A]/40 bg-neutral-900 text-[#DAB25A] z-50 active:scale-90 transition-all"
            aria-label="Toggle Menu"
          >
            {open ? (
              <HiX className="h-6 w-6" />
            ) : (
              <HiMenu className="h-6 w-6" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 w-full h-full bg-[#121214] lg:hidden flex flex-col justify-between p-6 pt-24 z-[999] overflow-hidden font-sans"
          >
            <div
              className="absolute top-1/3 left-1/2 -translate-x-1/2 w-72 h-72 bg-[#DAB25A]/10 blur-[100px] rounded-full pointer-events-none"
              aria-hidden="true"
            />

            {/* Mobile Header */}
            <div className="absolute top-4 left-6 right-6 flex items-center justify-between pb-4 border-b border-[#DAB25A]/15 z-20">
              <button
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#DAB25A] font-bold bg-neutral-900 px-4 py-2 rounded-full border border-[#DAB25A]/30 active:scale-95 transition-all shadow-[0_0_15px_rgba(218,178,90,0.1)]"
              >
                <HiArrowLeft className="text-sm" />
                Back
              </button>

              <button
                onClick={() => setOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-full border border-[#DAB25A]/30 bg-neutral-900 text-[#DAB25A] active:scale-95"
              >
                <HiX className="h-5 w-5" />
              </button>
            </div>

            {/* Mobile Links */}
            <div className="relative flex flex-col gap-4 text-center my-auto z-10 font-sans">
              {publicNavLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="py-2.5 px-4 rounded-xl text-white/90 hover:text-[#DAB25A] text-2xl font-bold transition-all active:scale-95 font-sans"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile Actions */}
            <div className="relative flex flex-col gap-3 mb-4 w-full max-w-sm mx-auto z-10 pt-4 border-t border-[#DAB25A]/15 font-sans">
              <button
                onClick={handleLogin}
                className="w-full py-3.5 rounded-full border border-[#DAB25A]/40 bg-neutral-900 text-xs font-bold uppercase tracking-wider text-white active:scale-95 transition-all"
              >
                Log In
              </button>

              <button
                onClick={handleRegister}
                className="w-full py-3.5 rounded-full bg-[#DAB25A] text-black text-xs font-bold uppercase tracking-wider shadow-[0_4px_25px_rgba(218,178,90,0.35)] active:scale-95 transition-all"
              >
                Sign Up
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}