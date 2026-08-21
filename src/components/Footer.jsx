import { useState } from "react";
import { PiHeartFill } from "react-icons/pi";
import { HiOutlineArrowRight } from "react-icons/hi";
import {
  FaInstagram,
  FaTiktok,
  FaXTwitter,
  FaFacebookF,
} from "react-icons/fa6";
import { navLinks } from "../data";
import BummpsLogo from "./BummpsLogo";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (email) {
      setSubscribed(true);

      setTimeout(() => {
        setSubscribed(false);
        setEmail("");
      }, 3500);
    }
  };

  const socialLinks = [
    {
      icon: <FaInstagram />,
      href: "https://www.instagram.com/bummps_/",
      label: "Instagram",
    },
    {
      icon: <FaTiktok />,
      href: "#",
      label: "TikTok",
    },
    {
      icon: <FaXTwitter />,
      href: "#",
      label: "X (Twitter)",
    },
    {
      icon: <FaFacebookF />,
      href: "https://www.facebook.com/share/1HifFr5tvJ/?mibextid=wwXIfr",
      label: "Facebook",
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#121214] text-white font-sans">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#DAB25A]/40 to-transparent" />

        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[300px] w-[600px] rounded-full bg-[#DAB25A]/10 blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 sm:pt-5">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-16 border-b border-[#DAB25A]/15">

          <div className="lg:col-span-2 space-y-5">

            <a
              href="#home"
              className="inline-flex items-center cursor-pointer transition-transform hover:scale-[1.02]"
            >
              <BummpsLogo className="h-9 sm:h-10" />
            </a>

            <p className="text-sm text-neutral-400 leading-relaxed max-w-sm font-normal">
              Bummps pairs thoughtful matching with verified, real people —
              so every conversation has a real chance of becoming something real.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="pt-2 max-w-sm"
            >
              <div className="relative flex items-center">

                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email to join..."
                  className="w-full rounded-full bg-[#121214] px-5 py-3 pr-28 text-xs text-white placeholder:text-neutral-500 border border-[#DAB25A]/30 focus:outline-none focus:border-[#DAB25A] focus:text-white caret-[#DAB25A] backdrop-blur-xl transition-all shadow-[inset_0_0_0px_1000px_#121214] [-webkit-text-fill-color:white]"
                />

                <button
                  type="submit"
                  className="absolute right-1.5 bg-[#DAB25A] hover:bg-[#c49e48] text-black font-bold uppercase tracking-wider text-[11px] px-4 py-2 rounded-full transition-all active:scale-95 cursor-pointer flex items-center gap-1 shrink-0"
                >
                  <span>
                    {subscribed ? "✓ Joined" : "Join"}
                  </span>

                  {!subscribed && (
                    <HiOutlineArrowRight className="text-sm" />
                  )}
                </button>

              </div>
            </form>
          </div>

          <div>
            <h4 className="font-serif text-base font-bold text-white tracking-wide mb-4">
              Explore
            </h4>

            <ul className="space-y-3 text-sm">
              {navLinks &&
                navLinks.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="text-neutral-400 hover:text-[#DAB25A] transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-base font-bold text-white tracking-wide mb-4">
              Company
            </h4>

            <ul className="space-y-3 text-sm text-neutral-400">
              <li>
                <a
                  href="#"
                  className="hover:text-[#DAB25A] transition-colors"
                >
                  About Us
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-[#DAB25A] transition-colors"
                >
                  Careers
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-[#DAB25A] transition-colors"
                >
                  Press & Media
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-[#DAB25A] transition-colors"
                >
                  Success Stories
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-base font-bold text-white tracking-wide mb-4">
              Trust & Safety
            </h4>

            <ul className="space-y-3 text-sm text-neutral-400">
              <li>
                <a
                  href="#"
                  className="hover:text-[#DAB25A] transition-colors"
                >
                  Privacy Policy
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-[#DAB25A] transition-colors"
                >
                  Terms of Service
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-[#DAB25A] transition-colors"
                >
                  Safety Tips
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-[#DAB25A] transition-colors"
                >
                  Community Guidelines
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 pb-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-neutral-400">

          <p>
            © {new Date().getFullYear()} Bummps Inc. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            {socialLinks.map((s, idx) => (
              <a
                key={idx}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid h-9 w-9 place-items-center rounded-full border border-[#DAB25A]/20 bg-neutral-800/40 text-[#DAB25A] hover:bg-[#DAB25A] hover:text-black hover:border-transparent transition-all duration-300 text-sm active:scale-95 cursor-pointer backdrop-blur-md"
              >
                {s.icon}
              </a>
            ))}
          </div>

          <p className="flex items-center gap-1.5">
            Made with
            <PiHeartFill className="text-[#DAB25A] text-sm drop-shadow-[0_0_8px_rgba(218,178,90,0.6)]" />
            for real connections.
          </p>

        </div>
      </div>
    </footer>
  );
}