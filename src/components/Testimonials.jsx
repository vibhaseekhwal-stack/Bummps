import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import {
  PiStarFill,
  PiQuotesFill,
  PiHeartFill,
  PiSparkleFill,
} from "react-icons/pi";
import { testimonialData } from "../data";

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-16 sm:py-20 bg-[#121214] text-white overflow-hidden font-sans border-none outline-none"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 font-sans">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto font-sans">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#DAB25A] bg-[#DAB25A]/10 border border-[#DAB25A]/30 px-3.5 py-1.5 rounded-full backdrop-blur-md">
            <PiSparkleFill className="text-xs" /> Success Stories
          </span>

          <h2 className="mt-5 font-sans font-bold text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            Real people,{" "}
            <span className="font-sans font-bold text-[#DAB25A] bg-gradient-to-r from-[#DAB25A] via-[#F3E5AB] to-[#DAB25A] bg-clip-text text-transparent">
              real love stories
            </span>
          </h2>

          <p className="mt-4 text-neutral-300 text-sm sm:text-base leading-relaxed font-normal font-sans">
            Thousands of couples found each other on Bummps. Here is what a few of them had to say.
          </p>
        </div>

        {/* Clean Auto Carousel Showcase */}
        <div className="bummps-testimonials w-full mt-12 sm:mt-16 relative font-sans">

          <Swiper
            modules={[Autoplay]}
            spaceBetween={28}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView={1.15}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 1.8 },
              1024: { slidesPerView: 2.8 },
            }}
            className="!py-6 !px-4"
          >
            {testimonialData.map((t, idx) => (
              <SwiperSlide key={t.name || idx} className="!h-auto py-4 font-sans">
                {/* Testimonial Card */}
                <div className="testimonial-card relative bg-neutral-900/60 backdrop-blur-xl border border-[#DAB25A]/20 rounded-3xl p-7 sm:p-8 shadow-[0_15px_35px_rgba(0,0,0,0.6)] h-full max-w-md mx-auto transition-all duration-500 flex flex-col justify-between group overflow-hidden font-sans">

                  {/* Subtle Top Ambient Glow */}
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#DAB25A]/10 rounded-full blur-2xl pointer-events-none group-hover:bg-[#DAB25A]/20 transition-all" />

                  <div>
                    {/* Top Header inside Card */}
                    <div className="flex items-center justify-between">
                      <PiQuotesFill className="text-4xl text-[#DAB25A] opacity-80" />

                      <div className="flex items-center gap-1 bg-[#DAB25A]/10 border border-[#DAB25A]/20 px-2.5 py-1 rounded-full text-xs text-[#DAB25A] font-semibold font-sans">
                        <PiHeartFill className="text-xs" />
                        <span>Matched</span>
                      </div>
                    </div>

                    {/* Review Text */}
                    <p className="mt-5 text-neutral-300 leading-relaxed text-sm sm:text-base font-normal font-sans">
                      "{t.review}"
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="mt-8 pt-5 border-t border-white/10 font-sans">
                    {/* Rating Stars */}
                    <div className="flex items-center gap-1 text-[#DAB25A]">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <PiStarFill
                          key={i}
                          className={
                            i < t.rating
                              ? "opacity-100 text-[#DAB25A] text-sm"
                              : "opacity-20 text-neutral-700 text-sm"
                          }
                        />
                      ))}
                    </div>

                    {/* User Avatar & Info */}
                    <div className="mt-4 flex items-center gap-3.5">
                      <img
                        src={t.image}
                        alt={t.name}
                        className="h-12 w-12 rounded-2xl object-cover border-2 border-[#DAB25A]/50 shadow-md shrink-0"
                      />
                      <div className="text-left font-sans">
                        <h3 className="font-sans font-bold text-white text-base leading-snug">
                          {t.name}
                        </h3>
                        <p className="text-xs text-neutral-400 mt-0.5 font-normal font-sans">
                          {t.location}
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>

        </div>

      </div>

      {/* Custom Styles */}
      <style>{`
        .bummps-testimonials .swiper-slide {
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease;
          opacity: 0.35;
          transform: scale(0.92);
        }

        .bummps-testimonials .swiper-slide-active {
          opacity: 1;
          transform: scale(1.05);
        }

        .bummps-testimonials .swiper-slide-active .testimonial-card {
          border-color: rgba(218, 178, 90, 0.6);
          background-color: rgba(23, 23, 23, 0.9);
          box-shadow: 0 20px 40px -10px rgba(218, 178, 90, 0.25);
        }
      `}</style>
    </section>
  );
}