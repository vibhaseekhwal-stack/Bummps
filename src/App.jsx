import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiArrowUp } from "react-icons/hi";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";


function App() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  const location = useLocation();

  const isLoggedIn = !!localStorage.getItem("token");

  const isAuthPage = ["/login", "/register"].includes(
    location.pathname
  );

  // Footer is shown on all public landing pages
  const isLandingPage = [
    "/",
    "/about",
    "/about-page",
    "/success-stories",
    "/our-plans",
    "/contact",
  ].includes(location.pathname);

  useEffect(() => {
    AOS.init({
      duration: 700,
      once: true,
      offset: 60,
      easing: "ease-out-cubic",
    });

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

 

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen">
      {/* Navbar - hidden on Login/Register */}
      {!isAuthPage && <Navbar />}

      {/* Routes */}
      <main>
        <AppRoutes isLoggedIn={isLoggedIn} />
      </main>

      {/* Footer - shown on public landing pages */}
      {isLandingPage && <Footer />}

      {/* Back To Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-6 right-6 z-30 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-linear-to-r from-[#F3E079] via-[#D5AB55] to-[#A27928] text-black shadow-lg"
          >
            <HiArrowUp className="text-xl" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;