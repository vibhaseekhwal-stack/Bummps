import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  PiMapPinFill,
  PiArrowRightBold,
  PiXBold,
  PiMagnifyingGlassBold,
  PiPlusBold,
  PiLockKeyFill,
  PiCalendarBlankFill,
  PiHeartFill,
  PiQuotesFill,
  PiSparkleBold,
  PiShieldCheckBold
} from "react-icons/pi";

// Status Specific Stories Data with Circular Profile Images
const initialStories = [
  {
    id: 1,
    names: "Aarav & Meera",
    status: "Married",
    location: "Mumbai, India",
    avatar: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=150&auto=format&fit=crop&q=80",
    dateMet: "Matched in Oct 2023",
    quote: "From late-night chats to walking down the aisle.",
    shortStory: "We matched after both of us almost gave up on dating apps. The instant connection was undeniable.",
    fullStory: "After endless awkward dates, we both decided to give it one last try. Our first chat lasted 4 hours straight. Three weeks later, we met for dinner in Bandra, and it felt like we'd known each other for years.",
    timeline: "14 Months to Marriage"
  },
  {
    id: 2,
    names: "Rohan & Sneha",
    status: "Engaged",
    location: "Bangalore, India",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    dateMet: "Matched in Feb 2024",
    quote: "One swipe changed our world forever.",
    shortStory: "Filter coffee over our first date turned into a lifetime commitment.",
    fullStory: "We bonded over our shared obsession with filter coffee and tech startups. What started as a quick 30-minute coffee catchup in Indiranagar extended into a 6-hour walk around Cubbon Park.",
    timeline: "8 Months to Engagement"
  },
  {
    id: 3,
    names: "Kabir & Ananya",
    status: "Married",
    location: "Delhi NCR, India",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    dateMet: "Matched in Jan 2023",
    quote: "Distance couldn't stop what was meant to be.",
    shortStory: "Managing long distance was tough, but our shared goals kept us connected every step of the way.",
    fullStory: "Kabir was in Delhi and Ananya was finishing her master's degree in Bangalore. We survived 18 months of long-distance dating before moving into our first home together.",
    timeline: "2 Years to Marriage"
  },
  {
    id: 4,
    names: "Vikram & Pooja",
    status: "Dating",
    location: "Hyderabad, India",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    dateMet: "Matched in Aug 2024",
    quote: "Two foodies who found home in each other.",
    shortStory: "Exploring street food stalls together bonded us faster than any fancy restaurant ever could.",
    fullStory: "We bonded immediately over our love for authentic Hyderabadi Biryani. Within three months, we were traveling across South India together.",
    timeline: "6 Months Together"
  },
  {
    id: 5,
    names: "Siddharth & Riya",
    status: "Married",
    location: "Pune, India",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    dateMet: "Matched in Nov 2022",
    quote: "A quiet coffee turned into forever.",
    shortStory: "We were both introverts who usually hated first dates, but hours flew by like minutes.",
    fullStory: "Our first date was at a quiet bookstore cafe. We started talking about our favorite novels and ended up sitting there until closing time.",
    timeline: "1.5 Years to Marriage"
  },
  {
    id: 6,
    names: "Aditya & Priya",
    status: "Engaged",
    location: "Kolkata, India",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80",
    dateMet: "Matched in Mar 2024",
    quote: "Music brought our souls together.",
    shortStory: "We randomly matched before a music festival, and we haven't missed a concert since.",
    fullStory: "We met right before a weekend music festival in Kolkata. From singing along in the rain to planning our future together, our shared love for indie music turned into something special.",
    timeline: "1 Year to Engagement"
  },
  {
    id: 7,
    names: "Karan & Ishita",
    status: "Dating",
    location: "Jaipur, India",
    avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&auto=format&fit=crop&q=80",
    dateMet: "Matched in Dec 2024",
    quote: "Sunset walks and endless laughter.",
    shortStory: "Met at a local art exhibit, now spending every weekend exploring hidden forts.",
    fullStory: "We both swiped right because of a mutual love for heritage architecture. Our first meeting at Nahargarh Fort led to an unbreakable bond.",
    timeline: "3 Months Together"
  }
];

export default function JourneysToForever() {
  const [stories, setStories] = useState(initialStories);
  const [selectedStory, setSelectedStory] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    names: "",
    status: "Dating",
    location: "",
    avatar: "",
    quote: "",
    shortStory: ""
  });

  // Filter Logic by Status Tab & Search Bar
  const filteredStories = stories.filter((story) => {
    const matchesFilter = activeFilter === "All" || story.status === activeFilter;
    const matchesSearch =
      story.names.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Handle Dynamic Form Add
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.names || !formData.location) return;

    const newEntry = {
      id: Date.now(),
      names: formData.names,
      status: formData.status,
      location: formData.location,
      avatar: formData.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      dateMet: "Matched Recently",
      quote: formData.quote || "A new journey begins here.",
      shortStory: formData.shortStory || "We met and instantly clicked!",
      fullStory: formData.shortStory || "Full story coming soon as our journey unfolds.",
      timeline: "Just Started"
    };

    setStories([newEntry, ...stories]);
    setIsSubmitModalOpen(false);
    setFormData({ names: "", status: "Dating", location: "", avatar: "", quote: "", shortStory: "" });
  };

  const inputStyle =
    "w-full rounded-2xl border border-[#DAB25A]/20 bg-neutral-900/60 py-3 sm:py-3.5 px-4 text-xs sm:text-sm text-white placeholder:text-neutral-500 focus:border-[#DAB25A] focus:outline-none focus:ring-1 focus:ring-[#DAB25A] focus:shadow-[0_0_20px_rgba(218,178,90,0.15)] transition-all duration-300";

  return (
    <section className="relative pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 bg-[#121214] text-white overflow-hidden font-sans select-none">

      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[300px] sm:h-[400px] bg-gradient-to-tr from-[#DAB25A]/15 via-[#F3E5AB]/5 to-transparent blur-[160px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 font-sans">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#DAB25A]/30 bg-[#DAB25A]/10 px-3.5 py-1 text-[11px] font-bold text-[#DAB25A] mb-3 sm:mb-4 uppercase tracking-widest"
          >
            <PiSparkleBold />
            <span>In-Depth Stories</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight"
          >
            Journeys to{" "}
            <span className="italic font-normal text-[#DAB25A] bg-gradient-to-r from-[#DAB25A] via-[#F3E5AB] to-[#DAB25A] bg-clip-text text-transparent">
              Forever.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 text-neutral-300 text-sm sm:text-base font-normal max-w-xl mx-auto leading-relaxed"
          >
            Real connections, authentic proposals, and beautiful love stories built on Bummps.
          </motion.p>
        </div>

        {/* Search & Status Filters Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-8 flex flex-col lg:flex-row items-center justify-between gap-4 bg-neutral-900/40 border border-[#DAB25A]/20 p-3 sm:p-4 rounded-2xl sm:rounded-3xl backdrop-blur-xl shadow-xl"
        >

          {/* Search Box */}
          <div className="relative w-full lg:w-80">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <PiMagnifyingGlassBold className="text-base text-[#DAB25A]" />
            </div>
            <input
              type="text"
              placeholder="Search couples or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-900/60 border border-[#DAB25A]/20 text-white text-xs sm:text-sm rounded-xl sm:rounded-2xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#DAB25A] focus:ring-1 focus:ring-[#DAB25A] transition-all placeholder-neutral-500"
            />
          </div>

          {/* Status Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 w-full lg:w-auto">
            {["All", "Married", "Engaged", "Dating"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-4 py-2 rounded-xl sm:rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
                  activeFilter === tab
                    ? "bg-[#DAB25A] text-black shadow-[0_0_15px_rgba(218,178,90,0.3)] font-bold"
                    : "bg-neutral-900/60 border border-[#DAB25A]/20 text-neutral-400 hover:text-white hover:border-[#DAB25A]/50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Submit Button */}
          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="w-full lg:w-auto inline-flex items-center justify-center gap-2 bg-[#DAB25A] hover:bg-[#c49e48] text-black font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl sm:rounded-2xl transition-all shadow-[0_4px_20px_rgba(218,178,90,0.25)] cursor-pointer shrink-0 active:scale-95"
          >
            <PiPlusBold className="text-sm" /> Share Story
          </button>
        </motion.div>

        {/* Stories Grid */}
        {filteredStories.length === 0 ? (
          <div className="text-center py-16 bg-neutral-900/40 rounded-3xl border border-dashed border-[#DAB25A]/20 backdrop-blur-xl">
            <p className="text-neutral-400 text-sm">No {activeFilter !== "All" ? activeFilter.toLowerCase() : ""} stories match your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredStories.map((story, i) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group relative h-full flex"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#DAB25A]/30 to-[#F3E5AB]/10 rounded-2xl sm:rounded-3xl blur-md opacity-0 group-hover:opacity-100 transition duration-500" />

                <div className="relative w-full rounded-2xl sm:rounded-3xl border border-[#DAB25A]/20 bg-neutral-900/40 p-6 sm:p-7 backdrop-blur-xl flex flex-col justify-between transition-all duration-300 group-hover:border-[#DAB25A]/60 group-hover:-translate-y-1 shadow-xl">
                  
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-5">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-[#DAB25A] via-[#F3E5AB] to-[#c79836] shadow-md shrink-0">
                          <img
                            src={story.avatar}
                            alt={story.names}
                            className="w-full h-full rounded-full object-cover"
                          />
                        </div>

                        <div>
                          <h3 className="font-serif font-bold text-lg sm:text-xl text-white group-hover:text-[#DAB25A] transition-colors leading-tight">
                            {story.names}
                          </h3>
                          <p className="text-[11px] text-neutral-400 flex items-center gap-1 mt-0.5">
                            <PiMapPinFill className="text-[#DAB25A]" /> {story.location}
                          </p>
                        </div>
                      </div>

                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#DAB25A]/10 text-[#DAB25A] border border-[#DAB25A]/30 shrink-0">
                        <PiHeartFill className="text-[10px]" /> {story.status}
                      </span>
                    </div>

                    <div className="bg-neutral-900/60 rounded-xl sm:rounded-2xl p-3.5 border border-[#DAB25A]/10 mb-4 group-hover:border-[#DAB25A]/30 transition-all relative">
                      <PiQuotesFill className="absolute top-2 right-3 text-lg text-[#DAB25A]/30" />
                      <blockquote className="italic text-[#F3E5AB] text-xs font-medium leading-relaxed pr-4">
                        "{story.quote}"
                      </blockquote>
                    </div>

                    <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed line-clamp-3 font-normal mb-6">
                      {story.shortStory}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#DAB25A]/10 flex items-center justify-between mt-auto">
                    <span className="text-[11px] text-neutral-400 flex items-center gap-1 font-medium">
                      <PiCalendarBlankFill className="text-[#DAB25A]" /> {story.dateMet}
                    </span>
                    <button
                      onClick={() => setSelectedStory(story)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#DAB25A] uppercase tracking-wider hover:text-white transition-colors cursor-pointer group-hover:translate-x-1 duration-300"
                    >
                      Full Story <PiArrowRightBold />
                    </button>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>

      {/* Story Detail Modal */}
      {selectedStory && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-[#DAB25A]/40 rounded-2xl sm:rounded-3xl max-w-xl w-full p-6 sm:p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedStory(null)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-white bg-neutral-800 p-2 rounded-full cursor-pointer transition-colors"
            >
              <PiXBold className="text-xs" />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-[#DAB25A] via-[#F3E5AB] to-[#c79836] shrink-0">
                <img
                  src={selectedStory.avatar}
                  alt={selectedStory.names}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#DAB25A]/10 text-[#DAB25A] border border-[#DAB25A]/30 mb-1">
                  <PiHeartFill className="text-[10px]" /> {selectedStory.status}
                </span>
                <h3 className="font-serif font-bold text-2xl text-white">{selectedStory.names}</h3>
                <p className="text-xs text-[#DAB25A] font-medium mt-0.5">{selectedStory.location} • {selectedStory.timeline}</p>
              </div>
            </div>

            <div className="space-y-4">
              <blockquote className="italic text-[#F3E5AB] text-xs sm:text-sm font-medium border-l-2 border-[#DAB25A] pl-4 py-2 bg-[#DAB25A]/10 rounded-r-xl">
                "{selectedStory.quote}"
              </blockquote>

              <div>
                <h4 className="text-xs uppercase font-bold text-neutral-400 tracking-wider mb-1">Our Journey</h4>
                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                  {selectedStory.fullStory}
                </p>
              </div>

              <div className="pt-4 border-t border-[#DAB25A]/10 flex items-center justify-between text-xs text-neutral-400">
                <span className="flex items-center gap-1"><PiShieldCheckBold className="text-[#DAB25A]" /> Verified Match</span>
                <span className="flex items-center gap-1 text-[#DAB25A]"><PiLockKeyFill /> Secure Profile</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share Story Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-[#DAB25A]/40 rounded-2xl sm:rounded-3xl max-w-md w-full p-6 relative shadow-2xl">
            <button
              onClick={() => setIsSubmitModalOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white bg-neutral-800 p-2 rounded-full cursor-pointer"
            >
              <PiXBold className="text-xs" />
            </button>

            <h3 className="font-serif text-xl font-bold text-white mb-1">Share Your Journey</h3>
            <p className="text-xs text-neutral-400 mb-5">Tell us how you met and inspire others!</p>

            <form onSubmit={handleFormSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">Couple Names *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul & Simran"
                  value={formData.names}
                  onChange={(e) => setFormData({ ...formData, names: e.target.value })}
                  className={inputStyle}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className={inputStyle}
                  >
                    <option value="Dating" className="bg-neutral-900 text-white">Dating</option>
                    <option value="Engaged" className="bg-neutral-900 text-white">Engaged</option>
                    <option value="Married" className="bg-neutral-900 text-white">Married</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">Location *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Goa, India"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className={inputStyle}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">Image URL (Optional)</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={formData.avatar}
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                  className={inputStyle}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">Short Quote</label>
                <input
                  type="text"
                  placeholder="e.g. Best decision of our lives."
                  value={formData.quote}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  className={inputStyle}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">Short Story</label>
                <textarea
                  rows="3"
                  placeholder="How did you meet?"
                  value={formData.shortStory}
                  onChange={(e) => setFormData({ ...formData, shortStory: e.target.value })}
                  className={inputStyle}
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-[#DAB25A] hover:bg-[#c49e48] text-black font-bold py-3 rounded-xl transition-colors uppercase tracking-wider text-xs cursor-pointer shadow-[0_4px_15px_rgba(218,178,90,0.2)]"
              >
                Submit Story
              </button>
            </form>
          </div>
        </div>
      )}

    </section>
  );
}