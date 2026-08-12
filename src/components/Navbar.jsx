import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX, HiArrowLeft } from "react-icons/hi";
import { PiUserBold, PiSignOutBold, PiSparkleFill } from "react-icons/pi";
import { useNavigate, useLocation, Link } from "react-router-dom";
import BummpsLogo from "./BummpsLogo";

const displayFont = { fontFamily: '"Playfair Display", serif' };
const bodyFont = { fontFamily: '"Plus_Jakarta_Sans", sans-serif' };

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
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Background Scroll Lock (Screen chalti hui stop ho jayegi)
  useEffect(() => {
    if (open || showLogoutModal) {
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
  }, [open, showLogoutModal]);

  const handleLogoClick = (e) => {
    e.preventDefault();
    setOpen(false);
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  const confirmLogout = () => {
    localStorage.clear();
    setShowLogoutModal(false);
    setOpen(false);
    navigate("/login");
  };

  return (
    <>
      <header
        style={bodyFont}
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 select-none border-b ${scrolled
            ? "border-[#DAB25A]/30 bg-[#121214]/95 backdrop-blur-2xl py-3 shadow-[0_10px_30px_rgba(0,0,0,0.9)]"
            : "border-[#DAB25A]/20 bg-[#121214]/80 backdrop-blur-xl py-4 sm:py-5"
          }`}
      >
        <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-r from-[#DAB25A]/10 via-transparent to-[#DAB25A]/10 blur-xl pointer-events-none" />

        <div className="w-full px-5 sm:px-8 lg:px-12 relative z-10 flex items-center justify-between">
          <a
            href="/"
            onClick={handleLogoClick}
            className="z-50 cursor-pointer transition-transform hover:scale-105 active:scale-95"
          >
            <BummpsLogo className="h-8 sm:h-9" />
          </a>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {!isLoggedIn &&
              publicNavLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-xs uppercase tracking-widest font-semibold text-neutral-300 hover:text-[#DAB25A] transition-colors cursor-pointer relative group py-1"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#DAB25A] shadow-[0_0_8px_#DAB25A] transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            {isLoggedIn && (
              <>
                {["feed", "filter", "matches", "chats", "plans"].map((path) => (
                  <Link
                    key={path}
                    to={`/${path}`}
                    className="text-xs tracking-widest font-semibold text-neutral-300 hover:text-[#DAB25A] transition-colors relative group py-1 capitalize"
                  >
                    {path}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#DAB25A] shadow-[0_0_8px_#DAB25A] transition-all duration-300 group-hover:w-full" />
                  </Link>
                ))}
              </>
            )}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3.5">
            {isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  className="grid h-10 w-10 place-items-center rounded-full border border-[#DAB25A]/30 bg-neutral-900/80 text-[#DAB25A] hover:bg-[#DAB25A] hover:text-black hover:border-transparent transition-all duration-300 active:scale-95"
                >
                  <PiUserBold className="h-5 w-5" />
                </Link>
                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="border border-[#DAB25A]/30 bg-neutral-900/80 hover:bg-[#DAB25A]/20 hover:border-[#DAB25A] text-white font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-full transition-all duration-300 active:scale-95 cursor-pointer"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="border border-[#DAB25A]/30 bg-neutral-900/80 hover:bg-[#DAB25A]/20 hover:border-[#DAB25A] text-white font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-full transition-all duration-300 active:scale-95 cursor-pointer"
                >
                  Log In
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="bg-[#DAB25A] hover:bg-[#c49e48] text-black text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-full transition-all duration-300 active:scale-95 cursor-pointer shadow-[0_4px_20px_rgba(218,178,90,0.35)] flex items-center gap-1.5"
                >
                  <PiSparkleFill className="text-sm" />
                  <span>Sign Up</span>
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden grid h-10 w-10 place-items-center rounded-full border border-[#DAB25A]/40 bg-neutral-900 text-[#DAB25A] z-50 active:scale-90 transition-all"
            aria-label="Toggle Menu"
          >
            {open ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer (Solid Dark Screen - No Bleed through) */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 w-full h-full bg-[#121214] lg:hidden flex flex-col justify-between p-6 pt-24 z-[999] overflow-hidden"
          >
            {/* Soft Ambient Gold Glow */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-72 h-72 bg-[#DAB25A]/10 blur-[100px] rounded-full pointer-events-none" />

            {/* Back Button & Header inside Mobile Menu */}
            <div className="absolute top-4 left-6 right-6 flex items-center justify-between pb-4 border-b border-[#DAB25A]/15 z-20">
              <button
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#DAB25A] font-bold bg-neutral-900 px-4 py-2 rounded-full border border-[#DAB25A]/30 active:scale-95 transition-all shadow-[0_0_15px_rgba(218,178,90,0.1)]"
              >
                <HiArrowLeft className="text-sm" /> Back
              </button>
              <button
                onClick={() => setOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-full border border-[#DAB25A]/30 bg-neutral-900 text-[#DAB25A] active:scale-95"
              >
                <HiX className="h-5 w-5" />
              </button>
            </div>

            {/* Menu Links */}
            <div className="relative flex flex-col gap-4 text-center my-auto z-10">
              {!isLoggedIn &&
                publicNavLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setOpen(false)}
                    style={displayFont}
                    className="py-2.5 px-4 rounded-xl text-white/90 hover:text-[#DAB25A] text-2xl font-bold transition-all active:scale-95"
                  >
                    {link.label}
                  </Link>
                ))}
              {isLoggedIn &&
                ["feed", "filter", "matches", "chats", "plans", "profile"].map((path) => (
                  <Link
                    key={path}
                    to={`/${path}`}
                    onClick={() => setOpen(false)}
                    style={displayFont}
                    className="py-2.5 px-4 rounded-xl text-white/90 hover:text-[#DAB25A] text-2xl font-bold transition-all capitalize active:scale-95"
                  >
                    {path}
                  </Link>
                ))}
            </div>

            {/* Bottom Actions */}
            <div className="relative flex flex-col gap-3 mb-4 w-full max-w-sm mx-auto z-10 pt-4 border-t border-[#DAB25A]/15">
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    setOpen(false);
                    setShowLogoutModal(true);
                  }}
                  className="w-full py-3.5 rounded-full border border-[#DAB25A]/40 bg-neutral-900 text-xs font-bold uppercase tracking-wider text-white active:scale-95 transition-all"
                >
                  Log Out
                </button>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setOpen(false);
                      navigate("/login");
                    }}
                    className="w-full py-3.5 rounded-full border border-[#DAB25A]/40 bg-neutral-900 text-xs font-bold uppercase tracking-wider text-white active:scale-95 transition-all"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => {
                      setOpen(false);
                      navigate("/register");
                    }}
                    className="w-full py-3.5 rounded-full bg-[#DAB25A] text-black text-xs font-bold uppercase tracking-wider shadow-[0_4px_25px_rgba(218,178,90,0.35)] active:scale-95 transition-all"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logout Modal */}
      {showLogoutModal &&
        createPortal(
          <AnimatePresence>
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowLogoutModal(false)}
                className="fixed inset-0 bg-black/90 backdrop-blur-md"
              />
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 16 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 16 }}
                className="relative z-10 w-full max-w-sm overflow-hidden rounded-3xl border border-[#DAB25A]/40 bg-[#121214] p-8 text-center shadow-[0_20px_50px_rgba(0,0,0,0.95)]"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#DAB25A]/10 rounded-full blur-2xl pointer-events-none" />

                <div className="relative mb-6 flex justify-center">
                  <div className="rounded-2xl border border-[#DAB25A]/30 bg-[#DAB25A]/10 p-4 text-[#DAB25A] text-2xl">
                    <PiSignOutBold />
                  </div>
                </div>

                <h3 style={displayFont} className="relative mb-2 text-2xl font-bold text-white">
                  Log Out
                </h3>
                <p className="relative mb-8 text-xs text-neutral-400 font-normal leading-relaxed">
                  Are you sure you want to log out from your account?
                </p>

                <div className="relative flex flex-col gap-3">
                  <button
                    onClick={confirmLogout}
                    className="w-full rounded-full bg-[#DAB25A] hover:bg-[#c49e48] py-3.5 text-xs font-bold uppercase tracking-wider text-black transition-all active:scale-95 shadow-[0_4px_20px_rgba(218,178,90,0.35)] cursor-pointer"
                  >
                    Yes, Log Out
                  </button>
                  <button
                    onClick={() => setShowLogoutModal(false)}
                    className="w-full rounded-full border border-white/10 bg-neutral-900 hover:bg-neutral-800 py-3.5 text-xs font-bold uppercase tracking-wider text-neutral-300 transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </div>
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}